# NOVA Gaming — Deployment Policy

**Status:** ACTIVE ENGINEERING POLICY
**Updated:** 2026-09-22

## Canonical deployment direction

**GitHub → ResellerPro → Cloudflare → verified environment**

Vercel is legacy infrastructure for this project and is not the target deployment platform.

## Environment model

### Demo / Digital Hall

Allowed:
- static/mock games
- demo credits
- demo rewards
- demo promotions
- UX, accessibility and performance testing

Not allowed:
- real-money deposits
- real-money withdrawals
- cash-out
- production gambling wallet
- claims that demo results have monetary value
- claims that the product is licensed when it is not

### Regulated staging

Use synthetic/test identities and funds, jurisdiction gating, audit logging, secrets management, provider sandbox credentials and controlled access.

### Regulated production

Requires evidence for:
1. operating entity and ownership structure
2. applicable licences/authorisations
3. approved/contracted gambling suppliers
4. payment-provider approval
5. KYC/AML controls
6. responsible-gambling controls
7. player-funds/ledger controls
8. technical testing and security assurance
9. counsel-approved legal documentation
10. market-specific access controls
11. monitoring, incident response and rollback
12. final owner/compliance sign-off

## Repository hygiene

Before production:
- remove or disable obsolete Vercel deployment workflows
- remove Vercel-only operational instructions
- review and remove Vercel analytics if not intentionally retained
- keep secrets out of Git
- keep demo data synthetic
- version compliance evidence
- record deployment commit SHA and environment configuration

## Truth rule

Documentation must distinguish implemented, tested, contracted, licensed/authorised and planned.

Words such as "licensed", "approved", "compliant", "audited", "live" and "production" require corresponding evidence.

## Current status

Digital Hall UI: VERIFIED IN SOURCE
Real-money backend: NOT IMPLEMENTED
Licensing: UNVERIFIED
ResellerPro deployment: NOT VERIFIED
Cloudflare production: NOT VERIFIED
Real-money activation: NOT READY
