# Observability & Runbook

## Logging

- Worker logs shipped via Logpush.
- Browser Rendering errors logged in Worker.
- Request IDs included on all responses via `x-request-id`.

## Metrics

- Request count, latency, error rate.
- OpenRouter API latency and failures.
- Cache hit ratio (KV + edge cache).
- Job timing logs: render_ms, ai_ms, storage_ms, total_ms.

## Alerts

- Error rate > 3% in 5 minutes.
- P95 latency > 30s for 10 minutes.
- Browser Rendering failures spike.

## Runbook

- Incident: Browser Rendering degraded
  - Serve cached reports, prompt retry.
- Incident: OpenRouter failures
  - Switch model or degrade gracefully.
- Incident: D1 downtime
  - Serve cached reports, retry background writes.
- Incident: Queue backlog
  - Inspect queue depth, scale consumers, reduce max batch size if needed.
