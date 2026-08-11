# Capability Radar

Purpose: turn frontier product signals into bounded, evidence-backed improvements to MindReply.

## Operating rule

Discovery is not proof. Product Hunt, Firecrawl, launch directories, social posts and similar feeds create signals only.

Every signal follows:

`signal -> authoritative verification -> fit assessment -> isolated experiment -> deterministic validation -> evidence -> review -> promotion`

## Current frontier signals

| Signal | Useful primitive | MindReply experiment | Decision rule |
|---|---|---|---|
| HAR | isolated agent workspaces, deterministic proof | agent task isolation + proof-bound validation | absorb if measurable reliability improves |
| ngrok AI Gateway | model/provider gateway pattern | provider abstraction and health/fallback contract | absorb if it reduces provider coupling/failure |
| oqoqo | task-specific evaluations/benchmarks | capability regression suite for agent tasks | absorb if it catches failures missed by normal tests |
| Coldtea | agentic development/test workflow | bounded build/test worker pattern | absorb if E2E throughput improves without weakening gates |
| Kubit | behavior-driven agent optimization | evidence-based agent telemetry experiment | absorb only with privacy and measurable-value proof |
| AI Group Call | multi-agent voice interaction | voice-agent orchestration experiment | absorb only if latency/quality beats current path |

## Anti-hype rules

- Never add a dependency merely because a product launched.
- Never treat a marketplace ranking as technical evidence.
- Prefer native primitives when they are small and auditable.
- Keep experiments isolated from production.
- Bind validation to the exact commit/tree.
- Reject stale or unverifiable claims.
- Record rejected signals so they are not rediscovered as new work.

## Frontier workflow

1. Capture signal and source timestamp.
2. Deduplicate by canonical product/source identity.
3. Verify primary project documentation or repository.
4. Identify one concrete primitive worth testing.
5. Create an isolated frontier task.
6. Define baseline and success metric before implementation.
7. Run deterministic validation and E2E checks.
8. Store proof tied to commit/tree SHA.
9. Promote only after review and passing gates.
10. Feed the result back into the hourly radar.

## Owner boundary

The radar may research, prototype, test, document, open issues/PRs and prepare promotion. Production deployment, destructive changes, credential changes and external commercial commitments remain owner-gated.

Last updated: 2026-08-11 Europe/Sofia
