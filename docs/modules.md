# Module Design

## 1) Frontend App (Next.js + OpenNext)

Responsibilities

- Landing page, feature pages, pricing, blog.
- Report submission form.
- Report results page.
- SEO and structured data.

Key Interfaces

- POST /api/analyze
- GET /api/reports/:id

## 2) Worker Gateway

Responsibilities

- Input validation and SSRF protection.
- Rate limiting (KV).
- Cache lookup (KV).
- Browser Rendering for screenshot capture.
- Call OpenAI for analysis.
- Persist report (D1) + screenshot (R2).
- Return response JSON + job progress updates.

## 3) Browser Rendering + AI Pipeline

Responsibilities

- Render page in headless Chromium (serverless).
- Capture above-the-fold screenshot.
- Call OpenAI vision model.
- Return structured JSON.

## 4) Storage

- D1: reports table.
- R2: screenshot blobs.
- KV: cache by URL hash + rate limit buckets.

## 5) SEO + Content Pipeline

- Structured data: Product, FAQ, Article schemas.
- Programmatic landing pages for industries.
- Blog templates.

## 6) Observability

- Worker logs (Logpush) + Sentry.
- Health checks and uptime alerts.
