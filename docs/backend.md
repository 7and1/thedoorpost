# Backend Spec

## API Endpoints (Worker Gateway)

### POST /api/analyze

Request JSON

- url: string (required)
- userEmail: string (optional)
- turnstileToken: string (optional if Turnstile disabled)
- webhook_url: string (optional, https)
- webhook_secret: string (optional, used to sign callbacks)

Response JSON (cache hit)

- status: "complete"
- id: string
- data: object (AI report)
- image: string (R2 URL)

Response JSON (cache miss)

- status: "queued"
- job_id: string
- stream_url: string (SSE)
- poll_url: string (GET status)

Behaviors

- Validate URL scheme (https/http), block private IPs.
- Validate webhook URL (https only).
- Rate limit by IP and email.
- Check KV cache. If cached, return complete report immediately.
- If not cached, enqueue job in KV and return job_id.
- Optional webhook callback on completion/error.

### GET /api/jobs/:id

Polling endpoint for progress

Response JSON

- status: queued | running | complete | error
- progress: number (0-100)
- message: string
- result?: { id, data, image }

### GET /api/jobs/:id/stream

SSE endpoint

- event: progress (data: {progress, message})
- event: complete (data: {id, data, image})
- event: error (data: {message})

### GET /api/reports/:id

- Returns stored report from KV (preferred) or D1.
- Cached at edge (Cache-Control: public, max-age=3600).

### GET /api/reports/:id/export.csv

- Returns CSV export of the report.

### GET /api/reports/:id/export.pdf

- Returns PDF export of the report.

### POST /api/contact

Request JSON

- name: string (required)
- email: string (required)
- subject: string (required)
- message: string (required)
- turnstileToken: string (optional if Turnstile disabled)

Response JSON

- success: true

Behaviors

- Rate limit by IP (default 5/hour).
- Store message in D1 `contact_messages`.

## Browser Rendering Flow (Serverless)

- Use Cloudflare Browser Rendering API from Worker.
- Headless Chromium
- Viewport: 1440x900 for storage
- AI Image: downscale to 1024px width (reduce tokens + latency)
- Timeout: 15000ms for navigation
- Block heavy resources (video, font) to speed.

## OpenRouter Strategy

- Prompt requires strict JSON response.
- Request score-first ordering to enable progressive UX.
- Rotate API keys and fall back across models for stability.

## Data Consistency (Write-after-read)

- Return report JSON directly to client upon completion.
- Use `ctx.waitUntil` to write to D1 and KV asynchronously.
- For report pages, read KV first then D1 to mask D1 latency.

## Error Handling

- Retry OpenRouter 2x with exponential backoff.
- If AI fails, return partial with reason and allow retry.
- Return 4xx for invalid URL.

## Caching

- Store final report JSON in KV by url hash.
- TTL default 48h; extend for paid plan.
- Store job status in KV (TTL 1h).

## Webhooks

- POST payload with `event` ("analysis.complete" | "analysis.error") to webhook_url.
- Signed with `x-doorpost-signature: sha256=...` when webhook_secret is provided.
