# NOVA-ONLY Research & Visual Integration

Updated: 2026-09-22

## Scope lock

This research applies ONLY to the NOVA Gaming / Digital Hall project in this repository.

Do not import architecture, branding, workflows, deployment assumptions, repositories, assets, terminology or requirements from other user projects.

The three external Drive references remain uninspected until their actual files are available. Their links are intake references only.

## Research pass

Research was performed against:
- current UK Gambling Commission remote-sector guidance and LCCP/RTS material;
- current public casino-lobby information architecture;
- Firecrawl web research of current operator interfaces;
- Infographic Artist design-system research for transferable system mechanisms.

The research is used for patterns and requirements, not to copy third-party branding, artwork or proprietary copy.

## Product patterns confirmed

Current casino interfaces commonly expose:
- Home / casino discovery;
- Top/popular/new game groupings;
- Slots and table-game categories;
- dedicated live-casino navigation;
- search and category filtering;
- promotions/rewards surfaces;
- game/provider grouping;
- account access;
- help, terms, privacy and responsible-gambling surfaces.

NOVA already implements a significant portion of the discovery structure in its demo Digital Hall.

### What NOVA should add or verify

1. Search should support useful zero-result and recovery states.
2. Category/filter state should persist during browsing where appropriate.
3. Game cards need consistent metadata hierarchy: title, category/provider when applicable, demo status and primary action.
4. Promotions need data-driven eligibility, start/end, terms and status fields rather than hard-coded marketing claims.
5. Rewards must remain synthetic until a real ledger exists.
6. Live-casino UI must remain clearly demo/provider-unconnected until a verified provider integration exists.
7. Account/wallet surfaces must never imply spendable funds while in DEMO.
8. Safer-gambling/help/legal access should remain visible and easy to reach.
9. Mobile navigation and discovery must be tested at narrow widths, not inferred from responsive CSS alone.
10. Accessibility needs repeatable keyboard, focus, screen-reader and contrast verification.
11. Performance needs recorded measurements rather than descriptive claims.

## Regulatory architecture implications

UKGC remote guidance states that remote gambling facilities supplied to Great Britain require the applicable operating licence, and remote licensees must comply with technical standards and LCCP requirements. The current LCCP includes technical standards, customer funds, payment, AML, identity verification and related operating conditions. Therefore NOVA's production architecture must keep regulated capabilities behind evidence-backed activation gates.

Third-party interfaces are not outside the operator's responsibility: LCCP condition 1.1.3 addresses user interfaces supplied by third parties. A provider SDK or embedded game does not itself prove compliance.

Where a remote operator holds customer funds, LCCP condition 4.1.1 requires segregation into separate client bank account(s), subject to the licence/activity scope. NOVA must therefore treat a production wallet as a controlled server-side ledger/funds system, not a UI balance.

RTS is principle-based and allows equivalent technical approaches where the requirements are met and the alternative is reasonable and similarly effective. NOVA should therefore document controls and evidence, rather than hard-code a claim that one technology stack equals compliance.

## Visual-system research

Infographic Artist research reinforces a system-first approach:
- derive reusable mechanisms rather than copying surfaces;
- define stable invariants before multiplying variants;
- test identity across silhouette, typography, colour, composition and behaviour;
- build a coherent modular system instead of a collection of disconnected screens.

For NOVA this means:
- one original visual grammar;
- consistent card geometry;
- consistent category hierarchy;
- controlled motion;
- reusable game, promotion and reward modules;
- a distinct NOVA visual identity;
- no competitor asset or copy reuse.

## Completion target

NOVA is complete for the current product stage when the free-play Digital Hall is:
- buildable and type-safe;
- responsive and accessible;
- visually coherent as one original system;
- explicit about DEMO status;
- populated only with synthetic/demo data;
- backed by repeatable QA;
- deployment-ready for the approved external path once that environment is actually configured and verified.

Regulated production remains a separate evidence gate.

## Sources

UK Gambling Commission:
- Remote sector guidance
- Remote casino operating licence
- Online LCCP
- RTS introduction
- LCCP 1.1.3 third-party responsibility
- LCCP 4.1.1 customer-funds segregation

Research tools:
- Firecrawl current-web research
- Infographic Artist design-system / brand-mechanism research

No claim is made that any external research source represents NOVA's licence status, supplier contracts, deployment status or production approval.
