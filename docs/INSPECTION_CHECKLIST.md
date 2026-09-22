# NOVA Release Inspection Checklist

Status: FORMAL PRACTICE STANDARD

## Identity and authority
- [ ] Correct NOVA repository and owner confirmed.
- [ ] Release commit recorded.
- [ ] A11ceo release authority recorded.
- [ ] HALO review recorded.
- [ ] No unrelated platform dependencies introduced.

## Source and build
- [ ] Typecheck passes.
- [ ] Production build passes.
- [ ] No committed secrets or environment files.
- [ ] Dependencies reviewed.
- [ ] Lockfile consistent.
- [ ] Error and fallback states tested.

## Security
- [ ] HTTPS/TLS verified.
- [ ] Security headers verified.
- [ ] CSP matches actual integrations.
- [ ] Authentication is server-side when introduced.
- [ ] Authorization tested per resource.
- [ ] CSRF protections appropriate to session model.
- [ ] Rate limits defined for sensitive endpoints.
- [ ] Third-party origins restricted.
- [ ] Secrets stored outside source control.
- [ ] Audit logging defined for security-sensitive events.
- [ ] Incident and rollback procedure tested.
- [ ] Independent security testing completed where required.

## Data
- [ ] Data inventory complete.
- [ ] Retention rules documented.
- [ ] Data minimization applied.
- [ ] Access controls tested.
- [ ] Database RLS/authorization verified where applicable.
- [ ] Backup/recovery tested.
- [ ] Production and synthetic environments separated.

## Player experience
- [ ] Mobile layout tested.
- [ ] Keyboard navigation tested.
- [ ] Screen-reader labels tested.
- [ ] Reduced-motion mode tested.
- [ ] No flashing/strobing.
- [ ] Promotions show material conditions clearly.
- [ ] Outcomes/balances are not visually falsified.
- [ ] Safer-play controls are visible where applicable.
- [ ] Language switch works.
- [ ] English and Bulgarian legal/product text reviewed.

## Supplier
- [ ] Provider identity verified.
- [ ] Market availability verified.
- [ ] Contract verified.
- [ ] API/RGS/live-stream docs reviewed.
- [ ] Test environment verified.
- [ ] Testing/certification evidence received.
- [ ] SLA and incident contacts recorded.

## Release
- [ ] Environment is correctly classified.
- [ ] Activation gate is satisfied for the intended state.
- [ ] DNS/TLS verified.
- [ ] Smoke test passes.
- [ ] Monitoring active.
- [ ] Rollback tested.
- [ ] Evidence bundle archived.
- [ ] Release approved by the correct authority.

No checkbox may be marked complete from assumption or generated text alone.
