# Reconstruction Contract

Status: ACTIVE
Scope: GitHub source, branches, files, runtime, and Vercel deployment mapping.

## Canonical role
This repository is the product runtime root. It must remain independently deployable and must not absorb estate governance logic.

## Required boundaries
- `main` is production source of truth only after release gates pass.
- `reconstruct/*` contains bounded estate repair work.
- Secrets, local state, generated build output, and credentials are never committed.
- Public/customer runtime and owner/control-plane functions remain explicitly separated.

## Required gates
1. Dependency/install integrity.
2. Typecheck/lint/tests/build.
3. Route and API health verification.
4. Auth and authorization boundary verification.
5. Vercel project/root/build mapping verification.
6. Preview smoke test.
7. Production evidence: commit, deployment, domain, health, rollback target.

## Vercel rule
One canonical production Vercel project for this product. Existing duplicate projects are evidence to reconcile, not alternative production authorities.

## Promotion
No production promotion is implied by a Git commit. Promotion requires verified deployment evidence and owner approval where the change is irreversible or externally consequential.
