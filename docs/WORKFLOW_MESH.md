# Workflow Mesh

This branch should support fast prototype execution without turning into a generic automation swamp.

## Pattern choices

- **n8n** for multi-step workflows that need visible branching and retries.
- **Zapier** for quick triggers and glue between simple services.
- **Supabase** for relational state, auth-adjacent data, and proof records.
- **Vector search** for semantic lookup when the product needs memory or similarity matching.
- **Small sub-agents** for bounded tasks like copy review, accessibility checks, and release notes.

## Naming rules

Use different names for different functions so the system is easier to operate:

- **Thumb Lane** for the mobile action path.
- **Flow Rail** for the automation path.
- **Pocket Proof** for proof that an action completed.
- **Safe Step** for rollback or exit.
- **Signal Shelf** for stored evidence and decisions.

## Guardrails

- Keep test mode separate from live billing.
- Keep service keys server-side only.
- Use idempotency for webhook handling.
- Prefer one obvious action per screen.
- Never claim a workflow is production-ready unless it has been exercised end to end.
