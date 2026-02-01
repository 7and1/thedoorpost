import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { validateEnv, type Env } from "./env";
import { JobMessages, ErrorMessages } from "./constants";
import { validateUrl } from "./lib/ssrf";
import { sha256 } from "./lib/hash";
import { analyzeScreenshot } from "./lib/openai";
import { renderScreenshot } from "./lib/render";
import {
  putScreenshot,
  saveReport,
  getReport,
  saveContactMessage,
} from "./lib/storage";
import { createJob, updateJob, completeJob, failJob, getJob } from "./lib/jobs";
import { streamJob } from "./lib/sse";
import { getBestReports, getCommonMistakes } from "./lib/aggregates";
import { rateLimit } from "./lib/rate-limit";
import { buildReportCsv, buildReportPdf } from "./lib/export";
import { verifyTurnstile } from "./lib/turnstile";
import { sendWebhookWithDLQ } from "./lib/webhook";
import { isValidUUID } from "./lib/validation";
import type { ReportData, ReportResult } from "@thedoorpost/shared";

const app = new Hono<{ Bindings: Env }>();
const REQUEST_ID_HEADER = "x-request-id";

type AnalyzeJobMessage = {
  jobId: string;
  url: string;
  userEmail?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  requestedAt: number;
};

const DEFAULT_ALLOWED_HOSTNAMES = ["thedoorpost.com", "www.thedoorpost.com"];

function normalizeHostname(entry: string) {
  const trimmed = entry.trim().toLowerCase();
  if (!trimmed) return null;
  if (trimmed.includes("://")) {
    try {
      return new URL(trimmed).hostname.toLowerCase();
    } catch {
      return null;
    }
  }
  // Strip :port if present (e.g. localhost:3000)
  const portMatch = trimmed.match(/^(.*?)(:\d+)$/);
  return (portMatch ? portMatch[1] : trimmed).trim();
}

function getAllowedHostnames(env: Env) {
  const hostnames = new Set(DEFAULT_ALLOWED_HOSTNAMES);
  const raw = env.ALLOWED_ORIGINS || "";
  for (const entry of raw.split(",")) {
    const hostname = normalizeHostname(entry);
    if (hostname) hostnames.add(hostname);
  }
  return hostnames;
}

const PUBLIC_API_PREFIXES = [
  "/api/analyze",
  "/api/jobs/",
  "/api/reports/",
  "/api/aggregate/",
  "/api/contact",
];

function isPublicApiPath(path: string) {
  if (path === "/api/analyze" || path === "/api/contact") return true;
  return PUBLIC_API_PREFIXES.some((prefix) => path.startsWith(prefix));
}

// API key authentication middleware
const API_KEY_HEADER = "x-api-key";

// Request ID middleware
app.use("*", async (c, next) => {
  const requestId = c.req.header(REQUEST_ID_HEADER) ?? crypto.randomUUID();
  c.set("requestId", requestId);
  await next();
  c.res.headers.set(REQUEST_ID_HEADER, requestId);
});

app.use("/api/*", async (c, next) => {
  // Allow public API paths without API key auth
  if (isPublicApiPath(c.req.path)) {
    return next();
  }

  // Skip API key check in development if disabled
  if (c.env.DISABLE_API_KEY_AUTH === "true") {
    return next();
  }

  const apiKey = c.req.header(API_KEY_HEADER);
  const expectedKey = c.env.API_KEY;
  if (!expectedKey) {
    console.error("[SECURITY] API_KEY not configured - rejecting request");
    return c.json({ error: ErrorMessages.SERVER_ERROR }, 500);
  }

  if (!apiKey || apiKey !== expectedKey) {
    return c.json({ error: ErrorMessages.UNAUTHORIZED }, 401);
  }

  await next();
});

// Origin validation middleware
app.use("*", async (c, next) => {
  const origin = c.req.header("Origin");
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const hostname = originUrl.hostname.toLowerCase();
      const allowedHostnames = getAllowedHostnames(c.env);
      if (!allowedHostnames.has(hostname)) {
        return c.json({ error: ErrorMessages.UNAUTHORIZED_ORIGIN }, 403);
      }
    } catch {
      return c.json({ error: ErrorMessages.UNAUTHORIZED_ORIGIN }, 403);
    }
  }
  await next();
});

