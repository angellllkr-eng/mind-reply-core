# NOVA Gaming — Security & Privacy Boundaries

**Updated:** 2026-09-20  
**Scope:** Data classification, protection mechanisms, audit trails, compliance framework

---

## DATA CLASSIFICATION

### 🟥 RESTRICTED (Never expose, encrypt at rest & in transit)
- User passwords, OAuth tokens, session keys
- Identity verification data (SSN, passport scans, facial biometrics)
- Payment card details (PCI-DSS scope only; use tokenized Stripe)
- Bank account details for withdrawals
- Know-Your-Customer (KYC) documents
- Play-money wallet balance (treat as financial data)
- User location data
- Device identifiers (IMEI, etc.)
- VPN/proxy detection signals

### 🟧 SENSITIVE (Encrypt at rest, audit all access)
- Email address
- Phone number
- Username
- Profile picture
- Game play history (which games, when, duration, wagers)
- Deposit/withdrawal history
- Responsible gambling limits set by user
- Self-exclusion status
- Account notes / support tickets

### 🟨 INTERNAL (Audit logging, no external exposure)
- API keys (game provider, Stripe, etc.)
- Database credentials
- WebSocket connection tokens
- Admin operation logs
- Infrastructure metrics
- Error traces (stack traces)

### 🟩 PUBLIC (No protection, but logged)
- General game info (title, studio, category, RTP %)
- Leaderboard names (anonymized: "Player #1234")
- Promotional content
- General platform metrics (total games, concurrent players)

---

## PROTECTION MECHANISMS

### At Rest (Database)
- **User passwords:** bcrypt with salt (cost factor 12+)
- **API keys / secrets:** Encrypt with AES-256 + HSM key management (use AWS Secrets Manager or similar)
- **Payment data:** Never store full card numbers; use Stripe tokenization
- **KYC documents:** Encrypt in secure S3 bucket + MFA to access
- **Play-money transactions:** Encrypt transaction IDs + amounts; sign with HMAC

