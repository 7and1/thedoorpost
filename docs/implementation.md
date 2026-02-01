# Implementation Plan (Detailed)

## Step 1: Cloudflare Resources

- Create D1 database: `doorpost-db`.
- Create R2 bucket: `doorpost-snapshots`.
- Create R2 bucket: `doorpost-next-cache` (OpenNext incremental cache).
- Create KV namespace: `doorpost-cache`.
- Enable Cloudflare Browser Rendering (required for serverless screenshots).

## Step 2: Worker Gateway (Core)

- Create `wrangler.toml` with bindings for D1, R2, KV, and vars.
- Add Durable Object binding for strict rate limiting.
- Add Cloudflare Queue binding for async jobs.
- Implement API routes:
  - POST /api/analyze
  - GET /api/jobs/:id
  - GET /api/jobs/:id/stream (SSE)
  - GET /api/reports/:id
- Add export endpoints for CSV/PDF and webhook callbacks.
- Protect POST routes with Turnstile if enabled.
- Add URL validator and SSRF protection.
- Add rate limiter using KV.
- Add cache lookup using KV.
- Store job state in KV with TTL.

## Step 3: Browser Rendering + AI

- Use `@cloudflare/puppeteer` in Worker.
- Render with viewport 1440x900.
- Downscale AI image to 1024px width (or smaller) to reduce cost.
- Call OpenRouter with score-first prompt; emit progress events.

## Step 4: Storage Integration

- Store screenshot to R2 via Worker.
- Store report data to D1 via `ctx.waitUntil`.
- Write-through cache to KV on completion.

## Step 5: Frontend UX

- Next.js App Router + OpenNext Cloudflare adapter.
- Build pages: landing, analyze, report, pricing.
- AnalyzerForm uses SSE or polling for progress updates.
- Show progress steps (10/40/70/90%).

## Step 6: SEO

- Add sitemap.xml generator.
- Add robots.txt.
- Add structured data tags.
- Create initial blog posts, industry pages, and report aggregates.

## Step 7: Monitoring & Alerts

- Configure error tracking.
- Add health endpoints.
- Emit timing logs for render/AI/storage durations.
- Create uptime checks.

## Step 8: Launch

- Connect domain and TLS.
- Run load tests and fix bottlenecks.
- Release to production.

## Optional VPS Mode (Only if required)

- Use when you need custom browser fingerprints or dependencies.
- Add Watchtower or systemd for auto-restarts.
- Enforce strict Worker timeouts for Tunnel calls.
- Add Tunnel health checks and alerts.
