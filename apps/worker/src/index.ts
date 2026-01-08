import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import type { Env } from "./env";
import { JobMessages, ErrorMessages } from "./constants";
import { validateUrl } from "./lib/ssrf";
import { sha256 } from "./lib/hash";
import { analyzeScreenshot } from "./lib/openai";
import { renderScreenshot } from "./lib/render";
import { putScreenshot, saveReport, getReport } from "./lib/storage";
import { createJob, updateJob, completeJob, failJob, getJob } from "./lib/jobs";
import { streamJob } from "./lib/sse";
import { getBestReports, getCommonMistakes } from "./lib/aggregates";
import { rateLimit } from "./lib/rate-limit";
import type { ReportData, ReportResult } from "@thedoorpost/shared";

const app = new Hono<{ Bindings: Env }>();

// Strict CORS - only allow thedoorpost.com
const ALLOWED_ORIGINS = new Set([
  "https://thedoorpost.com",
  "https://www.thedoorpost.com",
]);

// API key authentication middleware
const API_KEY_HEADER = "x-api-key";

app.use("/api/*", async (c, next) => {
  // Allow health check without auth
  if (c.req.path === "/health") {
    return next();
  }

  // Skip API key check in development if disabled
  if (c.env.DISABLE_API_KEY_AUTH === "true") {
    return next();
  }

  const apiKey = c.req.header(API_KEY_HEADER);
  const expectedKey = c.env.API_KEY;

  if (!expectedKey) {
    // API_KEY not configured, allow requests (should be set in production)
    return next();
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
    const originUrl = new URL(origin);
    const hostname = originUrl.hostname.toLowerCase();
    const allowedHostnames = ["thedoorpost.com", "www.thedoorpost.com"];
    if (!allowedHostnames.includes(hostname)) {
      return c.json({ error: ErrorMessages.UNAUTHORIZED_ORIGIN }, 403);
    }
  }
  await next();
});

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return null;
      try {
        const originUrl = new URL(origin);
        const hostname = originUrl.hostname.toLowerCase();
        return ["thedoorpost.com", "www.thedoorpost.com"].includes(hostname)
          ? origin
          : null;
      } catch {
        return null;
      }
    },
    credentials: true,
  }),
);

const analyzeSchema = z.object({
  url: z.string().url(),
  userEmail: z.string().email().optional(),
});

function reportCacheKey(hash: string) {
  return `report:by_url:${hash}`;
}

function reportTtl(env: Env) {
  const ttl = Number(env.REPORT_CACHE_TTL_SECONDS || 172800);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : 172800;
}

async function getCachedReport(env: Env, url: string) {
  const hash = await sha256(url);
  const raw = await env.KV.get(reportCacheKey(hash));
  if (!raw) return null;
  return JSON.parse(raw) as ReportResult;
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
 * IMPORTANT: Current limitation - jobs are processed sequentially within each
 * worker instance via waitUntil(). For parallel processing, migrate to
 * Cloudflare Queues:
 * https://developers.cloudflare.com/queues/
 *
 * TODO: Implement Cloudflare Queues for true parallel job processing
 * and better throughput under load.
 */
async function processJob(
  env: Env,
  jobId: string,
  url: string,
  userEmail?: string,
) {
  const now = Date.now();
  const reportId = crypto.randomUUID();

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
      if (!dbResult.success) {
        console.warn(
          `[D1] Report save failed (non-critical): ${dbResult.error}`,
        );
      }
      await completeJob(env, jobId, result);
      return;
    }

    await updateJob(env, jobId, {
      progress: 40,
      message: JobMessages.SCREENSHOTTING,
    });
    const render = await renderScreenshot(env, url);

    await updateJob(env, jobId, {
      progress: 70,
      message: JobMessages.ANALYZING,
    });
    const aiBase64 = Buffer.from(render.ai).toString("base64");

    const report = await analyzeScreenshot(env, aiBase64, async (score) => {
      await updateJob(env, jobId, { partial_score: score, progress: 75 });
    });

    await updateJob(env, jobId, {
      progress: 90,
      message: JobMessages.GENERATING_REPORT,
    });
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
    if (!dbResult.success) {
      console.warn(`[D1] Report save failed (non-critical): ${dbResult.error}`);
    }

    await completeJob(env, jobId, result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await failJob(env, jobId, message);
  }
}