### In Transit (Network)
- **All endpoints:** HTTPS 1.3 only, no HTTP fallback
- **API authentication:** Bearer tokens (JWT or opaque), refresh tokens separate
- **WebSocket:** Secure WebSocket (wss://) only
- **Webhooks:** Sign with HMAC-SHA256; verify signature before processing
- **Third-party APIs:** mTLS where available; else API key + rate limiting

### Access Control
- **Least privilege:** Users can only see their own data
- **Row-level security:** Database enforces user_id scoping (Supabase RLS)
- **Role-based access:** Admin, moderator, player, support roles with explicit permissions
- **API scopes:** OAuth scopes (read:profile, write:wallet, etc.)
- **Audit logging:** Every RESTRICTED/SENSITIVE access logged with timestamp, user, IP, reason

---

## SENSITIVE DATA HANDLING

### User Authentication
```
Flow: User enters email/password → bcrypt verify → session token issued → 
      token stored in HTTP-only, Secure, SameSite=Strict cookie
      
Never:
  - Log plaintext passwords
  - Store session tokens in localStorage
  - Send tokens in URL params
  - Accept token refresh without timestamp validation
```

### KYC / Identity Verification
```
Flow: User uploads document → Immediately encrypted → Sent to third-party provider 
      (IDology/Jumio/GBG) via mTLS → Result stored encrypted → Documents deleted 
      from our servers after 30 days (compliance holds)

Never:
  - Store unencrypted documents
  - Expose verification to client-side
  - Log full SSN/passport numbers
  - Retain documents longer than legal requirement
```

### Play-Money Transactions
```
Flow: User plays game → Backend records wager (game_id, amount, result, timestamp) → 
      Balance updated atomically → Transaction logged to ledger

Never:
  - Log full transaction object; log only: { user_id, tx_id, amount, balance_after, timestamp }
  - Send transaction details to third-party analytics unencrypted
  - Expose internal transaction IDs to client
```

### Withdrawal / Deposit (if real money added)
```
Flow: User requests withdrawal → Amount verified against balance → 
      Request held in "pending" state → Manual review (compliance) → 
      Stripe transfer initiated → Confirmation sent to user email

Never:
  - Auto-approve withdrawals without review
  - Store bank account numbers; use Stripe ACH tokens
  - Log stripe_account_id in application logs
```

---

## AUDIT LOGGING

### What Gets Logged
Every RESTRICTED or SENSITIVE operation:
```
{
  timestamp: ISO 8601,
  user_id: "hashed or anonymized",
  action: "login | kYC_submitted | game_started | withdrawal_requested",
  resource: "user | identity_doc | transaction",
  result: "success | failure",
  ip_address: "1.2.3.4",
  user_agent: "Mozilla/5.0...",
  error_code: "if failure"
}
```

### Where Logs Live
- **Application logs:** CloudWatch / Google Cloud Logging (encrypted, retention 90 days)
- **Audit trail:** Immutable append-only log in PostgreSQL (retention 7 years for compliance)
- **Real-time alerting:** PagerDuty on suspicious patterns (10+ failed logins from same IP, etc.)

### What Never Gets Logged
- Plaintext passwords
- Full card numbers
- Full SSN / passport numbers
- OAuth refresh tokens
- API keys
- User device location data

### Who Can Access Logs
- **Automated systems:** Only for alerting (no raw data exposure)
- **Admins:** Via secure audit UI (encrypted tunnel + MFA)
- **Compliance team:** For regulatory requests (auditor trail read-only)
- **Users:** Can request their own activity log (self-service, anonymized)

---

## INCIDENT RESPONSE

### If Breach Detected
1. **Immediate (0-5 min):** Freeze affected accounts, revoke tokens, page on-call team
2. **Short-term (5-60 min):** 
   - Isolate affected systems
   - Preserve evidence (logs, snapshots)
   - Notify compliance officer
   - Begin investigation (what data exposed, how many users)
3. **Medium-term (1-24 hours):**
   - Notify affected users (email + SMS)
   - Publish transparency report
   - Rotate API keys / secrets
   - File GDPR breach report if applicable
4. **Long-term (1-7 days):**
   - Post-mortem (root cause, fix, prevent recurrence)
   - Update security controls
   - Notify insurance provider

### Contact: 
- Compliance: compliance@novagaming.local (or external team)
- Security: security@novagaming.local (or external CISO)
- Owner (A.K.): Direct notify

---

## THIRD-PARTY INTEGRATIONS

### Stripe (Play-money Payments)
- **Data sent:** user_id (hashed), amount, transaction_id (ours), metadata
- **Data received:** payment_intent_id, charge_id, status
- **Never send:** User email, full name, IP address, device info
- **Webhook verification:** HMAC-SHA256 signature check mandatory
- **Retention:** Stripe retains per their policy; we retain hash of charge_id only

### Game Provider SDK (e.g., Pragmatic Play)
- **Data sent:** user_id (opaque token), session_token, game_id, amount, locale
- **Data received:** game_result, win_amount, transaction_id
- **Never send:** Full user PII, payment details, location data
- **Session isolation:** Each game session gets unique opaque token (revoked after game ends)
- **Rate limiting:** Max 100 requests/sec per user_id to prevent scraping

### KYC Provider (IDology / Jumio)
- **Data sent:** User document (image), typed fields (name, DOB)
- **Data received:** Verification status (approved/rejected/manual_review)
- **Never store:** Provider's response object; store only: { verified_at, status, decision_reason }
- **Document retention:** Delete after 30 days (or per regulatory requirement)
- **Compliance:** mTLS + encryption in transit

### Analytics (Optional: Posthog / Plausible)
- **Data sent:** Event name, game_id (if general, not user-specific), timestamp
- **Never send:** user_id, email, session_token, balance, wagers, location
- **Opt-out:** Users can disable analytics in /app/account/privacy
- **Retention policy:** Posthog retains per their SLA; we can request deletion

---

## RESPONSIBLE GAMBLING COMPLIANCE

### Data Collection (for safeguarding)
- Session duration (total time played today/week/month)
- Total wagers (sum of bets in session)
- Net loss (total wagers - total winnings)
- Login frequency (sign of problem gambling)

### Data Usage (server-side enforcement)
- **Session time limit (30 min):** Server-side timer; forces logout at 30 min regardless of client state
- **Deposit cap ($100/day):** Wallet service rejects deposits exceeding limit
- **Self-exclusion:** User account locked; all logins rejected, support team must approve re-entry
- **Mandatory break:** After 30 min, prompt user; auto-logout after 3 warnings
- **Loss limit alert:** Show user net loss; warn if exceeds warning threshold ($50)

### Data Transparency
- User can export their play history (CSV) from /app/account/responsible-gambling
- Monthly statement (email) showing session time, total wagers, net result
- Helpline links: GamCare, National Problem Gambling Council, Gamblers Anonymous

---

## GDPR COMPLIANCE

### User Rights Implemented
- **Right to access:** /app/account/download-my-data (generates ZIP of all user data)
- **Right to delete:** /app/account/delete-account (hard delete after 30-day cooling-off)
- **Right to rectify:** /app/account/edit-profile
- **Right to restrict processing:** Disable analytics, disable marketing emails
- **Right to data portability:** Export data in standard format (CSV/JSON)
- **Right to object:** Can object to profiling for marketing

### Data Retention Policy
- **Active user account:** Kept indefinitely (or until user deletes)
- **Deleted account:** Anonymized after 30 days (PII removed, transaction history kept for compliance)
- **KYC documents:** Deleted 30 days after verification or regulatory hold expiry
- **Session logs:** Kept 90 days (audit trail kept 7 years)
- **Marketing emails:** Unsubscribe honored immediately

### Lawful Basis
- **Contractual:** Processing user data to deliver gaming service (consent not required)
- **Legal obligation:** KYC, AML, responsible gambling (no consent needed)
- **Legitimate interest:** Platform analytics for safety (can opt-out)
- **Consent:** Marketing emails, optional analytics (explicit opt-in)

---

## DEPLOYMENT SECURITY CHECKLIST

Before production deployment:
- [ ] All API endpoints validate user_id (can't access other users' data)
- [ ] All database queries filtered by user_id (RLS enforced)
- [ ] No secrets in code, config, or logs
- [ ] HTTPS everywhere (no mixed content)
- [ ] CORS restricted to novagaming.com (or regional variants)
- [ ] Rate limiting (100 req/min per IP, 1000 req/hour per user)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (Content-Security-Policy header, React escaping)
- [ ] CSRF protection (SameSite cookies + tokens)
- [ ] Password reset via email (no SMS for now)
- [ ] MFA optional for users (TOTP preferred)
- [ ] Admin accounts: MFA mandatory
- [ ] All outbound APIs use certificate pinning (if critical)
- [ ] Error messages don't leak internal details ("Invalid credentials" not "Email not found")
- [ ] Logging captures sensitive access but doesn't log secrets
- [ ] Monitoring alerts on: failed logins (10+), KYC rejects, withdrawal spikes, API errors
- [ ] Incident response runbook in place
- [ ] GDPR Data Processing Agreement signed with all vendors
- [ ] Responsible gambling helpline prominently displayed
- [ ] Privacy Policy + ToS reviewed by legal counsel

---

## OWNER (A.K.) RESPONSIBILITIES

1. **Approve security posture** (this document) before launch
2. **Decide licensing scope** (demo-only vs. UK licensed vs. EU licensed) — determines KYC/AML requirements
3. **Nominate compliance officer** — owns GDPR, responsible gambling, regulatory reporting
4. **Review incident response procedure** — know who to contact if breach
5. **Approve vendor selection** — which KYC provider, which analytics tool, etc.
6. **Annual security audit** — penetration test + source code review

