# Repository Compliance Baseline

Status labels are evidence-based: UNKNOWN, BLOCKED, DEGRADED, VERIFIED, PRODUCTION.

The repository follows these top-level controls:

1. Canonicality — one declared source of truth; deployment targets are documented.
2. Branch governance — protected production branches; controlled changes only.
3. Identity & access — least privilege; owner approval for protected actions.
4. Secret security — no credentials in source; provider-side rotation after exposure.
5. Workflow security — explicit minimal GitHub Actions permissions; no implicit write authority.
6. Dependency security — dependency review and lockfile discipline.
7. Code security — security-sensitive changes receive review and automated checks.
8. Supply-chain provenance — workflow and dependency changes are reviewable and traceable.
9. CI/CD integrity — failed compliance checks block a verified release state.
10. Runtime truth — live/production claims require current evidence.
11. Repository hygiene — generated artifacts, local env files, logs and build output stay out of source control.
12. Ownership & review — repository owners are explicit; protected changes require review.
13. Lifecycle — archived/experimental code is not treated as production.
14. Evidence ledger — material changes and verification evidence remain traceable.
15. Product boundaries — repositories and brands remain separate unless explicitly combined.
16. Automation safety — external messaging, billing, deployment and destructive actions require explicit authority.

No current-tree scan proves historical secret safety. Historical exposure remains UNKNOWN until history and provider-side controls are independently verified.
