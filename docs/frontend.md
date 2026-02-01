# Frontend Spec

## Stack

- Next.js (App Router recommended)
- OpenNext Cloudflare adapter (Workers runtime)
- CSS Modules or custom CSS

## Routes

- / (Landing)
- /analyze (Form + results)
- /report/[id] (Public report page)
- /pricing
- /blog

## Rendering

- SSR for landing, pricing, report pages via OpenNext.
- Client component for the analyze form.

## Data Fetching

- /report/[id] uses `fetch` from Worker API.
- Cache headers for report pages to enable Edge cache.
- /api/analyze returns job_id on cache miss; subscribe via SSE or poll.

## UX Requirements

- Form validation (URL required).
- Turnstile challenge required before submit.
- Loading states, progress steps, and error states.
- Progress steps: 10% connect, 40% screenshot, 70% AI analysis, 90% finalizing.
- Show score immediately once available, then stream fixes.
- Show screenshot and report in two-column layout.

## Accessibility

- Keyboard accessible form.
- Proper ARIA labels for charts and score.
