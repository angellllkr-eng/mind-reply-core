# NOVA Change Control Policy

Status: CONTROLLED POLICY
Updated: 2026-09-22
Owner authority: A11ceo
Assurance/review layer: HALO AI

## Change classes
OWNER_APPROVAL — licensing, market activation, money movement, irreversible commercial/legal changes, public regulated claims.
CONTROLLED_ENGINEERING — code, tests, docs, UX and configuration within approved scope.
EVIDENCE_REVIEW — verification of existing claims and controls.
REFERENCE_ONLY — research and external observations.

## Required change record
Every material change records: reason, scope, author, base commit, changed files, test evidence, security impact, data impact, regulatory impact, rollback plan, reviewer, owner decision, release environment and post-release verification.

## Protected changes
No direct production activation of real-money, payment, KYC/AML, regulated wallet, market access, licence status or regulated claims from a code-only change. These require the applicable external evidence and owner approval.

## Drift rule
When external law, regulator guidance, supplier terms, payment rules, security advisories or data-protection guidance changes, affected controls return to REVIEW until reverified.
