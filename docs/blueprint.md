# Blueprint

## Product Summary

TheDoorpost analyzes a website's above-the-fold experience using a screenshot + AI evaluation to deliver a numeric score and actionable CRO improvements. Users submit a URL and receive a report with scores, insights, and a screenshot.

## Core Outcomes

- Fast, reliable analysis with progressive UX (job updates + score-first).
- P95 < 25s for cold run; < 8s for cache hits.
- Production-quality data pipeline: screenshot -> AI -> report -> storage -> delivery.
- Search-friendly public report pages to drive organic growth.

## Target Users

- Founders and marketers optimizing landing pages.
- Growth agencies generating audit reports.
- Designers looking for fast UI feedback.

## Functional Scope

- Submit URL for analysis.
- Produce a scored report + 3 prioritized fixes.
- Persist report and screenshot for reuse.
- Public report page with shareable URL.

## Architecture Summary

- Frontend: Next.js (OpenNext on Cloudflare Workers).
- Gateway + Rendering: Cloudflare Worker + Browser Rendering API (serverless).
- Storage: Cloudflare R2 for images, D1 for report metadata, KV for cache and rate limit.

## Dataflow

1. User submits URL via frontend.
2. Worker validates, checks KV cache.
3. Cache miss -> Worker starts job, returns job_id immediately.
4. Worker renders screenshot via Browser Rendering API, calls OpenRouter, streams progress.
5. Worker stores image in R2, writes report to D1, writes cache to KV.
6. Frontend subscribes to job progress (SSE or polling) and renders result.

## Performance Targets

- Screenshot timeout: 15s, total job timeout: 30s.
- R2 upload < 2s for 300-800KB WebP.
- AI response within 8-12s typical.

## Reliability Targets

- 99.9% uptime for worker and frontend.
- Automated retries for transient failures (network, AI 5xx).

## Security & Compliance

- Strict URL validation and SSRF protections.
- Secrets stored in Wrangler secrets.
- Avoid storing PII; user email optional.

## Deliverables

- Production deployment on TheDoorpost.com.
- Documentation under /docs.
- CI/CD for OpenNext frontend + Workers.
