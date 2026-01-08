import type { ReportData } from "@thedoorpost/shared";
import type { Env } from "../env";
import { z } from "zod";

// Zod schema for URL validation before storage
const storageUrlSchema = z
  .string()
  .url()
  .max(2048)
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    { message: "Invalid URL protocol" },
  )
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        // Block localhost and private IPs in storage
        const hostname = parsed.hostname.toLowerCase();
        const blocked = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
        return !blocked.some((b) => hostname === b || hostname.endsWith(b));
      } catch {
        return false;
      }
    },
    { message: "Blocked hostname" },
  );

export type StoredReport = {
  id: string;
  url: string;
  score: number;
  summary: string;
  screenshot_path: string;
  created_at: number;
  user_email?: string | null;
  data: ReportData;
};

export async function putScreenshot(
  env: Env,
  reportId: string,
  buffer: Uint8Array,
  contentType: string,
) {
  const key = `snapshots/${reportId}.${contentType === "image/webp" ? "webp" : "png"}`;
  await env.MY_BUCKET.put(key, buffer, {
    httpMetadata: {
      contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });
  const base = env.R2_PUBLIC_BASE_URL || "https://r2.thedoorpost.com";
  return { key, url: `${base.replace(/\/$/, "")}/${key}` };
}

export async function saveReport(
  env: Env,
  record: StoredReport,
): Promise<{ success: boolean; error?: string }> {
  // Validate URL before storage to prevent injection
  const urlValidation = storageUrlSchema.safeParse(record.url);
  if (!urlValidation.success) {
    return {
      success: false,
      error: `Invalid URL: ${urlValidation.error.errors[0]?.message || "validation failed"}`,
    };
  }

  try {
    await env.DB.prepare(
      `INSERT INTO reports (id, url, score, summary, full_report_json, screenshot_path, created_at, user_email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        record.id,
        record.url,
        record.score,
        record.summary,
        JSON.stringify(record.data),
        record.screenshot_path,
        record.created_at,
        record.user_email ?? null,
      )
      .run();
    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown D1 error";
    console.error(`[D1] Failed to save report ${record.id}: ${errorMsg}`);
    // Dead letter queue: store failed writes in KV for replay
    try {
      await env.KV.put(
        `dlq:report:${record.id}`,
        JSON.stringify({ record, failedAt: Date.now(), error: errorMsg }),
        { expirationTtl: 604800 }, // 7 days
      );
    } catch {
      // Best effort DLQ
    }
    return { success: false, error: errorMsg };
  }
}

export async function getReport(env: Env, id: string) {
  const result = await env.DB.prepare(
    `SELECT id, url, score, summary, full_report_json, screenshot_path, created_at, user_email
     FROM reports WHERE id = ?`,
  )
    .bind(id)
    .first();

  return result as (StoredReport & { full_report_json?: string }) | undefined;
}
