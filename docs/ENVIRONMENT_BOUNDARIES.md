# NOVA Environment Boundaries

## DEMO

Purpose: public Digital Hall and product validation.

Allowed:
- synthetic/demo games
- illustrative balances, points, jackpots and winners
- UX, accessibility and performance testing
- original product copy and artwork

Forbidden:
- real-money deposits or withdrawals
- cash-out
- real regulated wagering
- claims that NOVA is licensed or approved

## STAGING_SYNTHETIC

Purpose: controlled integration testing.

Allowed:
- synthetic identities
- provider sandbox credentials
- test payment credentials
- simulated KYC/AML responses
- synthetic ledger events
- security/load/accessibility testing

Forbidden:
- production customer funds
- production KYC documents
- uncontrolled public wagering
- production credentials in source control

## PRODUCTION_REGULATED

Only after the activation gate has verified the applicable evidence for the target market.

Required operational properties:
- server-side authorization and market gating
- immutable/auditable transaction and compliance event records
- secrets outside Git
- monitoring, alerting and rollback
- provider/session controls
- customer-funds segregation architecture where applicable
- jurisdiction-specific responsible-gambling configuration
- approved legal and regulatory content

The application must fail closed when a required production evidence item is missing.
