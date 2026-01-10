import type { Env } from "../env";

type WebhookPayload = Record<string, unknown>;

type WebhookOptions = {
  url: string;
  secret?: string;
  payload: WebhookPayload;
  timeoutMs: number;
  maxRetries: number;
};

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signPayload(secret: string, body: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `sha256=${toHex(signature)}`;
}

async function attemptWebhook({
  url,
  secret,
  payload,
  timeoutMs,
}: Omit<WebhookOptions, "maxRetries">) {
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "TheDoorpost-Webhook/1.0",
  };
  if (secret) {
    headers["x-doorpost-signature"] = await signPayload(secret, body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
    });
    return res.ok;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function sendWebhook(
  env: Env,
  url: string,
  payload: WebhookPayload,
  secret?: string,
) {
  const timeoutRaw = Number(env.WEBHOOK_TIMEOUT_MS || 5000);
  const timeoutMs =
    Number.isFinite(timeoutRaw) && timeoutRaw > 0 ? timeoutRaw : 5000;
  const retriesRaw = Number(env.WEBHOOK_MAX_RETRIES || 2);
  const maxRetries =
    Number.isFinite(retriesRaw) && retriesRaw > 0 ? retriesRaw : 2;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const ok = await attemptWebhook({
      url,
      secret,
      payload,
      timeoutMs,
    });
    if (ok) return true;
    if (attempt < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, attempt), 4000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return false;
}

export async function sendWebhookWithDLQ(
  env: Env,
  jobId: string,
  url: string,
  payload: WebhookPayload,
  secret?: string,
): Promise<boolean> {
  const ok = await sendWebhook(env, url, payload, secret);
  if (!ok) {
    console.warn(`[WEBHOOK] Delivery failed for job ${jobId}`);
    await env.KV.put(
      `dlq:webhook:${jobId}`,
      JSON.stringify({ url, payload, failedAt: Date.now() }),
      { expirationTtl: 604800 },
    );
  }
  return ok;
}
