import type { BrowserWorker } from "@cloudflare/puppeteer";
import { z } from "zod";

export const envSchema = z.object({
  MYBROWSER: z.custom<BrowserWorker>(),
  MY_BUCKET: z.custom<R2Bucket>(),
  DB: z.custom<D1Database>(),
  KV: z.custom<KVNamespace>(),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  OPENAI_MODEL: z.string().optional(),
  R2_PUBLIC_BASE_URL: z.string().optional(),
  JOB_TTL_SECONDS: z.string().optional(),
  REPORT_CACHE_TTL_SECONDS: z.string().optional(),
  ENABLE_DOH_CHECK: z.string().optional(),
  OPENAI_STREAM: z.string().optional(),
  MOCK_ANALYZE: z.string().optional(),
  RATE_LIMIT_IP_PER_MIN: z.string().optional(),
  RATE_LIMIT_EMAIL_PER_MIN: z.string().optional(),
  API_KEY: z.string().optional(),
  DISABLE_API_KEY_AUTH: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: unknown): Env {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    const errors = result.error.errors
      .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(`Environment validation failed:\n${errors}`);
  }
  return result.data;
}
