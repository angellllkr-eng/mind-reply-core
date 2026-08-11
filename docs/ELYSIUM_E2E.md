# Elysium E2E Runbook

**Status: complete on main** — gate, ledger writer, edge headers, delivery pack, operator UI, smoke script.

## Path

```
Draft
  → POST /api/elysium/gate     Lumenforge evaluate
  → Veridex stampEnvelope      SHA-256 + fail-soft Supabase append
  → POST /api/elysium/pack     buildDeliveryPack → receipt.epack.json
  → Customer delivery artifact
```

| Piece | Location |
|-------|----------|
| Edge headers | `apps/web-replycontrol/middleware.ts` |
| Gate | `POST /api/elysium/gate` |
| Pack | `POST /api/elysium/pack` |
| Operator UI | `/operator` |
| SQL ledger | `packages/veridex/sql/veridex_envelopes.sql` |
| Smoke | `scripts/elysium-smoke.sh` |

## Enable on a host

1. Apply SQL in Supabase: `packages/veridex/sql/veridex_envelopes.sql`
2. Env (server-only):
   ```
   ELYSIUM_AUDIT_LOOP=1
   VERIDEX_SUPABASE_URL=https://xxxx.supabase.co
   VERIDEX_SUPABASE_SERVICE_ROLE_KEY=...
   ```
3. `GET /api/elysium/status` → `auditLoopEnabled: true`, `ledger: "supabase"`
4. `HOST=https://<host> bash scripts/elysium-smoke.sh`
5. Or open `/operator` and run gate + pack

Without Supabase env: stamps are local (`ledger: "local_only"`). Ledger failures never block the gate (fail-soft).

## curl

```bash
curl -s -X POST "$HOST/api/elysium/gate" \
  -H 'content-type: application/json' \
  -d '{"requestId":"audit_e2e_1","draft":"Findings are bounded and reversible."}'

curl -s -X POST "$HOST/api/elysium/pack" \
  -H 'content-type: application/json' \
  -d '{"requestId":"audit_e2e_1","draft":"Findings are bounded and reversible.","clientLabel":"Demo Co"}'
```

Attach `epackJson` as `receipt.epack.json` in the customer delivery folder.

## Safety

- Public CTA / Stripe unchanged
- Service role never in the browser
- Default loop off
- Operator is direct-URL only (not in public nav)
