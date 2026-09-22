# NOVA Short-Timeframe Closeout

Status: DEMO/STAGING CLOSURE PATH

## What is already established in source

- NOVA is isolated in `angellllkr-eng/novagaming`.
- Demo/free-play boundary is explicit.
- Production activation is fail-closed.
- Player-value/trust UX research is recorded.
- Motion system already exists in the UI and includes reduced-motion handling.
- Security headers and a strict first-party CSP baseline exist; CSP remains report-only until actual production integrations are known and tested.
- Live-floor UI is synthetic and does not claim a real feed.
- English is the current document/UI baseline; Bulgarian localization is a near-term product task.
- Provider selection remains evidence-driven and provider-neutral.
- Vercel is not the deployment target.

## What remains for a polished demo/staging handoff

1. Finish English/Bulgarian locale extraction and visible language switching.
2. Add the researched provider catalogue as data, without pretending any provider is contracted.
3. Tighten homepage trust/why-NOVA messaging and remove any UI wording that could imply licensed or bank-grade production status before evidence exists.
4. Add motion QA for keyboard focus, touch, reduced-motion and mobile performance.
5. Run typecheck/build/security checks and record actual results.
6. Verify the intended ResellerPro/Cloudflare deployment path with real environment evidence.
7. Perform a mobile visual pass across the main routes.

These are engineering/product tasks and can be closed on a short implementation cycle once the deployment access is available.

## What is not a short engineering task

A regulated real-money launch still requires external evidence and approvals: operating entity, jurisdiction-specific licences, supplier contracts/approvals, payment-provider approval, KYC/AML, responsible-gambling controls, player-funds ledger, technical/game testing, legal documents, market-access controls, independent security assurance and operational rollback/incident controls.

For Great Britain, the Gambling Commission states that remote casino operators need the relevant remote casino operating licence, remote licence holders must comply with RTS, and required game/RNG testing must be completed before release. The Commission also requires an independent annual security audit for covered remote licence holders.

Therefore the short timeframe applies to NOVA's product/demo/staging completion, not to representing an unlicensed system as a live regulated gambling service.
