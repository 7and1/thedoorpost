# Security & Privacy

## SSRF Protection

- Reject private IPs and local hostnames.
- Resolve DNS and block internal ranges.
- Enforce HTTPS only (optionally allow HTTP with explicit flag).
- Explicitly block: localhost, 127.0.0.1, 0.0.0.0.
- Block RFC1918 ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
- Block link-local and metadata IPs: 169.254.169.254 and 169.254.0.0/16.

## Rate Limiting

- Per-IP and per-email limits in KV.
- Additional WAF rules at Cloudflare.

## Secrets Management

- Store in Wrangler secrets.
- Rotate OpenAI key every 60-90 days.

## Data Privacy

- Store minimal PII (email optional).
- Use hashed email for analytics.
- Provide deletion endpoint for user data.

## Compliance

- Provide privacy policy and terms.
- Add data retention policy.