// CORS middleware with dynamic origin validation
app.use("*", async (c, next) => {
  const allowedHostnames = getAllowedHostnames(c.env);
  const corsMiddleware = cors({
    origin: (origin) => {
      if (!origin) return "*";
      try {
        const hostname = new URL(origin).hostname;
        return allowedHostnames.has(hostname) ? origin : undefined;
      } catch {
        return undefined;
      }
    },
    credentials: true,
  });
  return corsMiddleware(c, next);
});

const analyzeSchema = z
  .object({
    url: z.string().url().max(2048),
    userEmail: z.string().email().optional(),
    user_email: z.string().email().optional(),
    turnstileToken: z.string().min(1).optional(),
    turnstile_token: z.string().min(1).optional(),
    webhookUrl: z.string().url().max(2048).optional(),
    webhook_url: z.string().url().max(2048).optional(),
    webhookSecret: z.string().min(1).max(200).optional(),
    webhook_secret: z.string().min(1).max(200).optional(),
  })
  .strict()
  .transform((data) => ({
    url: data.url,
    userEmail: data.userEmail ?? data.user_email,
    turnstileToken: data.turnstileToken ?? data.turnstile_token,
    webhookUrl: data.webhookUrl ?? data.webhook_url,
    webhookSecret: data.webhookSecret ?? data.webhook_secret,
  }));

const contactSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(200),
    subject: z.string().min(2).max(120),
    message: z.string().min(5).max(2000),
    turnstileToken: z.string().min(1).optional(),
    turnstile_token: z.string().min(1).optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    turnstileToken: data.turnstileToken ?? data.turnstile_token,
  }));

const deleteSchema = z
  .object({
    reportId: z.string().uuid().optional(),
    report_id: z.string().uuid().optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.reportId || data.report_id || data.email, {
    message: "Report ID or email is required",
  })
  .transform((data) => ({
    reportId: data.reportId ?? data.report_id,
    email: data.email,
  }));

function reportCacheKey(hash: string) {
  return `report:by_url:${hash}`;
}

function reportTtl(env: Env) {
  const ttl = Number(env.REPORT_CACHE_TTL_SECONDS || 172800);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : 172800;
}

type AggregatePayload<T> = {
  items: T[];
  updated_at: number;
};

async function refreshAggregate<T>(
  env: Env,
  key: string,
  ttlSeconds: number,
  compute: () => Promise<T[]>,
) {
  const items = await compute();
  const payload: AggregatePayload<T> = { items, updated_at: Date.now() };
  await env.KV.put(key, JSON.stringify(payload), {
    expirationTtl: ttlSeconds,
  });
  return payload;
}

async function getAggregateWithCache<T>(
  env: Env,
  key: string,
  ttlSeconds: number,
  refreshMs: number,
  compute: () => Promise<T[]>,
  ctx?: ExecutionContext,
) {
  const cached = await env.KV.get(key);
  if (cached) {
    try {
      const payload = JSON.parse(cached) as AggregatePayload<T>;
      if (
        ctx &&
        payload.updated_at &&
        Date.now() - payload.updated_at > refreshMs
      ) {
        ctx.waitUntil(refreshAggregate(env, key, ttlSeconds, compute));
      }
      return payload;
    } catch {
      await env.KV.delete(key);
    }
  }

  return refreshAggregate(env, key, ttlSeconds, compute);
}

async function getCachedReport(env: Env, url: string) {
  const hash = await sha256(url);
  const raw = await env.KV.get(reportCacheKey(hash));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ReportResult;
  } catch {
    await env.KV.delete(reportCacheKey(hash));
    return null;
  }
}

