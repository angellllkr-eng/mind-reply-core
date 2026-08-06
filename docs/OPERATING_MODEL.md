# MindReply Operating Model

**Status:** proposed; human review required  
**Product root:** `angellllkr-eng/mind-reply-core`  
**Operations root:** `angellllkr-eng/agent-control-plane`

## Why this document exists

The structural consolidation created a useful product monorepo, but GitHub evidence shows the private control plane is still active and holds the fleet, orchestration, security and owner-control backlog. Therefore “single repository complete” is not an accurate description of the entire operating estate.

## Source-of-truth split

### This repository owns
- product applications and public sites;
- reusable packages;
- product services and bridges;
- product-facing infrastructure definitions;
- product tests and deployment configuration;
- product documentation.

### `agent-control-plane` owns
- fleet definitions and task contracts;
- orchestration and scheduling policy;
- model/provider routing policy;
- ownership and approval policy;
- security and secret-handling policy;
- evidence, audit and Reality Delta reporting;
- owner-only command surfaces.

## Change path

The control plane may propose bounded pull requests into this repository. Every proposal must include scope, tests, evidence, risks and rollback. Human review is required before merge. Production deployment, billing, DNS, credentials and external communication remain owner-approved actions.

## State vocabulary

Use these terms precisely:
- **planned:** documented intent only;
- **built:** code or configuration exists at a commit;
- **tested:** repeatable checks passed for that commit;
- **deployed:** an identified environment reports the commit/version;
- **live:** the intended user path works and has fresh operational evidence.

Do not promote a claim without the evidence required by the next state.

## Revenue-first priority

The live GitHub + Python Profit Audit is the immediate revenue path. Product work should first support:
1. one unambiguous buyer-facing CTA;
2. secure post-purchase intake without collecting secrets;
3. a reproducible, read-only audit workflow;
4. a seven-day evidence-backed delivery pack;
5. clear remediation and rollback guidance.

Work unrelated to selling or delivering that offer is secondary until the owner changes priority.

## Deployment safety

- No secret values are committed.
- No automatic merge from fleet automation.
- No automatic production deployment from control-plane tasks.
- Existing surfaces remain available until parity and health checks pass.
- Repository and Vercel cleanup occurs only after traffic, dependency and rollback review.

## Acceptance criteria for operational consolidation

Operational consolidation is complete only when:
- both roots link to each other and agree on authority boundaries;
- cross-repository pull requests work with least privilege;
- required product checks run consistently;
- production surfaces are explicitly named and verified;
- stale/duplicate repositories have evidence-backed dispositions;
- Reality Delta reporting catches documentation/runtime contradictions;
- the owner retains final approval for high-risk actions.
