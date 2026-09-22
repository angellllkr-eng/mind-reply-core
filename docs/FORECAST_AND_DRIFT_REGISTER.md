# NOVA Forecast and Drift Register

Status: PLANNING / EARLY-WARNING REGISTER — NOT EVIDENCE
Updated: 2026-09-22
Owner authority: A11ceo
Assurance/review layer: HALO AI

## Purpose
Track foreseeable changes that can affect NOVA without pretending future events are known. Forecasts trigger inspection; they do not grant permission to release.

## Watch areas
1. REGULATORY — licence rules, technical standards, customer-interaction rules, advertising, fees, reporting.
2. MARKET — country access rules, local restrictions, language/currency requirements.
3. SUPPLIER — licences, market coverage, API versions, incidents, SLAs, pricing, contract changes.
4. PAYMENT — onboarding rules, chargeback controls, AML/KYC requirements, supported markets.
5. SECURITY — framework advisories, dependencies, cloud/CDN changes, credential exposure, new attack paths.
6. PRIVACY — regulator guidance, processor/subprocessor changes, international transfers, retention requirements.
7. PRODUCT — accessibility, mobile OS/browser changes, performance, misleading UX risk.
8. OPERATIONS — DNS/TLS, deployment, monitoring, rollback, support capacity.

## Current forward-looking signals
- UKGC RTS and online LCCP are actively maintained; the current LCCP version is effective from 29 July 2026, and the remote casino licence page includes fee changes from 1 October 2026. These are concrete reasons to re-check GB evidence before any GB activation.
- EDPB privacy guidance and breach-notification materials continue to evolve; privacy controls should be revalidated before production.
- Supplier capabilities and market approvals can change independently of NOVA; provider research must therefore be revalidated at contract and release time.

## Forecast horizons
30 days: dependency/security advisories, documentation drift, supplier responses, build/deployment evidence.
90 days: regulatory/guidance updates, market-access changes, contract and pricing changes, privacy/security control refresh.
180 days: licence/contract expiry, annual testing/security requirements, market strategy changes, architecture review.

## Trigger actions
If a material external change is detected: HALO opens REVIEW, identifies affected claims/controls, the owner decides scope, and the relevant evidence is refreshed before affected capabilities are re-enabled.

## Non-prediction rule
No forecast in this file is an election, financial, gambling-outcome or regulatory-approval prediction. It is an operational risk-monitoring signal only.
