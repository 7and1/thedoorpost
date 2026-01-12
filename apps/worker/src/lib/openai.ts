import type { ReportData } from "@thedoorpost/shared";
import type { Env } from "../env";
import { parseReportData } from "./report-schema";

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
  fetchFn: () => Promise<Response>,
  maxRetries = 3,
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Check circuit breaker
    if (Date.now() < circuitOpenUntil) {
      throw new Error("AI circuit breaker is open");
    }

    try {
      const res = await fetchFn();

      // Handle rate limiting (429) specifically
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        const delayMs = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.pow(2, attempt) * 1000 + Math.random() * 1000;

        console.warn(
          `[AI] Rate limited, retry after ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})`,
        );
        if (attempt < maxRetries - 1) {
          await sleep(Math.min(delayMs, 10000));
          continue;
        }
      }

      if (res.ok) {
        // Reset failure count on success
        failureCount = 0;
        return res;
      }

      lastError = new Error(`AI error: ${res.status}`);
      console.error(
        `[AI] Request failed (attempt ${attempt + 1}/${maxRetries}): ${res.status}`,
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
        `[AI] Fetch error (attempt ${attempt + 1}/${maxRetries}):`,
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
      `[AI] Circuit breaker opened until ${new Date(circuitOpenUntil).toISOString()}`,
    );
  }

  throw lastError || new Error("AI request failed after retries");
}

export async function analyzeScreenshot(
  env: Env,
  imageBase64: string,
  onPartialScore?: (score: number) => Promise<void> | void,
  mimeType: "image/webp" | "image/png" = "image/webp",
): Promise<ReportData> {
  const model = env.AI_MODEL || "@cf/meta/llama-3.3-70b-vision";
  const imageMime = mimeType === "image/png" ? "image/png" : "image/webp";

  // Remove data URL prefix if present
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  const prompt = `${SYSTEM_PROMPT}\n\n${USER_PROMPT}`;

  const res = await fetchWithRetry(async () => {
    const response = await env.AI.run(model, {
      image: Array.from(Buffer.from(base64Data, "base64")),
      prompt,
      max_tokens: 900,
      temperature: 0.2,
    });
    // Workers AI returns the result directly, not a Response object
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    }) as Response;
  });

  const data = await res.json();

  // Workers AI returns the text directly
  let content: string;
  if (typeof data === "string") {
    content = data;
  } else if (data.response) {
    content = data.response;
  } else if (data.output) {
    content = data.output;
  } else {
    content = JSON.stringify(data);
  }

  // Extract JSON from the response
  const jsonStart = content.indexOf("{");
  const jsonEnd = content.lastIndexOf("}");
  const jsonStr =
    jsonStart >= 0 ? content.slice(jsonStart, jsonEnd + 1) : content;

  try {
    return parseReportData(JSON.parse(jsonStr));
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid AI JSON response";
    throw new Error(
      `AI response parse failed: ${message}\nRaw: ${jsonStr.slice(0, 200)}`,
    );
  }
}