async function fetchReportResult(env: Env, id: string, withSourceUrl = false) {
  let cached: ReportResult | null = null;
  const cachedRaw = await env.KV.get(`report:by_id:${id}`);
  if (cachedRaw) {
    try {
      cached = JSON.parse(cachedRaw) as ReportResult;
      if (!withSourceUrl) {
        return { result: cached, sourceUrl: undefined };
      }
    } catch {
      await env.KV.delete(`report:by_id:${id}`);
    }
  }

  const record = await getReport(env, id);
  if (!record) {
    return cached ? { result: cached, sourceUrl: undefined } : null;
  }

  let data: ReportData;
  try {
    data = JSON.parse((record as any).full_report_json ?? "{}") as ReportData;
  } catch {
    return cached ? { result: cached, sourceUrl: record.url } : null;
  }
  const base = env.R2_PUBLIC_BASE_URL || "https://r2.thedoorpost.com";
  const result: ReportResult = {
    id: record.id,
    data,
    image: `${base.replace(/\/$/, "")}/${record.screenshot_path}`,
  };

  await env.KV.put(`report:by_id:${id}`, JSON.stringify(result), {
    expirationTtl: 3600,
  });

  return { result, sourceUrl: record.url };
}

async function setCachedReport(env: Env, url: string, result: ReportResult) {
  const hash = await sha256(url);
  await env.KV.put(reportCacheKey(hash), JSON.stringify(result), {
    expirationTtl: reportTtl(env),
  });
  await env.KV.put(`report:by_id:${result.id}`, JSON.stringify(result), {
    expirationTtl: reportTtl(env),
  });
}

/**
 * Processes a single screenshot analysis job.
 *
 * Jobs are dispatched via Cloudflare Queues for parallel processing.
 */
