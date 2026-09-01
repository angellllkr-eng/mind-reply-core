# MindReply Estate Consolidation

Status: proposed canonical structure on `chore/consolidate-estate`.

## Rule

One canonical repository for overlapping MindReply/A11-K/operations/product-shell work: `angellllkr-eng/mind-reply-core`.

Do not create another repository when the work is a page, route, shared service, control-plane module, brand surface, experiment, duplicate deployment, or small product shell that can live as an application/package here.

Keep a separate repository only when it has an independently meaningful codebase, release lifecycle, upstream/open-source identity, large asset footprint, or isolation requirement.

## Consolidate into this repository

- `mindreply`
- `Mind-Reply/mindreply`
- `Mind-Reply/mind-reply.com`
- `Mind-Reply/Mind-Reply`
- `Mind-Reply/Mind-Reply-1`
- `Mind-Reply/mindreply-org-site`
- `mindreply-org-site`
- `a11k-surface`
- `a11-homepage`
- `a11-evidence-surface`
- `a11k-operator-desk`
- `a11k-orchestration`
- `a11-k-multiverse`
- `a11-k-multiverse-5d`
- `copy-of-a11-k-command-center`
- `a11-enterprise`
- `a11-rag-platform`
- `a11-live-cloud-execution`
- `mindreply-control`
- `mr`
- `mind-repl`
- `mindreply-production-pack`
- `mr-touch`
- `mindreply-studio`
- `own`, `Own1`
- `chatbot`, `chatbot1`, `Mind-Reply/chatbot`, `Mind-Reply/chatneo`
- small commercial shells: `revenuepulse`, `leadrevive`, `leadatlas`, `dealforge`, `intentrank`, `marginpilot`, `empirepulse`, `cloudtrim`, `uptimepilot`, `auditforge-brand`

These become apps, packages, services, docs, or historical migration records rather than separate canonical repositories.

## Preserve as separate repositories

These deserve independent space because they represent substantial or independently useful systems:

- `resellerpro-platform` — registrar/commerce platform
- `reseller-pro-enterprise` — enterprise registrar implementation; merge useful code into the canonical ResellerPro repository after review, not into MindReply core
- `patchtalk` — dedicated communications product
- `unapolagetic-cosmetics` — dedicated commerce product
- `openmontage` — large media/codebase
- `openmontage-source-mirror` — source mirror only; retain as mirror, not product
- `globalSpeed` — independent open-source browser/network project
- `chrome-devtools-mcp` — independent tooling/MCP project
- `next-devtools-mcp` — independent tooling project
- `Understand-Anything` — substantial independent application
- `FixCode` — substantial developer product/tool
- `cli` — substantial CLI codebase
- `compose-for-agents` — substantial agent/composition codebase
- `amazon-q-vscode` — upstream/large external codebase
- `python-docs-samples` — external/reference corpus
- `alphaevolve-on-googlecloud` — independent research/platform codebase
- `megaagent-pc-builder` — separate product if promoted beyond experiment
- `enterprise-engine-radar` — retain if independently deployed; otherwise migrate into opportunity module
- `opportunity-radar` / `private-opportunity-core` — consolidate into one opportunity package, with private core remaining private

## Internal structure

```text
apps/
  web-replycontrol/
  a11k/
  studio/
  owner/
  opportunities/
  experiments/

services/
  rwa-bridge/
  replyrail/
  opportunity-engine/
  deployment-gateway/

packages/
  a11k-core/
  domain-registry/
  evidence/
  billing/
  shared-ui/
  policy/
  telemetry/

infrastructure/
  nexus/
  vercel/
  github/
  workflows/

content/
  brands/
  domains/
  seo/
  product-pages/

archive/
  migrations/
  historical-repos/
  deprecated-sites/
```

## Public routing principle

Prefer one canonical domain with paths before subdomains. Use subdomains only when an application genuinely needs an independent origin/security boundary.

Example:

- `mind-reply.com/` — public company/product surface
- `mind-reply.com/replycontrol` — ReplyControl
- `mind-reply.com/a11k` — A11-K public surface
- `mind-reply.com/studio` — Studio
- `mind-reply.com/opportunities` — opportunity product
- `mind-reply.com/owner` — private owner entry point

Existing custom domains remain authoritative where already committed to a distinct product, such as AUREL or a separately commercialized product.

## Vercel rule

One Vercel project per deployable application, not per experiment/repository. Duplicate Vercel projects must converge on one canonical project and aliases must be removed only after the canonical deployment passes smoke tests.

## Migration safety

No source repository is deleted, overwritten, or force-pushed by this plan. Migration is additive first: inventory -> copy/port -> test -> deploy -> verify -> redirect/alias -> archive.

Secrets, customer data, payment credentials, and private operational records are never copied into migration artifacts.

## Acceptance gate

A migration is complete only when:

1. canonical source is identified;
2. duplicate source is mapped;
3. code/content/assets are migrated or explicitly rejected with reason;
4. tests/build pass;
5. production URL is verified;
6. rollback source is retained;
7. domain/Vercel mapping is recorded;
8. duplicate repository/project is archived or marked migration-only.
