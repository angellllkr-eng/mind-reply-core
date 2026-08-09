# OWN Studio — A11 controlled equivalent of v0 / Manus

**Status:** Scaffold live in `apps/a11k-studio`  
**Date:** 2026-08-09  
**Principle:** Owner-gated. Evidence over aspiration. No external v0/Manus dependency required to operate.

## What this is

Your own design-and-narrative surface for the estate:

| Capability | v0 / Manus style | OWN Studio approach |
|------------|------------------|---------------------|
| Prompt → UI | Cloud model, vendor lock | Brief → structured shell (HTML/React-ready) generated under your rules |
| Visual generation | Vendor model | Optional: Grok Imagine / Canva / Figma when connected; local brief always works |
| Deploy | Vercel-tied | Any host; `vercel.json` present only as one option |
| Authority | Vendor account | Angel review before any “live” claim |
| Memory / continuity | Vendor session | Estate checkpoints + dual-root evidence |

## Surfaces

1. **Narrative compile** (already present) — positioning, verified proof, explicit boundary, one action.
2. **Design brief → shell** (new) — prompt → structured page shell with sections, CTA, and exportable markup.
3. **Boundary pane** — always states what the tool does *not* do (no fake live, no secret publish).

## Operating rules

- Never mark a surface “live” without deployment evidence and Angel approval.
- Prefer local brief + export over vendor-only generation.
- When using external generators (v0, Lovable, Canva, Figma), treat output as *candidate* only; OWN Studio is the record of truth and boundary.
- Aligns with Visual Frontiers (#27–#34) but does not require their OAuth to be useful today.

## Path to stronger equivalence (optional, after cash)

1. Wire a single model endpoint (your key) for brief → React component stream.
2. Add project history under `evidence/studio/`.
3. Connect Crownline for owner approval of published shells.
4. Keep dual-root: product shells in mind-reply-core; ops evidence in agent-control-plane.

## Explicit non-goals this week

- Replacing the €3k revenue path
- Full autonomous design agent fleet
- Claiming parity with commercial v0 without evidence