async function processJob(
  env: Env,
  jobId: string,
  url: string,
  userEmail?: string,
  webhookUrl?: string,
  webhookSecret?: string,
) {
  const now = Date.now();
  const reportId = crypto.randomUUID();
  const timings: Record<string, number> = {};
  const jobStart = Date.now();

  await updateJob(env, jobId, {
    status: "running",
    progress: 10,
    message: JobMessages.CONNECTING,
  });

  try {
    if (env.MOCK_ANALYZE === "true") {
      const mock: ReportData = {
        overall_score: 78,
        metrics: { value_prop: 75, cta_visibility: 80, trust_design: 70 },
        summary:
          "Clear but could optimize above-the-fold information density and trust elements.",
        fixes: [
          {
            title: "Strengthen Main Value Proposition",
            description:
              "Elevate core benefits to the hero section title area.",
            impact: "high",
          },
          {
            title: "Improve CTA Contrast",
            description:
              "Use higher contrast colors and increase button whitespace.",
            impact: "medium",
          },
          {
            title: "Add Trust Indicators",
            description:
              "Include customer logos and security certification badges.",
            impact: "medium",
          },
        ],
      };
      const objectKey = `snapshots/${reportId}.webp`;
      const imageUrl = `${(env.R2_PUBLIC_BASE_URL || "https://r2.thedoorpost.com").replace(/\/$/, "")}/${objectKey}`;

      const result: ReportResult = {
        id: reportId,
        data: mock,
        image: imageUrl,
      };
      await updateJob(env, jobId, {
        progress: 90,
        message: JobMessages.GENERATING_REPORT,
      });
      await setCachedReport(env, url, result);
      const storageStart = Date.now();
      const dbResult = await saveReport(env, {
        id: reportId,
        url,
        score: mock.overall_score,
        summary: mock.summary,
        screenshot_path: objectKey,
        created_at: now,
        user_email: userEmail ?? null,
        data: mock,
      });
      timings.storage_ms = Date.now() - storageStart;
      if (!dbResult.success) {
        console.warn(
          `[D1] Report save failed (non-critical): ${dbResult.error}`,
        );
      }
      timings.total_ms = Date.now() - jobStart;
      console.log(
        JSON.stringify({
          type: "job_timing",
          job_id: jobId,
          status: "complete",
          timings,
        }),
      );
      await updateJob(env, jobId, { timings });
      await completeJob(env, jobId, result);
      if (webhookUrl) {
        const payload = {
          event: "analysis.complete",
          job_id: jobId,
          url,
          user_email: userEmail ?? null,
          report: result,
          timings,
        };
        await sendWebhookWithDLQ(
          env,
          jobId,
          webhookUrl,
          payload,
          webhookSecret,
        );
      }
      return;
    }

    await updateJob(env, jobId, {
      progress: 40,
      message: JobMessages.SCREENSHOTTING,
    });
    const renderStart = Date.now();
    const render = await renderScreenshot(env, url);
    timings.render_ms = Date.now() - renderStart;

    await updateJob(env, jobId, {
      progress: 70,
      message: JobMessages.ANALYZING,
    });
    const aiBase64 = Buffer.from(render.ai).toString("base64");

    const aiStart = Date.now();
    const report = await analyzeScreenshot(
      env,
      aiBase64,
      async (score) => {
        await updateJob(env, jobId, { partial_score: score, progress: 75 });
      },
      render.contentType === "image/png" ? "image/png" : "image/webp",
    );
    timings.ai_ms = Date.now() - aiStart;

    await updateJob(env, jobId, {
      progress: 90,
      message: JobMessages.GENERATING_REPORT,
    });
    const storageStart = Date.now();
    const { key, url: imageUrl } = await putScreenshot(
      env,
      reportId,
      render.full,
      render.contentType,
    );

    const result: ReportResult = {
      id: reportId,
      data: report,
      image: imageUrl,
    };
    await setCachedReport(env, url, result);

    const dbResult = await saveReport(env, {
      id: reportId,
      url,
      score: report.overall_score || 0,
      summary: report.summary || "Analysis complete",
      screenshot_path: key,
      created_at: now,
      user_email: userEmail ?? null,
      data: report,
    });
    timings.storage_ms = Date.now() - storageStart;
    if (!dbResult.success) {
      console.warn(`[D1] Report save failed (non-critical): ${dbResult.error}`);
    }

    timings.total_ms = Date.now() - jobStart;
    await updateJob(env, jobId, {
      timings,
    });
    console.log(
      JSON.stringify({
        type: "job_timing",
        job_id: jobId,
        status: "complete",
        timings,
      }),
    );
    await completeJob(env, jobId, result);
    if (webhookUrl) {
      const payload = {
        event: "analysis.complete",
        job_id: jobId,
        url,
        user_email: userEmail ?? null,
        report: result,
        timings,
      };
      await sendWebhookWithDLQ(env, jobId, webhookUrl, payload, webhookSecret);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    timings.total_ms = Date.now() - jobStart;
    console.log(
      JSON.stringify({
        type: "job_timing",
        job_id: jobId,
        status: "error",
        timings,
        error: message,
      }),
    );
    await updateJob(env, jobId, { timings });
    await failJob(env, jobId, message);
    if (webhookUrl) {
      const payload = {
        event: "analysis.error",
        job_id: jobId,
        url,
        user_email: userEmail ?? null,
        error: message,
        timings,
      };
      await sendWebhookWithDLQ(env, jobId, webhookUrl, payload, webhookSecret);
    }
  }
}

app.post("/api/analyze", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = analyzeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: ErrorMessages.INVALID_REQUEST }, 400);
  }

  const { url, userEmail, turnstileToken, webhookUrl, webhookSecret } =
    parsed.data;
  const requestId = c.get("requestId") as string | undefined;
  // Only trust cf-connecting-ip from Cloudflare to prevent IP spoofing
  // x-forwarded-for can be spoofed by attackers, never use it for rate limiting
  const ip = c.req.header("cf-connecting-ip") || "unknown";
  console.log(
    JSON.stringify({
      type: "analyze.request",
      request_id: requestId,
      url,
      ip,
      has_email: Boolean(userEmail),
    }),
  );

  // Anonymous-only flow: IP/email rate limiting
  const ipLimitRaw = Number(c.env.RATE_LIMIT_IP_PER_MIN || 10);
  const emailLimitRaw = Number(c.env.RATE_LIMIT_EMAIL_PER_MIN || 5);
  const ipLimit =
    Number.isFinite(ipLimitRaw) && ipLimitRaw > 0 ? ipLimitRaw : 10;
  const emailLimit =
    Number.isFinite(emailLimitRaw) && emailLimitRaw > 0 ? emailLimitRaw : 5;

  if (!(await rateLimit(c.env, `ip:${ip}`, ipLimit, 60))) {
    return c.json({ error: ErrorMessages.RATE_LIMIT_EXCEEDED }, 429);
  }
  if (
    userEmail &&
    !(await rateLimit(c.env, `email:${userEmail}`, emailLimit, 60))
  ) {
    return c.json({ error: ErrorMessages.EMAIL_RATE_LIMIT_EXCEEDED }, 429);
  }

  try {
    await validateUrl(url, c.env.ENABLE_DOH_CHECK !== "false");
  } catch (err) {
    return c.json(
      { error: err instanceof Error ? err.message : ErrorMessages.INVALID_URL },
      400,
    );
  }

  const turnstileOk = await verifyTurnstile(c.env, turnstileToken, ip);
  if (!turnstileOk) {
    return c.json({ error: ErrorMessages.UNAUTHORIZED }, 403);
  }

  let normalizedWebhookUrl: string | undefined;
  if (webhookUrl) {
    try {
      const parsedWebhook = await validateUrl(
        webhookUrl,
        c.env.ENABLE_DOH_CHECK !== "false",
      );
      if (parsedWebhook.protocol !== "https:") {
        return c.json({ error: ErrorMessages.INVALID_URL }, 400);
      }
      normalizedWebhookUrl = parsedWebhook.toString();
    } catch {
      return c.json({ error: ErrorMessages.INVALID_URL }, 400);
    }
  }

  const cached = await getCachedReport(c.env, url);
  if (cached) {
    console.log(
      JSON.stringify({
        type: "analyze.cache_hit",
        request_id: requestId,
        url,
      }),
    );
    return c.json({ status: "complete", ...cached });
  }

  const jobId = crypto.randomUUID();
  await createJob(c.env, {
    id: jobId,
    url,
    progress: 5,
    message: JobMessages.QUEUED,
    created_at: Date.now(),
  });

  try {
    await c.env.JOBS_QUEUE.send({
      jobId,
      url,
      userEmail,
      webhookUrl: normalizedWebhookUrl,
      webhookSecret,
      requestedAt: Date.now(),
    } as AnalyzeJobMessage);
  } catch (err) {
    await failJob(
      c.env,
      jobId,
      err instanceof Error ? err.message : "Queue enqueue failed",
    );
    return c.json({ error: ErrorMessages.SERVER_ERROR }, 500);
  }

  const origin = new URL(c.req.url).origin;
  return c.json({
    status: "queued",
    job_id: jobId,
    stream_url: `${origin}/api/jobs/${jobId}/stream`,
    poll_url: `${origin}/api/jobs/${jobId}`,
  });
});

