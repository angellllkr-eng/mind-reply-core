# Capability Signal Adapter

Purpose: convert external product-launch signals into bounded engineering experiments without treating discovery as proof.

## Current signal: HAR

HAR is an open-source harness for multi-agent coding workflows. Its public description emphasizes isolated worktrees, ports and databases, deterministic validation, and evidence tied to the exact validated tree.

## What MindReply should borrow

- task-local branch/worktree isolation
- explicit file ownership and overlap detection
- deterministic project validation profiles
- proof artifacts bound to commit/tree identity
- durable run metadata
- stale-proof rejection
- pre-merge conflict detection

## What MindReply should not borrow automatically

- vendor lock-in
- hosted control-plane assumptions
- permissions broader than the task requires
- production execution without the existing owner gates

## Integration rule

Discovery sources such as Product Hunt, Firecrawl alerts, social posts, and launch directories are **signals only**. A signal can create an engineering experiment or research task, but cannot establish that a capability is production-ready.

Promotion requires:

`signal → source verification → bounded experiment → measured result → proof artifact → review → promotion`

## Existing architecture fit

This adapter extends the existing Proofline, Crownline, Continuity Ledger, and Operator Guild concepts. The canonical agent fleet contract already requires bounded purpose, allowed/blocked tools, evidence, stop conditions, and escalation.

## Immediate experiment

Issue #72 tracks implementation of the HAR-inspired primitives natively in `mind-reply-core`, with no external dependency required for the first iteration.

## Evidence

Public HAR descriptions were reviewed on 2026-08-11. Product Hunt is treated as discovery, not authoritative proof.
