# NOVA — Deep Research Gap Closure

Updated: 2026-09-22
Status: ACTIVE ENGINEERING BASELINE

## Purpose

This document converts the current repository, regulatory research and product benchmarking into concrete implementation gates. The three external Drive references supplied by the owner remain reference-only until their actual files are attached/imported; no claim is made that their contents were reviewed.

## Verified research findings

### UK remote gambling

The UK Gambling Commission states that a remote casino operating licence covers online casino games including slots, roulette and blackjack, and that a licence is required when providing remote gambling facilities to consumers in Great Britain. The Commission's remote sector guidance also points licence holders to technical standards, testing, security audit and information requirements.

The current repository therefore must not represent its demo UI as licensed or production gambling.

### Technical assurance

UKGC RTS requirements are principle-based and require licensees to meet the requirements, with implementation guidance rather than a single prescribed technology. Relevant technical work therefore needs evidence of implementation, testing and assurance rather than a checkbox in a planning document.

The repository must retain a separate evidence trail for game/RNG testing, security assurance, customer-funds controls, identity verification, responsible-gambling controls and regulatory reporting.

### Third-party interfaces

UKGC LCCP condition 1.1.3 makes operators responsible for third-party user interfaces that provide access to remote gambling facilities. Provider contracts and technical controls therefore belong in the production evidence set; an SDK or iframe alone is not compliance evidence.

### Customer funds

UKGC LCCP condition 4.1.1 requires customer funds held by covered remote operators to be kept in separate client bank account(s). A production wallet must therefore be a controlled ledger/funds architecture, not a front-end balance field.

## Product benchmark synthesis

Current benchmark research shows mature operator experiences commonly expose:
- strong featured/discovery area
- persistent category navigation
- search and filtering
- separate live-casino discovery
- promotions with eligibility/expiry mechanics
- rewards/loyalty surfaces
- account and player-protection surfaces
- clear safer-gambling/help/legal access
- mobile-first navigation

NOVA already has much of this UI foundation. The remaining gap is not another visual mock; it is truthful production architecture, testability, localization and operational evidence.

## Missing engineering parts to close

1. Build/typecheck CI on every PR and main push.
2. Remove legacy Vercel runtime dependency from the canonical app.
3. Replace stale Vercel/Heroku/AWS assumptions in operational documents with the approved deployment path: GitHub → ResellerPro → Cloudflare → verified environment.
4. Establish explicit environment boundary: DEMO, STAGING-SYNTHETIC, PRODUCTION-REGULATED.
5. Add a machine-readable production activation gate requiring evidence IDs for licence, entity, provider contracts, payments, KYC/AML, responsible gambling, player-funds ledger, security, technical testing, legal docs and market access.
6. Keep real-money APIs/providers absent until contracts and licensing evidence exist.
7. Add a proper test contract for player controls and game-launch boundaries.
8. Add a domain/DNS evidence checklist that does not assume a registrar's capabilities.
9. Replace hard-coded regulatory claims such as exact session limits, deposit caps and helpline details with counsel/regulator-confirmed configuration.
10. Separate product benchmark observations from claims about competitors.
11. Treat all current game counts, winners, jackpots, rewards and balances as demo data unless backed by a live data source.
12. Add accessibility, mobile and performance evidence rather than describing them as complete because CSS exists.

## Completion definition

NOVA is engineering-complete for the current free-play Digital Hall when:
- CI passes install/typecheck/build;
- Vercel-specific runtime code is removed;
- demo boundary is explicit in UI and routes;
- staging can be run with synthetic data;
- production activation is fail-closed by evidence;
- compliance documents distinguish planned, implemented, tested, contracted and licensed;
- domains/deployment are verified with external evidence.

Real-money launch is a separate regulatory/commercial completion gate and cannot be marked complete from source code alone.
