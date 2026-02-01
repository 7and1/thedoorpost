import type { ReportData } from "@thedoorpost/shared";
import type { Env } from "../env";
import { parseReportData } from "./report-schema";

const SYSTEM_PROMPT =
  "You are a ruthless CRO expert. Analyze the above-the-fold screenshot and return concise, actionable advice.";

const USER_PROMPT =
  "Evaluate 3 metrics (0-100): value_prop, cta_visibility, trust_design. Provide overall_score, a 1-2 sentence summary, and 3 fixes with title/description/impact. Output strict JSON. Order fields with overall_score first.";

const DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct:free";
const DEFAULT_FALLBACK_MODELS = [
  "deepseek/deepseek-r1-0528:free",
  "google/gemini-3-flash-preview",
];

// Circuit breaker state
let circuitOpenUntil = 0;
let failureCount = 0;
const CIRCUIT_THRESHOLD = 5;
const CIRCUIT_TIMEOUT = 60000; // 1 minute
let apiKeyIndex = 0;

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

function normalizeList(raw?: string) {
  if (!raw) return [];
  return raw
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getApiKeys(env: Env) {
  const keys = normalizeList(env.OPENROUTER_API_KEYS || env.OPENROUTER_API_KEY);
  return keys;
}

function getModelCandidates(env: Env) {
  const primary = (env.AI_MODEL || DEFAULT_MODEL).trim();
  const fallbacks = env.AI_FALLBACK_MODELS
    ? normalizeList(env.AI_FALLBACK_MODELS)
    : DEFAULT_FALLBACK_MODELS;
  const models = [primary, ...fallbacks].filter(Boolean);
  return Array.from(new Set(models));
}

function pickApiKey(keys: string[]) {
  const key = keys[apiKeyIndex % keys.length];
  apiKeyIndex = (apiKeyIndex + 1) % keys.length;
  return key;
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function callOpenRouter(
  env: Env,
  model: string,
  base64Data: string,
  imageMime: string,
  apiKey: string,
) {
  const baseUrl = (env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1")
    .replace(/\/$/, "");
  const timeoutMs = Number(env.AI_TIMEOUT_MS || 20000);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (env.OPENROUTER_APP_URL) {
    headers["HTTP-Referer"] = env.OPENROUTER_APP_URL;
  }
  if (env.OPENROUTER_APP_NAME) {
    headers["X-Title"] = env.OPENROUTER_APP_NAME;
  }

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
            image_url: {
              url: `data:${imageMime};base64,${base64Data}`,
            },
          },
        ],
      },
    ],
    temperature: 0.2,
    max_tokens: 900,
  };

  const res = await fetchWithRetry(() =>
    fetchWithTimeout(
      `${baseUrl}/chat/completions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      },
      timeoutMs,
    ),
  );

  const data = await res.json();
  const content =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    data?.content ??
    data?.response;

  if (!content || typeof content !== "string") {
    throw new Error("AI response missing content");
  }

  return content;
}

export async function analyzeScreenshot(
  env: Env,
  imageBase64: string,
  onPartialScore?: (score: number) => Promise<void> | void,
  mimeType: "image/webp" | "image/png" = "image/webp",
): Promise<ReportData> {
  const imageMime = mimeType === "image/png" ? "image/png" : "image/webp";

  // Remove data URL prefix if present
  const base64Data = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  const models = getModelCandidates(env);
  const apiKeys = getApiKeys(env);
  if (!apiKeys.length) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }
  let content = "";
  let lastError: Error | null = null;

  for (const model of models) {
    for (let attempt = 0; attempt < apiKeys.length; attempt++) {
      const apiKey = pickApiKey(apiKeys);
      try {
        content = await callOpenRouter(env, model, base64Data, imageMime, apiKey);
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("AI request failed");
        console.error(
          `[AI] Model ${model} failed with key rotation:`,
          lastError,
        );
      }
    }
    if (content) {
      break;
    }
  }

  if (!content) {
    throw lastError || new Error("AI request failed");
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
