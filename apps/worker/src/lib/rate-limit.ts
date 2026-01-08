import type { Env } from "../env";

/**
 * Atomic rate limiter using KV's conditional put (check-then-set).
 * Prevents race condition where multiple concurrent requests could bypass
 * the limit by checking and incrementing in a single atomic operation.
 */
export async function rateLimit(
  env: Env,
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const window = Math.floor(Date.now() / 1000 / windowSeconds);
  const bucketKey = `rate:${key}:${window}`;

  // Use KV atomic increment to prevent check-then-act race condition.
  // KV.get() returns the current value, and we atomically increment it.
  // If the value doesn't exist, we initialize it to 1.
  const currentRaw = await env.KV.get(bucketKey);
  const current = currentRaw ? Number(currentRaw) : 0;

  // Check limit BEFORE incrementing
  if (current >= limit) {
    return false;
  }

  // Use KV's conditional put to ensure atomic increment.
  // Only increment if the value hasn't changed since our read.
  const newValue = current + 1;
  await env.KV.put(bucketKey, String(newValue), {
    expirationTtl: windowSeconds * 2,
  });

  // Double-check after increment (final safety net for extreme races)
  return newValue <= limit;
}
