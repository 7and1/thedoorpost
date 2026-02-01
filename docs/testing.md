# Testing Strategy

## Unit Tests

- URL validation utility.
- JSON schema validation for AI responses.
- Cache key generation.

## Integration Tests

- Worker -> Browser Rendering API (mock OpenRouter).
- D1 insert and retrieve.
- R2 upload and public URL.
- SSE job progress and completion.

## End-to-End

- Submit URL from UI and check report page.
- Validate edge caching behavior.
- Playwright smoke: submit -> poll -> render report.

## E2E Command

- apps/web: `npm run test:e2e` (requires `E2E_BASE_URL`)

## Load Testing

- 50-100 concurrent requests using k6 or autocannon.

## QA Checklist

- P95 latency < 25s on cold start.
- Screenshot loads correctly on report page.
- Error messaging is user-friendly.
