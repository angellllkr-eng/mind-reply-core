# Project Obsidian Grid consolidation plan

Date: 2026-08-05
Owner: A.K. <mind.repl@gmail.com>
Canonical repository: `angellllkr-eng/mind-reply-core`
Canonical production branch: `production`

## Decisions
- Exactly one production authority: `mind-reply-core`.
- Public product repository: `mind-reply-core` only.
- Private support/migration repositories: `nexus-core`, `a11k-surface`, `forge`, `brushworks`, `own`, `pointer-ai-landing-page`, `EPHEMERAL`.
- Archive candidates: `agent-control-plane`, `chatbot`, `chatbot1`, `linear-card-interaction`, `source1`, `source2`.
- `angellllkr-eng` remains documentation/index only.

## Per-repo actions
- `mind-reply-core`: merge repair and deployment PRs; protect `production`; become sole deploy source.
- `a11k-surface`: preserve tag/backup; migrate only verified A11-K material; archive after smoke deploy.
- `nexus-core`: keep private and restricted; no public domain or customer traffic.
- `forge`, `brushworks`, `own`, `pointer-ai-landing-page`, `EPHEMERAL`: preserve backups; selectively migrate approved assets; disconnect deploys.
- Archived repos: add `ARCHIVE.md`, tag latest commit, revoke deploy credentials, retain 365 days.

## Timeline
- Aug 5-6: inventory, scoring, branch and PR setup.
- Aug 6-11: merge verified migration material and repair app tree.
- Within 24 hours of merge: configure one Vercel project and cut DNS.
- Seven days after cutover: freeze and validate rollback, analytics, auth, and payments.
- After 365 days: delete archives only with owner approval.

## Migration PR template
### Summary
What was migrated and why it belongs in the canonical repo.

### Safety
- Source commit/tag preserved.
- No secrets copied into Git.
- Rollback path documented.

### Validation
- Tests pass.
- Build passes.
- Smoke deploy passes.
- Route ownership is explicit.

### Rollout
- Reviewer: A.K.
- Ops lead: assigned engineer.
- Product continuity check completed.