app.post("/api/contact", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: ErrorMessages.INVALID_REQUEST }, 400);
  }

  const { turnstileToken } = parsed.data;
  const ip = c.req.header("cf-connecting-ip") || "unknown";
  const requestId = c.get("requestId") as string | undefined;
  const contactLimitRaw = Number(c.env.CONTACT_RATE_LIMIT_PER_HOUR || 5);
  const contactLimit =
    Number.isFinite(contactLimitRaw) && contactLimitRaw > 0
      ? contactLimitRaw
      : 5;
  if (!(await rateLimit(c.env, `contact:ip:${ip}`, contactLimit, 3600))) {
    return c.json({ error: ErrorMessages.RATE_LIMIT_EXCEEDED }, 429);
  }

  const turnstileOk = await verifyTurnstile(c.env, turnstileToken, ip);
  if (!turnstileOk) {
    return c.json({ error: ErrorMessages.UNAUTHORIZED }, 403);
  }

  const { name, email, subject, message } = parsed.data;
  console.log(
    JSON.stringify({
      type: "contact.request",
      request_id: requestId,
      ip,
      email_present: Boolean(email),
    }),
  );
  const record = {
    id: crypto.randomUUID(),
    name,
    email,
    subject,
    message,
    created_at: Date.now(),
    ip: ip === "unknown" ? null : ip,
    user_agent: c.req.header("User-Agent") || null,
    referrer: c.req.header("Referer") || null,
  };

  const result = await saveContactMessage(c.env, record);
  if (!result.success) {
    return c.json({ error: ErrorMessages.SERVER_ERROR }, 500);
  }

  return c.json({ success: true });
});

