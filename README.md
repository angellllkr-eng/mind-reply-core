# MindReply Proofline — migration source

**Status:** SOURCE-FREEZE / MIGRATION SOURCE  
**Canonical MindReply product repository:** `Mind-Reply/mindreply-app`

This repository contains historical/core MindReply implementation material that is being reconciled into the single canonical organization product root.

## Authority rule

Do not treat this repository as a second MindReply production root.

- New MindReply product work belongs in `Mind-Reply/mindreply-app`.
- Reusable implementation material must be reviewed, migrated and verified before being considered authoritative.
- Preserve this repository for provenance until the final GitHub administration step is available.
- Do not claim production runtime health from repository contents alone.

## Current product boundary

`Mind-Reply/mindreply-app` is the canonical MindReply product root.

Separate intentional boundaries remain:

- `Mind-Reply/resellerpro` — ResellerPro product repository.
- `Mind-Reply/whatsapp-ai-router` — PatchTalk / WhatsApp edge runtime.
- `Mind-Reply/A11-K` — A11-K product and owner-operations surface.
- `angellllkr-eng/a11-nowline` — Nova Hall source repository; public product identity is Nova Hall.

## Migration rule

Before retiring this source, reconcile unique code, documentation, configuration and evidence into the appropriate canonical destination. The migration is not complete merely because repositories share a README or product vocabulary.

No credentials belong in Git history.

## Runtime truth

**SOURCE ONLY / NOT A PRODUCTION AUTHORITY / RUNTIME UNVERIFIED**

Repository state is not proof of a live deployment.
