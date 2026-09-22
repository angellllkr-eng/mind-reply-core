# NOVA Gaming — Digital Hall

NOVA is a **commercial-grade Digital Hall target** with a current free-play/demo frontend foundation built with Next.js, React and TypeScript.

The product direction is benchmarked against established UK and Bulgarian operator experiences such as Sky Vegas, Betfred, Winbet, AlphaWin and Palms Bet for common UX patterns: discovery, navigation, game categories, promotions, rewards, search/filtering, account surfaces, mobile usability and safer-gaming access.

The benchmark is for product patterns and information architecture only. NOVA uses its own branding, visual language, assets and copy.

## Current truth

- Digital Hall UI: **VERIFIED IN SOURCE**
- Demo/mock game data: **PRESENT**
- Commercial-grade UX target: **DEFINED**
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

## Product benchmark

See `PRODUCT_UX_BENCHMARK.md` for the commercial Digital Hall benchmark and implementation boundary.

## Compliance

See:
- `COMPLIANCE_EVIDENCE_MATRIX.md`
- `DEPLOYMENT_POLICY.md`
- `PRODUCT_UX_BENCHMARK.md`
- `PROJECT_STATE.md`
- `GO_LIVE_READINESS.md`

Compliance and licensing documents are preparation material only and require qualified counsel/regulatory confirmation before filing or publication.

## Development

`pnpm install`
`pnpm dev`

Build:
`pnpm build`

## Product boundary

The Digital Hall can continue as a free-play/demo experience while the separate legal, licensing, payments, KYC/AML, responsible-gambling, security and regulated-infrastructure tracks are prepared.

Real-money activation requires verified evidence for the applicable operating entity, licences/authorisations, suppliers, payment provider, technical controls, legal documentation, security assurance and market access controls.