app.post("/api/delete", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: ErrorMessages.INVALID_REQUEST }, 400);
  }

  const apiKey = c.req.header(API_KEY_HEADER);
  if (!c.env.API_KEY || apiKey !== c.env.API_KEY) {
    return c.json({ error: ErrorMessages.UNAUTHORIZED }, 401);
  }

  const { reportId, email } = parsed.data;
  const records: Array<{
    id: string;
    url?: string | null;
    screenshot_path?: string | null;
  }> = [];

  if (reportId) {
    const report = await c.env.DB.prepare(
      `SELECT id, url, screenshot_path FROM reports WHERE id = ?`,
    )
      .bind(reportId)
      .first();
    if (report) {
      records.push(report as any);
      await c.env.DB.prepare(`DELETE FROM reports WHERE id = ?`)
        .bind(reportId)
        .run();
    }
  }

  let deletedContacts = 0;
  if (email) {
    const results = await c.env.DB.prepare(
      `SELECT id, url, screenshot_path FROM reports WHERE user_email = ?`,
    )
      .bind(email)
      .all();
    if (results.results?.length) {
      records.push(...(results.results as any[]));
      await c.env.DB.prepare(`DELETE FROM reports WHERE user_email = ?`)
        .bind(email)
        .run();
    }

    const contactResult = await c.env.DB.prepare(
      `DELETE FROM contact_messages WHERE email = ?`,
    )
      .bind(email)
      .run();
    deletedContacts = contactResult.success
      ? ((contactResult as any).meta?.changes ?? 0)
      : 0;
  }

  const uniqueRecords = Array.from(
    new Map(records.map((record) => [record.id, record])).values(),
  );

  await Promise.all(
    uniqueRecords.map(async (record) => {
      if (record.screenshot_path) {
        await c.env.MY_BUCKET.delete(record.screenshot_path);
      }
      await c.env.KV.delete(`report:by_id:${record.id}`);
      if (record.url) {
        const hash = await sha256(record.url);
        await c.env.KV.delete(reportCacheKey(hash));
      }
    }),
  );

  return c.json({
    success: true,
    deleted_reports: uniqueRecords.length,
    deleted_contact_messages: deletedContacts,
  });
});

app.get("/api/jobs/:id", async (c) => {
  const id = c.req.param("id");
  if (!isValidUUID(id)) {
    return c.json({ error: "Invalid job ID" }, 400);
  }
  const job = await getJob(c.env, id);
  if (!job) return c.json({ error: ErrorMessages.JOB_NOT_FOUND }, 404);
  return c.json(job);
});

app.get("/api/jobs/:id/stream", (c) => {
  const id = c.req.param("id");
  if (!isValidUUID(id)) {
    return c.json({ error: "Invalid job ID" }, 400);
  }
  const origin = c.req.header("Origin");
  return streamJob(c.env, id, origin);
});

app.get("/api/reports/:id", async (c) => {
  const id = c.req.param("id");
  if (!isValidUUID(id)) {
    return c.json({ error: "Invalid report ID" }, 400);
  }
  const data = await fetchReportResult(c.env, id);
  if (!data) return c.json({ error: ErrorMessages.NOT_FOUND }, 404);
  return c.json(data.result, 200, {
    "Cache-Control": "public, max-age=3600",
  });
});

app.get("/api/reports/:id/export.csv", async (c) => {
  const id = c.req.param("id");
  if (!isValidUUID(id)) {
    return c.json({ error: "Invalid report ID" }, 400);
  }
  const data = await fetchReportResult(c.env, id, true);
  if (!data) return c.json({ error: ErrorMessages.NOT_FOUND }, 404);
  const csv = buildReportCsv(data.result, data.sourceUrl);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"thedoorpost-report-${id}.csv\"`,
      "Cache-Control": "private, max-age=60",
    },
  });
});

