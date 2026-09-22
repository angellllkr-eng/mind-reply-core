# NOVA Gaming — Current Project State

Updated: 2026-09-22
Status: DEMO DIGITAL HALL / STAGING PREPARATION

## Truth

NOVA is currently a free-play/demo Digital Hall. The repository contains a substantial Next.js/React frontend with game discovery, live-floor UI, promotions, rewards, account surfaces and demo data.

The following are NOT verified as production capabilities:
- operating entity / licence
- real-money wallet or customer-funds ledger
- KYC / AML
- payment processing
- game-provider production contracts or integrations
- live dealer provider/feed
- responsible-gambling enforcement
- regulatory reporting
- production domains
- ResellerPro deployment
- Cloudflare production
- security audit / penetration test
- regulatory technical testing

## Canonical deployment

GitHub → ResellerPro → Cloudflare → verified environment.

Vercel is legacy and is not the target deployment platform.

## Engineering baseline

- Next.js 16 / React 19 / TypeScript
- shadcn/ui + Tailwind CSS
- demo/mock catalogue and live-table data
- explicit demo/no-real-money boundary
- production activation gate in docs/PRODUCTION_ACTIVATION_GATE.json
- environment boundaries in docs/ENVIRONMENT_BOUNDARIES.md
- deep research and gap closure in docs/RESEARCH_GAP_CLOSURE.md
- UX benchmark matrix in docs/UX_RESEARCH_MATRIX.md
- reference intake in docs/REFERENCE_INTAKE.md
- player controls QA contract in docs/CONTROLS.md
- CI verification in .github/workflows/ci.yml

## Important correction

Historical planning documents contain statements such as “dual-licensed”, “applications filed”, “Vercel production”, “domains live”, and “KYC/AML live”. Those statements are not current evidence. See docs/LEGACY_PLAN_RECONCILIATION.md.

## Completion target

Current engineering completion means a verified, buildable, accessible, mobile-ready demo Digital Hall with a fail-closed production boundary.

Real-money launch is a separate evidence gate requiring applicable legal, regulatory, commercial, technical and security proof.
