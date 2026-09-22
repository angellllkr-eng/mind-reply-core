# NOVA Gaming — Digital Hall

NOVA is currently a **free-play/demo Digital Hall** built with Next.js, React and TypeScript.

The repository contains the lobby experience, game catalogue UI, live-table UI, promotions, rewards, account flows, game detail pages and supporting design system.

## Current truth

- Digital Hall UI: **VERIFIED IN SOURCE**
- Demo/mock game data: **PRESENT**
- Real-money wallet: **NOT IMPLEMENTED**
- Production KYC/AML: **NOT IMPLEMENTED**
- Real-money payment processing: **NOT IMPLEMENTED**
- Production game-provider integrations: **NOT VERIFIED**
- Gambling licence status: **UNVERIFIED**
- ResellerPro deployment: **NOT VERIFIED**
- Cloudflare production: **NOT VERIFIED**
- Real-money activation: **NOT READY**

The current application explicitly treats balances, spins and prizes as illustrative/demo functionality. Do not represent the demo as a licensed real-money gambling service.

## Deployment direction

Canonical target:

**GitHub → ResellerPro → Cloudflare → verified environment**

Vercel references in older project documents are legacy and are not the current deployment target.

## Compliance

See:
- `COMPLIANCE_EVIDENCE_MATRIX.md`
- `DEPLOYMENT_POLICY.md`
- `PROJECT_STATE.md`
- `GO_LIVE_READINESS.md`

Compliance and licensing documents are preparation material only and require qualified counsel/regulatory confirmation before filing or publication.

## Development

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm build
```

## Product boundary

The Digital Hall can continue as a free-play/demo experience while the separate legal, licensing, payments, KYC/AML, responsible-gambling, security and regulated-infrastructure tracks are prepared.

Real-money activation requires verified evidence for the applicable operating entity, licences/authorisations, suppliers, payment provider, technical controls, legal documentation, security assurance and market access controls.
