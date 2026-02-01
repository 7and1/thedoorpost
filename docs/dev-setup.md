# Local Development Setup

## Prereqs

- Node.js 18+
- Wrangler CLI
- Docker (optional for local analyzer)

## Local Worker

- Create `.dev.vars` for local env values (OpenRouter + Turnstile).
- Run `wrangler dev` for the worker.
- Set `TURNSTILE_SKIP_VERIFY=true` for local testing (or provide TURNSTILE_SECRET).
- Create Queue + Durable Object bindings in `wrangler.toml` before dev.

## Local Frontend

- Run `next dev` for local UI.
- Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `apps/web/.env.local`.
- Use `opennextjs-cloudflare preview` to test the Cloudflare worker bundle.

## Local Analyzer (Optional)

- Use Playwright/Puppeteer locally to mock screenshot flow.
- In local dev, allow a mock image to bypass Browser Rendering.

## Local D1/R2

- Use `wrangler d1` and `wrangler r2` for local emulation.

## Smoke Test

- POST /api/analyze with a sample URL.
- Verify report JSON and image URL.

## E2E Smoke

- Set `E2E_BASE_URL` and run `npm run test:e2e` in `apps/web`.
