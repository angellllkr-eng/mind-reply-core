# NOVA Security Control Matrix

Status: CONTROLLED CONTROL REGISTER
Updated: 2026-09-22
Owner authority: A11ceo
Assurance/review layer: HALO AI

## Control domains

### Identity and access
- Server-side authentication
- Least-privilege roles
- Per-resource authorization
- Admin separation
- MFA where required
- Session expiry/revocation
- Break-glass procedure

### Application
- Input validation
- Output encoding
- CSRF protection where applicable
- Rate limiting/abuse controls
- Dependency and supply-chain review
- Secret scanning
- Secure error handling
- Security headers/CSP matched to actual integrations

### Data
- Encryption in transit
- Encryption at rest where applicable
- Minimal collection
- Retention/deletion controls
- Audit logging
- Backup/restore verification

### Infrastructure
- TLS/DNS verification
- Environment separation
- Secret management
- Provider-origin restrictions
- Monitoring and alerting
- Incident containment
- Tested rollback

### Gambling-specific production assurance
For applicable regulated markets, map technical/game/RNG testing and independent security-assurance requirements to the regulator's current rules. For GB, UKGC states remote licence holders must comply with RTS and its testing strategy, and the Commission identifies independent annual security-audit requirements for covered remote operators.

## Evidence rule
A control is VERIFIED only when implementation, test result, owner, date, environment and evidence location are recorded. Documentation alone is not implementation evidence.
