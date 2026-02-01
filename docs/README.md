# TheDoorpost.com Docs

This folder contains the production-ready blueprint and implementation plan for TheDoorpost.

## Goals

- Ship a reliable full-stack system for "Above the Fold" analysis with screenshot + AI insights.
- Use OpenNext on Cloudflare Workers for the frontend.
- Use Cloudflare Browser Rendering (serverless) for screenshots and analysis.
- Use OpenRouter for AI scoring with fallback models.
- Use Cloudflare D1 for reports, R2 for screenshots, KV + Edge Cache for caching.

## Doc Map

- blueprint.md: product goals, scope, system overview
- architecture.md: infrastructure layout, dataflow, network boundaries
- implementation.md: step-by-step implementation plan
- modules.md: module-level design and responsibilities
- data-model.md: D1 schema, KV keys, R2 paths, retention
- backend.md: API specs, worker gateway, serverless browser flow
- frontend.md: Next.js app structure, pages, SSR/Edge notes
- components.md: component specs and UI states
- seo-content.md: SEO plan, content structure, schema, publishing
- routing-deployment.md: routes, domains, CI/CD, envs
- testing.md: test strategy and QA checklist
- security.md: security, privacy, compliance
- observability-runbook.md: logs, metrics, alerts, ops runbook
- roadmap.md: delivery plan and milestones
- dev-setup.md: local development workflow

## Non-Goals (Phase 1)

- Full billing system (Stripe) beyond basic trial gating
- Multi-tenant teams and RBAC
- In-depth A/B testing platform

If you need adjustments, edit the specific document and keep all changes inside /docs.
