# Routing & Deployment

## Domains

- thedoorpost.com -> Cloudflare Workers (OpenNext)
- api.thedoorpost.com -> Worker
- r2.thedoorpost.com -> R2

## Worker Routes

- api.thedoorpost.com/api/\*
- api.thedoorpost.com/health

## Frontend Routes

- /report/[id]
- /industry/[slug]
- /use-case/[slug]

## Deployment Steps

0. Optional: use `./deploy.sh` with env vars to set secrets + deploy both apps.
1. Deploy frontend via OpenNext: `npm --prefix apps/web run deploy`.
2. Worker deployed via `npm --prefix apps/worker run deploy`.
3. Enable Browser Rendering API in Cloudflare dashboard.

OpenNext config files

- `apps/web/open-next.config.ts`
- `apps/web/wrangler.jsonc`

OpenNext incremental cache (R2)

- Create R2 bucket `doorpost-next-cache` and bind to `NEXT_INC_CACHE_R2_BUCKET`.
- Optional prefix with `NEXT_INC_CACHE_R2_PREFIX`.

## Environment Variables

- OPENROUTER_API_KEYS (Worker secret)
- TURNSTILE_SECRET (Worker secret)
- AI_MODEL / AI_FALLBACK_MODELS (Worker vars)
- CF_ACCOUNT_ID
- D1 database binding
- R2 bucket binding
- KV namespace binding
- Queue binding (`JOBS_QUEUE`)
- Durable Object binding (`RATE_LIMITER`)
- NEXT_PUBLIC_API_BASE (frontend build-time and Worker vars)
- NEXT_PUBLIC_TURNSTILE_SITE_KEY (frontend build-time)

## CI/CD

- Frontend deploy via OpenNext in CI.
- Worker deploy in CI with wrangler.
- Workflows: `.github/workflows/web-deploy.yml`, `.github/workflows/worker-deploy.yml`.
