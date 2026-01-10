import type { JobStatus, ReportResult } from "@thedoorpost/shared";
import type { Env } from "../env";

const DEFAULT_TTL = 3600;

export function jobKey(id: string) {
  return `job:${id}`;
}

function ttlSeconds(env: Env) {
  const ttl = Number(env.JOB_TTL_SECONDS ?? DEFAULT_TTL);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : DEFAULT_TTL;
}

export async function createJob(
  env: Env,
  payload: Omit<JobStatus, "status"> & { status?: JobStatus["status"] },
) {
  const job: JobStatus = {
    status: payload.status ?? "queued",
    progress: payload.progress ?? 0,
    message: payload.message ?? "Queued",
    url: payload.url,
    created_at: payload.created_at ?? Date.now(),
    id: payload.id,
  };
  await env.KV.put(jobKey(job.id), JSON.stringify(job), {
    expirationTtl: ttlSeconds(env),
  });
  return job;
}

export async function updateJob(
  env: Env,
  id: string,
  patch: Partial<JobStatus>,
) {
  const existing = await getJob(env, id);
  if (!existing) return null;
  const updated: JobStatus = { ...existing, ...patch };
  await env.KV.put(jobKey(id), JSON.stringify(updated), {
    expirationTtl: ttlSeconds(env),
  });
  return updated;
}

export async function completeJob(env: Env, id: string, result: ReportResult) {
  return updateJob(env, id, {
    status: "complete",
    progress: 100,
    message: "Complete",
    result,
  });
}

export async function failJob(env: Env, id: string, message: string) {
  return updateJob(env, id, {
    status: "error",
    message,
    error: message,
  });
}

export async function getJob(env: Env, id: string): Promise<JobStatus | null> {
  const raw = await env.KV.get(jobKey(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JobStatus;
  } catch {
    console.error(`[JOBS] Corrupted job data for ${id}, cleaning up`);
    await env.KV.delete(jobKey(id));
    return null;
  }
}
