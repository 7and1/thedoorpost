#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_env() {
  if [[ -z "${!1:-}" ]]; then
    echo "Missing required env var: $1" >&2
    exit 1
  fi
}

require_cmd wrangler
require_cmd npm

require_env OPENROUTER_API_KEYS
require_env TURNSTILE_SECRET
require_env NEXT_PUBLIC_TURNSTILE_SITE_KEY

export NEXT_PUBLIC_TURNSTILE_SITE_KEY

cd "$ROOT_DIR/apps/worker"
printf '%s' "$OPENROUTER_API_KEYS" | wrangler secret put OPENROUTER_API_KEYS
printf '%s' "$TURNSTILE_SECRET" | wrangler secret put TURNSTILE_SECRET
npm run deploy

cd "$ROOT_DIR/apps/web"
npm run deploy

echo "Deploy complete."
