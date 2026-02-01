# Data Model

## D1 Schema (reports)

Fields

- id (TEXT, PK)
- url (TEXT, NOT NULL)
- score (INTEGER)
- summary (TEXT)
- full_report_json (TEXT)
- screenshot_path (TEXT)
- created_at (INTEGER, epoch ms)
- user_email (TEXT, optional)

Indexes

- idx_url
- idx_created_at

## D1 Schema (contact_messages)

Fields

- id (TEXT, PK)
- name (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- subject (TEXT, NOT NULL)
- message (TEXT, NOT NULL)
- created_at (INTEGER, epoch ms)
- ip (TEXT, optional)
- user_agent (TEXT, optional)
- referrer (TEXT, optional)

Indexes

- idx_contact_created_at

## KV Keys

- report:by_url:{sha256(url)} -> cached report JSON (TTL 24-72h)
- report:by_id:{id} -> cached report JSON (TTL 24-72h)
- rate:ip:{ip}:{window} -> count (TTL 60s)
- rate:email:{email}:{window} -> count (TTL 60s)
- job:{id} -> {status, progress, message, result?} (TTL 1h)

## R2 Paths

- snapshots/{reportId}.webp
- thumbnails/{reportId}.webp (optional)
- incremental-cache/\* (OpenNext SSR cache)

## Retention

- Report metadata: 7-30 days (tune by cost and compliance).
- Screenshots: 7-30 days (match report retention).
- Logs: 30-90 days.

## PII

- user_email optional; store hashed email for analytics if needed.
