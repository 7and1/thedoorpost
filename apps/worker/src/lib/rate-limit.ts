import type { Env } from "../env";

type RateLimitResponse = {
  allowed: boolean;
  remaining: number;
  reset: number;
};

export class RateLimiter {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    const body = (await request.json().catch(() => null)) as {
      limit?: number;
      windowSeconds?: number;
    } | null;
    const limit = Number(body?.limit ?? 0);
    const windowSeconds = Number(body?.windowSeconds ?? 0);
    if (!Number.isFinite(limit) || !Number.isFinite(windowSeconds)) {
      return new Response("Invalid payload", { status: 400 });
    }
    if (limit <= 0 || windowSeconds <= 0) {
      return new Response("Invalid limits", { status: 400 });
    }

    const now = Date.now();
    const window = Math.floor(now / 1000 / windowSeconds);
    const bucketKey = `bucket:${window}`;
    const current = (await this.state.storage.get<number>(bucketKey)) ?? 0;

    const resetMs = (window + 1) * windowSeconds * 1000;
    const expiration = Math.ceil(resetMs / 1000);

    if (current >= limit) {
      return Response.json({ allowed: false, remaining: 0, reset: resetMs });
    }

    const next = current + 1;
    await this.state.storage.put(bucketKey, next, { expiration });

    const response: RateLimitResponse = {
      allowed: true,
      remaining: Math.max(0, limit - next),
      reset: resetMs,
    };
    return Response.json(response);
  }
}

async function rateLimitDO(
  env: Env,
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const id = env.RATE_LIMITER?.idFromName(key);
  if (!id) return null;
  const stub = env.RATE_LIMITER.get(id);
  const res = await stub.fetch("https://rate-limit", {
    method: "POST",
    body: JSON.stringify({ limit, windowSeconds }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as RateLimitResponse;
  return data.allowed;
}

async function rateLimitKV(
  env: Env,
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const window = Math.floor(Date.now() / 1000 / windowSeconds);
  const bucketKey = `rate:${key}:${window}`;
  const currentRaw = await env.KV.get(bucketKey);
  const current = currentRaw ? Number(currentRaw) : 0;
  if (current >= limit) {
    return false;
  }
  const newValue = current + 1;
  await env.KV.put(bucketKey, String(newValue), {
    expirationTtl: windowSeconds * 2,
  });
  return newValue <= limit;
}

/**
 * Strict rate limiter using Durable Objects when available.
 * Falls back to KV when DO is not bound (local/dev).
 */
export async function rateLimit(
  env: Env,
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const doResult = await rateLimitDO(env, key, limit, windowSeconds);
  if (typeof doResult === "boolean") {
    return doResult;
  }
  return rateLimitKV(env, key, limit, windowSeconds);
}
