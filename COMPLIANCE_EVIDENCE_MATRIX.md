# NOVA Gaming — Compliance Evidence Matrix

**Status:** PREPARATION / COUNSEL REVIEW REQUIRED
**Updated:** 2026-09-22

> Preparation material only. Not legal advice or filing-ready text.

## Current operating boundary

The current GitHub implementation is a free-play/demo Digital Hall (Nova lobby). The application describes balances, spins and prizes as illustrative/demo functionality and states that no real money is involved.

Real-money wagering, deposits, withdrawals and regulated game sessions must remain disabled until the relevant operating entity, licences, suppliers, payment arrangements, technical controls and legal approvals are verified.

## Evidence matrix

| Area | Current evidence | Required production evidence | Status |
|---|---|---|---|
| Digital Hall UI | Next.js lobby, game grid, live-table UI, rewards, promotions, account and game routes | Production QA evidence | VERIFIED IN SOURCE |
| Demo boundary | UI/account/footer describe demo/no real-money value | Automated regression proving no real-money path | VERIFIED IN SOURCE / TEST REQUIRED |
| Operating entity | Planning docs only | Incorporation, ownership/UBO and counsel confirmation | UNVERIFIED |
| UK remote casino | UKGC licence is required for remote casino facilities supplied to Great Britain | Application/grant and licence conditions | NOT LICENSED / UNVERIFIED |
| Bulgaria | Planning docs only | Current Bulgarian counsel/regulatory evidence | UNVERIFIED |
| Game suppliers | EGT/Pragmatic named in planning; current UI uses mock data | Executed agreements, required approvals and integration evidence | UNVERIFIED |
| KYC | Template only | Contracted provider and tested verification controls | NOT IMPLEMENTED |
| AML | Planning only | Screening, monitoring, escalation and audit evidence | NOT IMPLEMENTED |
| Wallet | Demo/mock wallet | Auditable production ledger and reconciliation | NOT IMPLEMENTED |
| Payments | No production gambling payment integration | Provider approval for entity, markets and activity | UNVERIFIED |
| Responsible gambling | Informational UI; no server enforcement | Server-side limits, exclusion and intervention controls | NOT IMPLEMENTED |
| Reporting | Planned only | Tested regulatory reporting pipeline | NOT IMPLEMENTED |
| Data protection | Planning material | DPIA/RoPA/retention/contracts/security evidence as applicable | PREPARATION |
| Security | Planning material | Independent security assessment and remediation | NOT COMPLETED |
| Technical compliance | No production gambling stack | Applicable standards/testing evidence | NOT COMPLETED |
| Deployment | Legacy Vercel references | ResellerPro + Cloudflare staging/production evidence | NOT VERIFIED |
| Domains | Targets documented | Registrar, DNS, TLS and routing evidence | UNVERIFIED |

## UKGC baseline

The UKGC states that a remote casino operating licence covers online casino facilities such as slots, roulette and blackjack, and is required when providing facilities for gambling to consumers in Great Britain.

Official source:
https://www.gamblingcommission.gov.uk/licensees-and-businesses/licences-and-fees/remote-casino-operating-licence

The UKGC application material includes items such as ownership/management structures, business plan, forecasts, source-of-funds evidence, terms and conditions, policies/procedures, remote technical standards material, operational/system diagrams and testing strategy.

## Deployment gate

The Digital Hall may be deployed as a clearly identified free-play/demo experience, subject to normal legal, consumer, privacy and platform review.

Keep OFF until authorization is verified:
- real-money deposits
- real-money withdrawals
- monetary wagering
- production wallet
- cash-out
- regulated game-session launch
- unverified licence claims
- market activation where authorization is absent

## Evidence rule

A UI component, route, document or planned integration does not prove a regulatory control is complete.

A control is VERIFIED only when implementation evidence exists together with the appropriate test, configuration, contract, licence or independent assurance artifact.
