# Canonical app route contract

The web-replycontrol Next.js app owns `/` through `app/page.tsx` and owns the global shell through `app/layout.tsx`. No other route file may serve `/`. The health endpoint is `/health`. Any A11-K surface migration must land as a deliberate app directory with its own explicit route ownership, tests, and smoke deploy before the source repo is archived.

Required validation: `pnpm install --frozen-lockfile`, the workspace build, route smoke test for `/`, and health smoke test for `/health`.