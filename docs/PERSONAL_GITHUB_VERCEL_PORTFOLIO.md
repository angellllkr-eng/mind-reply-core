# Personal GitHub → Vercel Portfolio Architecture

Date: 2026-08-26
Owner: angellllkr-eng
Vercel team: mindreply / angelk

## Source of truth

GitHub is the canonical source repository and history. Vercel is the production deployment layer. A repository may feed more than one Vercel project only when the applications have intentionally independent domains, security boundaries, deployment lifecycles, or root directories.

Do not create a Vercel project merely because a new page or feature exists.

## Canonical production platforms

| Platform | Canonical source | Vercel strategy | Status |
|---|---|---|---|
| MindReply | angellllkr-eng/mind-reply-core | 1 canonical production project; shared monorepo surfaces | KEEP |
| ResellerPro | angellllkr-eng/resellerpro-platform | 1 canonical production project | KEEP / CONSOLIDATE |
| A11-K | angellllkr-eng/mind-reply-core + a11k-surface where useful | core + deliberate public surface only | KEEP / CONSOLIDATE |
| PatchTalk | angellllkr-eng/patchtalk | 1 canonical product project | KEEP |
| Aurel | angellllkr-eng/agent-control-plane | independent product/domain boundary | KEEP / VERIFY |
| Revenue/Sales | revenuepulse, leadrevive, empirepulse, marginpilot, leadatlas, dealforge | consolidate into a platform before multiplying deployments | CONSOLIDATE |
| Automation/Tools | docparse, auditforge-brand, cloudtrim, intentrank, uptimepilot | consolidate/validate before independent production projects | CONSOLIDATE |

## Personal GitHub repository disposition

### Core / production

- mind-reply-core — CANONICAL CORE
- resellerpro-platform — CANONICAL PRODUCT
- patchtalk — CANONICAL PRODUCT
- agent-control-plane — CANONICAL AUREL CANDIDATE
- a11k-surface — A11-K PUBLIC SURFACE CANDIDATE
- mindreply — KEEP / compare against core before further development

### Internal control systems

- mindreply-control — KEEP INTERNAL; migrate useful capability into canonical control plane when stable
- private-opportunity-core — KEEP PRIVATE; repair build before production
- a11k-operator-desk — KEEP PRIVATE; use as operator surface
- registrar-control-plane — KEEP INTERNAL; no public deployment unless justified

### A11-K / platform experiments

- a11-k-multiverse — ABSORB useful work into A11-K; no standalone deployment by default
- a11-k-multiverse-5d — ABSORB useful work into A11-K; preserve as source until migration verified
- copy-of-a11-k-command-center — ABSORB/ARCHIVE after feature comparison
- a11-enterprise — EMPTY/EXPERIMENT; no deployment
- nexus-core — ABSORB if capability is required; otherwise archive later
- forge — ABSORB if capability is required; otherwise archive later

### Revenue candidates

- revenuepulse
- leadrevive
- empirepulse
- uptimepilot
- marginpilot
- leadatlas
- dealforge

These remain source assets. They should become routes/modules inside a coherent revenue platform unless usage, customers, or domain strategy proves that one deserves an independent product.

### Tool candidates

- docparse
- auditforge-brand
- cloudtrim
- intentrank

Treat as validated-feature candidates first; avoid thin standalone sites.

### Preserve / evaluate

- brushworks — PAUSE. Verify naming/IP and intended business relationship before commercialization.
- openmontage — KEEP SEPARATE; substantial codebase and unrelated product boundary.
- openmontage-source-mirror — MIRROR ONLY; do not deploy.
- unapolagetic-cosmetics — SEPARATE EXPERIMENT; do not merge into MindReply without explicit product decision.
- SMS — SEPARATE TECH/EXPERIMENT unless incorporated into a canonical messaging platform.
- own / Own1 — inspect before any Vercel promotion; do not treat as PatchTalk automatically.

### Archived / low-priority source

- chatbot — ARCHIVED
- chatbot1 — ARCHIVED
- linear-card-interaction — ARCHIVED
- source1 — EMPTY
- source2 — EMPTY
- Own1 — EMPTY
- a11-enterprise — EMPTY
- megaagent-pc-builder — EMPTY
- mind-repl — EMPTY

Do not delete repositories solely from this document. Archive/retire only after confirming no unique source, domain, deployment, credential, or customer dependency.

## Vercel project policy

### KEEP

- mindreply
- canonical resellerpro-platform
- canonical patchtalk
- canonical A11-K project/surface
- Aurel production project when domain ownership is verified
- selected internal control-plane projects

### CONSOLIDATE

- resellerpro-platform-* duplicates → resellerpro-platform
- mindreply-org-site* → one canonical surface or absorb into MindReply
- public-site* → one canonical surface or absorb into MindReply
- duplicate Brushworks surfaces → pause pending IP decision
- duplicate A11-K surfaces → core/public/operator separation only where justified

### ARCHIVE CANDIDATES

Old experiments, empty deployments, source mirrors, failed templates, and projects with no domain or recent deployment after dependency/domain verification.

## Safety gates before retiring any Vercel project

1. Enumerate custom domains.
2. Check latest production deployment.
3. Check GitHub source and branch.
4. Check environment-variable dependency at a metadata level; never copy secrets into documentation.
5. Verify redirects/canonical domains.
6. Verify no external webhook/API points at the project.
7. Confirm replacement deployment is READY.
8. Keep rollback path until replacement has been validated.

## Target state

```text
PERSONAL GITHUB
└── angellllkr-eng
    ├── mind-reply-core
    │   ├── MindReply
    │   ├── A11-K
    │   └── shared packages
    ├── resellerpro-platform
    ├── patchtalk
    ├── agent-control-plane
    ├── internal control repositories
    └── validated product source
             |
             v
          VERCEL
    ├── MindReply
    ├── ResellerPro
    ├── A11-K
    ├── PatchTalk
    ├── Aurel
    └── selected validated platforms
```

## Operating principle

Build fewer, substantially better platforms. A page must earn its existence through user value, product functionality, evidence, useful information, or conversion purpose. Optimize for qualified usage and business outcomes rather than project count or URL count.