app.post("/api/analyze", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = analyzeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: ErrorMessages.INVALID_REQUEST }, 400);
  }

  const { url, userEmail } = parsed.data;
  // Only trust cf-connecting-ip from Cloudflare to prevent IP spoofing
  // x-forwarded-for can be spoofed by attackers, never use it for rate limiting
  const ip = c.req.header("cf-connecting-ip") || "unknown";
  const ipLimit = Number(c.env.RATE_LIMIT_IP_PER_MIN || 10);
  const emailLimit = Number(c.env.RATE_LIMIT_EMAIL_PER_MIN || 5);

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

  const cached = await getCachedReport(c.env, url);
  if (cached) {
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

  c.executionCtx.waitUntil(processJob(c.env, jobId, url, userEmail));

  const origin = new URL(c.req.url).origin;
  return c.json({
    status: "queued",
    job_id: jobId,
    stream_url: `${origin}/api/jobs/${jobId}/stream`,
    poll_url: `${origin}/api/jobs/${jobId}`,
  });
});

app.get("/api/jobs/:id", async (c) => {
  const job = await getJob(c.env, c.req.param("id"));
  if (!job) return c.json({ error: ErrorMessages.JOB_NOT_FOUND }, 404);
  return c.json(job);
});

app.get("/api/jobs/:id/stream", (c) => {
  return streamJob(c.env, c.req.param("id"));
});

app.get("/api/reports/:id", async (c) => {
  const id = c.req.param("id");
  const cached = await c.env.KV.get(`report:by_id:${id}`);
  if (cached) {
    return c.json(JSON.parse(cached), 200, {
      "Cache-Control": "public, max-age=3600",
    });
  }

  const record = await getReport(c.env, id);
  if (!record) return c.json({ error: ErrorMessages.NOT_FOUND }, 404);

  const base = c.env.R2_PUBLIC_BASE_URL || "https://r2.thedoorpost.com";
  const data = JSON.parse(
    (record as any).full_report_json ?? "{}",
  ) as ReportData;
  const result: ReportResult = {
    id: record.id,
    data,
    image: `${base.replace(/\/$/, "")}/${record.screenshot_path}`,
  };

  await c.env.KV.put(`report:by_id:${id}`, JSON.stringify(result), {
    expirationTtl: 3600,
  });
  return c.json(result, 200, {
    "Cache-Control": "public, max-age=3600",
  });
});

app.get("/api/aggregate/best", async (c) => {
  const data = await getBestReports(c.env);
  return c.json({ items: data }, 200, {
    "Cache-Control": "public, max-age=3600",
  });
});

app.get("/api/aggregate/common-mistakes", async (c) => {
  const data = await getCommonMistakes(c.env);
  return c.json({ items: data }, 200, {
    "Cache-Control": "public, max-age=3600",
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
      openai: "unknown",
    },
  };

  // KV check
  try {
    const testKey = `health:check:${Date.now()}`;
    await c.env.KV.put(testKey, "ping", { expirationTtl: 10 });
    const value = await c.env.KV.get(testKey);
    checks.dependencies.kv = value === "ping" ? "ok" : "degraded";
  } catch (err) {
    checks.dependencies.kv = "error";
    checks.ok = false;
    console.error("[HEALTH] KV check failed:", err);
  }

  // D1 check
  try {
    await c.env.DB.prepare("SELECT 1").first();
    checks.dependencies.d1 = "ok";
  } catch (err) {
    checks.dependencies.d1 = "error";
    checks.ok = false;
    console.error("[HEALTH] D1 check failed:", err);
  }

  // R2 check
  try {
    const testKey = `health-check-${Date.now()}`;
    await c.env.MY_BUCKET.put(testKey, new Uint8Array([1, 2, 3]));
    await c.env.MY_BUCKET.delete(testKey);
    checks.dependencies.r2 = "ok";
  } catch (err) {
    checks.dependencies.r2 = "error";
    checks.ok = false;
    console.error("[HEALTH] R2 check failed:", err);
  }

  // OpenAI check (lightweight - no API call, just configuration)
  try {
    if (!c.env.OPENAI_API_KEY) {
      checks.dependencies.openai = "missing_key";
      checks.ok = false;
    } else {
      checks.dependencies.openai = "ok";
    }
  } catch (err) {
    checks.dependencies.openai = "error";
    checks.ok = false;
    console.error("[HEALTH] OpenAI check failed:", err);
  }

  return c.json(checks, checks.ok ? 200 : 503);
});

export default {
  fetch: app.fetch,
};

export { app };