app.get("/api/reports/:id/export.pdf", async (c) => {
  const id = c.req.param("id");
  if (!isValidUUID(id)) {
    return c.json({ error: "Invalid report ID" }, 400);
  }
  const data = await fetchReportResult(c.env, id, true);
  if (!data) return c.json({ error: ErrorMessages.NOT_FOUND }, 404);
  const pdfBytes = await buildReportPdf(data.result);
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"thedoorpost-report-${id}.pdf\"`,
      "Cache-Control": "private, max-age=60",
    },
  });
});

app.get("/api/aggregate/best", async (c) => {
  const payload = await getAggregateWithCache(
    c.env,
    "aggregate:best:v1",
    3600,
    15 * 60 * 1000,
    () => getBestReports(c.env),
    c.executionCtx,
  );
  return c.json(payload, 200, {
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
  });
});

app.get("/api/aggregate/common-mistakes", async (c) => {
  const payload = await getAggregateWithCache(
    c.env,
    "aggregate:common-mistakes:v1",
    3600,
    15 * 60 * 1000,
    () => getCommonMistakes(c.env),
    c.executionCtx,
  );
  return c.json(payload, 200, {
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
  });
});

app.get("/health", async (c) => {
  const checks = {
    ok: true,
    ts: Date.now(),
    dependencies: {
      kv: "unknown",
      d1: "unknown",
      r2: "unknown",
      openrouter: "unknown",
    },
    timings: {
      kv_ms: 0,
      d1_ms: 0,
      r2_ms: 0,
      total_ms: 0,
    },
  };

  const start = Date.now();
  // KV check
  try {
    const testKey = `health:check:${Date.now()}`;
    const kvStart = Date.now();
    await c.env.KV.put(testKey, "ping", { expirationTtl: 60 });
    const value = await c.env.KV.get(testKey);
    checks.dependencies.kv = value === "ping" ? "ok" : "degraded";
    checks.timings.kv_ms = Date.now() - kvStart;
  } catch (err) {
    checks.dependencies.kv = "error";
    checks.ok = false;
    console.error("[HEALTH] KV check failed:", err);
  }

  // D1 check
  try {
    const d1Start = Date.now();
    await c.env.DB.prepare("SELECT 1").first();
    checks.dependencies.d1 = "ok";
    checks.timings.d1_ms = Date.now() - d1Start;
  } catch (err) {
    checks.dependencies.d1 = "error";
    checks.ok = false;
    console.error("[HEALTH] D1 check failed:", err);
  }

  // R2 check
  try {
    const testKey = `health-check-${Date.now()}`;
    const r2Start = Date.now();
    await c.env.MY_BUCKET.put(testKey, new Uint8Array([1, 2, 3]));
    await c.env.MY_BUCKET.delete(testKey);
    checks.dependencies.r2 = "ok";
    checks.timings.r2_ms = Date.now() - r2Start;
  } catch (err) {
    checks.dependencies.r2 = "error";
    checks.ok = false;
    console.error("[HEALTH] R2 check failed:", err);
  }

  // OpenRouter check (lightweight - no API call, just configuration)
  try {
    const hasKey = Boolean(
      c.env.OPENROUTER_API_KEYS || c.env.OPENROUTER_API_KEY,
    );
    if (!hasKey) {
      checks.dependencies.openrouter = "missing_key";
      checks.ok = false;
    } else {
      checks.dependencies.openrouter = "ok";
    }
  } catch (err) {
    checks.dependencies.openrouter = "error";
    checks.ok = false;
    console.error("[HEALTH] OpenRouter check failed:", err);
  }

  checks.timings.total_ms = Date.now() - start;
  return c.json(checks, checks.ok ? 200 : 503);
});

export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) =>
    app.fetch(request, validateEnv(env), ctx),
  queue: async (
    batch: MessageBatch<AnalyzeJobMessage>,
    env: Env,
    _ctx: ExecutionContext,
  ) => {
    const validatedEnv = validateEnv(env);
    for (const message of batch.messages) {
      const body = message.body;
      try {
        await processJob(
          validatedEnv,
          body.jobId,
          body.url,
          body.userEmail,
          body.webhookUrl,
          body.webhookSecret,
        );
        message.ack();
      } catch (err) {
        console.error("[QUEUE] Job failed:", err);
        message.retry();
      }
    }
  },
};

export { app };
export { RateLimiter } from "./lib/rate-limit";
