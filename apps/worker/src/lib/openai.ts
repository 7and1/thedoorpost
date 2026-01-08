import type { ReportData } from "@thedoorpost/shared";
import type { Env } from "../env";

const SYSTEM_PROMPT =
  "You are a ruthless CRO expert. Analyze the above-the-fold screenshot and return concise, actionable advice.";

const USER_PROMPT =
  "Evaluate 3 metrics (0-100): value_prop, cta_visibility, trust_design. Provide overall_score, a 1-2 sentence summary, and 3 fixes with title/description/impact. Output strict JSON. Order fields with overall_score first.";

// Circuit breaker state
let circuitOpenUntil = 0;
let failureCount = 0;
const CIRCUIT_THRESHOLD = 5;
const CIRCUIT_TIMEOUT = 60000; // 1 minute

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Check circuit breaker
    if (Date.now() < circuitOpenUntil) {
      throw new Error("OpenAI circuit breaker is open");
    }

    try {
      const res = await fetch(url, options);

      // Handle rate limiting (429) specifically
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        const delayMs = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.pow(2, attempt) * 1000 + Math.random() * 1000; // exponential backoff with jitter

        console.warn(
          `[OPENAI] Rate limited, retry after ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})`,
        );
        if (attempt < maxRetries - 1) {
          await sleep(Math.min(delayMs, 10000)); // Cap at 10s
          continue;
        }
      }

      if (res.ok) {
        // Reset failure count on success
        failureCount = 0;
        return res;
      }

      lastError = new Error(`OpenAI error: ${res.status}`);
      console.error(
        `[OPENAI] Request failed (attempt ${attempt + 1}/${maxRetries}): ${res.status}`,
      );

      // Don't retry client errors (4xx except 429)
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw lastError;
      }

      // Exponential backoff for retryable errors
      if (attempt < maxRetries - 1) {
        const delayMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await sleep(delayMs);
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Unknown fetch error");
      console.error(
        `[OPENAI] Fetch error (attempt ${attempt + 1}/${maxRetries}):`,
        lastError,
      );

      if (attempt < maxRetries - 1) {
        const delayMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await sleep(delayMs);
      }
    }
  }

  // Update circuit breaker state
  failureCount++;
  if (failureCount >= CIRCUIT_THRESHOLD) {
    circuitOpenUntil = Date.now() + CIRCUIT_TIMEOUT;
    console.error(
      `[OPENAI] Circuit breaker opened until ${new Date(circuitOpenUntil).toISOString()}`,
    );
  }

  throw lastError || new Error("OpenAI request failed after retries");
}

export async function analyzeScreenshot(
  env: Env,
  imageBase64: string,
  onPartialScore?: (score: number) => Promise<void> | void,
): Promise<ReportData> {
  const model = env.OPENAI_MODEL || "gpt-4o";
  const stream = env.OPENAI_STREAM === "true";

  const payload = {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: USER_PROMPT },
          {
            type: "image_url",
            image_url: { url: `data:image/webp;base64,${imageBase64}` },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
    max_tokens: 900,
    stream,
  };

  const res = await fetchWithRetry(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.body) {
    throw new Error("OpenAI response body is empty");
  }

  if (!stream) {
    const data = (await res.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return JSON.parse(data.choices[0].message.content) as ReportData;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sse = "";
  let partialScoreEmitted = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    sse += decoder.decode(value, { stream: true });
    const lines = sse.split("\n");
    sse = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.replace(/^data:\s*/, "");
      if (data === "[DONE]") {
        break;
      }
      try {
        const chunk = JSON.parse(data) as {
          choices: Array<{ delta?: { content?: string } }>;
        };
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) {
          buffer += delta;
          if (!partialScoreEmitted) {
            const match = buffer.match(/"overall_score"\s*:\s*(\d{1,3})/);
            if (match) {
              partialScoreEmitted = true;
              const score = Number(match[1]);
              if (Number.isFinite(score)) {
                await onPartialScore?.(score);
              }
            }
          }
        }
      } catch {
        // ignore malformed chunk
      }
    }
  }

  const jsonStart = buffer.indexOf("{");
  const jsonEnd = buffer.lastIndexOf("}");
  const json = jsonStart >= 0 ? buffer.slice(jsonStart, jsonEnd + 1) : buffer;
  return JSON.parse(json) as ReportData;
}
