# Elysium E2E Runbook

End-to-end path from draft → wall → receipt → delivery pack.

## Architecture (runtime)

```
Draft
  → POST /api/elysium/gate   (Lumenforge evaluate)
  → Veridex stampEnvelope    (SHA-256 + optional Supabase append)
  → POST /api/elysium/pack   (buildDeliveryPack → receipt.epack.json)
  → Customer delivery artifact
```

Edge: `middleware.ts` stamps `x-elysium-*` / `x-lumenforge-edge` headers.  
Operator UI: `/operator` (same-origin exercise; no secrets in browser).

## Enable

1. Apply SQL: `packages/veridex/sql/veridex_envelopes.sql`
2. Set on host (Vercel / Docker):
   - `ELYSIUM_AUDIT_LOOP=1`
   - `VERIDEX_SUPABASE_URL`
   - `VERIDEX_SUPABASE_SERVICE_ROLE_KEY`
3. Confirm `GET /api/elysium/status`
4. Exercise `POST /api/elysium/gate` or open `/operator`

Without Supabase env, stamps are local-only (`ledger: "local_only"`).

## curl

```bash
# Gate
curl -s -X POST "$HOST/api/elysium/gate" \
  -H 'content-type: application/json' \
  -d '{"requestId":"audit_e2e_1","draft":"Findings are bounded and reversible."}'

# Delivery pack (.epack)
curl -s -X POST "$HOST/api/elysium/pack" \
  -H 'content-type: application/json' \
  -d '{"requestId":"audit_e2e_1","draft":"Findings are bounded and reversible.","clientLabel":"Demo Co"}'
```

Attach `epackJson` / `pack` as `receipt.epack.json` in the customer delivery folder.

## Safety

- Public CTA / Stripe unchanged
- Service role never shipped to client
- Default loop off
- Operator page is not linked from the public marketing nav (direct URL only)
