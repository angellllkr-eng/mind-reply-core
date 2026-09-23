# NOVA — Legal / Compliance Control Register

Status: PREPARATION ONLY

This is an engineering control map, not legal advice or filing-ready text.

| Control | DEMO | SYNTHETIC STAGING | REGULATED PRODUCTION | Evidence |
|---|---|---|---|---|
| Age/eligibility | Informational | Synthetic test | Required before regulated play | Test + jurisdiction rule |
| KYC | Off | Simulated | Required as applicable | Provider + test evidence |
| AML | Off | Simulated | Required | Policy + implementation + monitoring |
| Responsible gambling | Safer-play information | Synthetic controls | Required market-specific controls | Tests + policy |
| Self-exclusion | Informational | Synthetic | Required where applicable | End-to-end test |
| Player funds | Demo credits only | Synthetic ledger | Controlled production ledger | Reconciliation evidence |
| Payments | Off | Sandbox | Approved provider | Contract + provider approval |
| Game/RNG testing | Demo content | Test fixtures | Required for applicable games | Test reports |
| Security | Baseline | Security testing | Independent assurance as required | Audit/report |
| Audit trail | Development logs | Synthetic audit | Controlled evidence | Retention + access test |
| Market gating | Demo only | Synthetic | Enforced | Geo/jurisdiction tests |
| Legal content | Draft/demo | Draft | Counsel-approved | Approval record |
| Complaints/ADR | Informational | Synthetic | Market-specific process | Published + tested |
| Privacy/DPA | Demo boundary | Test processors | Approved controller/processor setup | DPA/DPIA/RoPA |
| Incident response | Internal | Drill | Operational | Drill evidence |

## Data architecture

Enterprise memory must remain policy/runbook content only. Player-identifiable data, KYC evidence, responsible-gambling events and transaction records belong in controlled primary systems with explicit retention, access and deletion/exception rules.

## Automated decisions

Any production eligibility or player-protection decision with significant effects must be reviewed with privacy counsel/DPO for applicable transparency, human-review, lawful-basis and jurisdiction-specific requirements. A technical launcher gate is not itself proof of GDPR/UK GDPR compliance.