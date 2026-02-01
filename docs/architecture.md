# Architecture

## High-Level Diagram (ASCII)

User Browser
| HTTPS
v
Cloudflare Workers (OpenNext SSR)
| /api/\*
v
Cloudflare Worker Gateway
| KV Cache (report cache + rate limits)
| D1 (reports)
| R2 (screenshots)
| Browser Rendering API (headless Chromium)
| OpenRouter API

## Key Components

- Frontend App (OpenNext): public marketing + report UI + submission form.
- Worker Gateway: API surface, cache, validation, storage writes.
- Queue Processor: Cloudflare Queues for async analysis jobs.
- Rate Limiter: Durable Objects for strict per-key limits.
- Browser Rendering: serverless screenshot engine inside Workers.
- D1: authoritative report metadata store.
- R2: screenshot storage, served via public bucket domain.
- KV: cache and rate limits; hot path reads.
- R2 (OpenNext): incremental cache for SSR pages.

## DNS and Routing

- thedoorpost.com -> Cloudflare Workers (OpenNext)
- api.thedoorpost.com -> Cloudflare Worker
- r2.thedoorpost.com -> R2 public bucket

## Cache Strategy

- Edge Cache: cache GET /reports/:id and public report pages.
- KV: cache for URL-based report results with TTL (24-72h).

## Failure Modes

- Browser Rendering API slow/unavailable: return cached report; allow retry.
- OpenRouter errors: retry w/ exponential backoff; return partial error.
- D1 write latency: write-through to KV and return response immediately.

## Security Boundaries

- Worker validates URLs, blocks private IP ranges, prevents SSRF.
- Turnstile protects /api/analyze and /api/contact when enabled.
- R2 bucket read-only public access for images; write only via Worker.

## Optional VPS Mode (Only if required)

Use only when you need custom browser fingerprints or special dependencies.

Required controls

- Auto-restart (Watchtower or systemd) and health checks.
- Strict Worker timeouts for Tunnel requests.
- Dedicated logs/alerts for Tunnel stability.
