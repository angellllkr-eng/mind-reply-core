# NOVA Gaming — Go-Live Readiness (UK + Bulgaria Licensed Real-Money)

**Status:** APPROVED FOR EXECUTION  
**Repo:** github.com/angellllkr-eng/novagaming  
**Latest Commit:** e25615e (dual-market updates)  
**Updated:** 2026-09-20

---

## EXECUTIVE SUMMARY

**NOVA Gaming** is now fully scoped as a **dual-licensed, real-money gaming platform** targeting UK and Bulgarian markets with launch in 12-14 weeks.

**Business Model:**
- 🇬🇧 UK: Gambling Commission (UKGC) license
- 🇧🇬 Bulgaria: Commission for Gambling Regulation (BGgov) license
- 500+ games (EGT primary for Bulgaria, Pragmatic Play secondary for UK)
- Multi-currency wallet (GBP, BGN, EUR)
- Full KYC/AML compliance both markets
- Real-money revenue model

---

## IMMEDIATE ACTION ITEMS (A.K. DECISION REQUIRED)

### 🔴 CRITICAL (This Week)

| Item | Current Status | A.K. Action | Impact |
|------|----------------|-------------|--------|
| **Pragmatic Play Confirmation** | ⏳ Pending | YES / NO / Alternative? | Unlocks UK game catalog (C3) |
| **Live Domains** | ⏳ Pending | Approve novagaming.co.uk + novagaming.bg | Unlocks DNS, SSL, production deployment (C10) |
| **Compliance Officer** | ⏳ Pending | Nominate (internal or external counsel) | Unlocks license applications (C9) |
| **License Strategy Approval** | ✅ APPROVED | Confirm: UKGC + BGgov dual license (UK + Bulgaria) | Confirmed; proceed with parallel applications |

---

## TEAM EXECUTION ROADMAP

### Phase 1: Licensing & Infrastructure (Weeks 1-2)

**Compliance Team:**
- [ ] File UKGC application (Gambling Commission, £5k-20k fee)
- [ ] File BGgov application (Bulgaria gaming regulator, BGN 100k+ fee)
- [ ] Engage local Bulgarian representative (required by BGgov)
- [ ] Secure legal counsel (UK + Bulgarian gaming lawyers)

**DevOps / Backend Lead:**
- [ ] Provision backend hosting (AWS / DigitalOcean / Heroku) — decide
- [ ] Set up PostgreSQL (primary database)
- [ ] Set up Redis (cache + session store)
- [ ] Configure CI/CD pipeline (GitHub Actions)

**Frontend:**
- [ ] Review dual-market requirements (C5, C6, C8)
- [ ] Plan i18n setup (English + Bulgarian)
- [ ] Prepare KYC flow UI (upload, liveness check)

### Phase 2: Backend API + SDK Integration (Weeks 2-5)

**Backend Team (CRITICAL PATH):**
- [ ] Build API service (Node/Express or Python/FastAPI)
  - User auth + dual KYC status tracking
  - Multi-currency wallet (GBP, BGN ledgers)
  - Game session management
  - Responsible gambling enforcement (server-side)
  - Regulatory reporting (UKGC + BGgov dashboards)
  
**Frontend + Integration Team:**
- [ ] EGT SDK integration (C2) — Bulgaria primary
- [ ] Pragmatic Play SDK integration (C3) — UK fallback (if approved)
- [ ] Game session token handling
- [ ] Test result reporting to backend

**Backend + Compliance:**
- [ ] Integrate dual KYC providers
  - UK: IDology or Jumio (UKGC-approved)
  - Bulgaria: BGgov-approved provider (selection pending)
- [ ] Implement AML screening (OFAC + SDN lists)
- [ ] Real-time KYC status updates

### Phase 3: Live Dealer + Multi-Currency (Weeks 4-6)

**Backend:**
- [ ] WebSocket server (live table state, real-time updates)
- [ ] Video stream integration (dealer feed)
- [ ] Multi-language support (English + Bulgarian UI overlays)
- [ ] Stripe FX integration (GBP/BGN settlement)

**Frontend:**
- [ ] Live table cards + join flow
- [ ] Multi-currency display + currency selector
- [ ] Localization (i18n setup, translations)
- [ ] KYC flow pages (/app/account/kyc/)

### Phase 4: Regulatory Compliance + Testing (Weeks 6-8)

**Compliance / Backend:**
- [ ] Set up regulatory reporting (UKGC + BGgov formats)
- [ ] Implement audit trail (immutable logging)
- [ ] Session limiting enforcement (UK 60 min, BG 90 min)
- [ ] Deposit capping per market
- [ ] Self-exclusion + mandatory break prompts

**DevOps:**
- [ ] Staging environment (both domains)
- [ ] Load testing (1000+ concurrent users)
- [ ] Security audit + penetration test (required for licensing)
- [ ] CI/CD verification

### Phase 5: Localization + Support Setup (Weeks 8-10)

**Frontend + Product:**
- [ ] Complete Bulgarian UI translation
- [ ] Legal docs (ToS, Privacy, Responsible Gambling — separate UK + BG)
- [ ] Support documentation (both languages)

**Customer Success:**
- [ ] Support team training (English + Bulgarian)
- [ ] Helpline integration (GamCare for UK, official helpline for Bulgaria)
- [ ] Support ticketing system configured

### Phase 6: Staging → Production (Weeks 10-12)

**All Teams:**
- [ ] Final compliance audit (UKGC + BGgov checklist)
- [ ] Staging environment smoke tests (both markets)
- [ ] Production DNS cut (when licenses approved)
- [ ] SSL certificates verified (both domains)
- [ ] Monitoring + alerting configured

### Phase 7: Launch Support (Weeks 12-14)

**All Teams:**
- [ ] Dedicated on-call rotation (24/7 for first week)
- [ ] Real-time monitoring (performance, errors, compliance)
- [ ] Player support escalation path
- [ ] Post-launch issues triage + fixes

---

## CRITICAL PATH DEPENDENCIES

```
IMMEDIATE (This Week):
  A.K. Decision: Pragmatic Play YES/NO
         ↓
  A.K. Decision: Domain names (novagaming.co.uk + novagaming.bg)
         ↓
  A.K. Decision: Compliance officer appointment
         ↓
WEEK 1:
  License applications filed (UKGC + BGgov)
  Backend hosting provisioned
  Legal counsel engaged
         ↓
WEEKS 2-3:
  Backend API started (sessions, wallets, KYC hooks)
  EGT SDK integration started
  Pragmatic SDK integration started (if YES)
  Dual KYC provider selection + onboarding
         ↓
WEEKS 3-5:
  SDK integrations complete
  Live dealer WebSocket working
  Multi-currency wallet functional
         ↓
WEEKS 6-8:
  Regulatory reporting ready
  Compliance testing complete
         ↓
WEEKS 8-10:
  Localization complete
  Staging environment stable
         ↓
WEEKS 10-12:
  License approvals received (target: UKGC 6-8 weeks, BGgov 4-6 weeks from filing)
  Production DNS cut
  Final compliance audit passed
         ↓
WEEKS 12-14:
  LAUNCH (UK + Bulgaria simultaneous)
  Post-launch support + monitoring
```

---

## BLOCKERS & UNBLOCKING

| Blocker | Status | Owner | Unblock Condition |
|---------|--------|-------|-------------------|
| **Domain Assignment** | 🔴 BLOCKED | A.K. | Provide novagaming.co.uk + novagaming.bg |
| **Pragmatic Play Confirmation** | 🔴 BLOCKED | A.K. / Product | Decision: YES / NO / Alternative |
| **Compliance Officer** | 🔴 BLOCKED | A.K. | Nominate person (internal or external) |
| **Backend Hosting** | 🔴 BLOCKED | DevOps | Provision AWS / DigitalOcean / Heroku |
| **Game Provider Licenses** | ⏳ IN PROGRESS | Compliance | EGT + Pragmatic agreements signed |
| **KYC Provider Selection (Bulgaria)** | ⏳ IN PROGRESS | Compliance | Select BGgov-approved provider |

---

## SUCCESS CRITERIA (GO-LIVE GATE)

### Before Staging (Week 6):
- ✅ Backend API responding to health checks
- ✅ EGT SDK games launching + results recorded
- ✅ Pragmatic SDK games launching (if enabled)
- ✅ KYC flow completes end-to-end (UK + Bulgaria test)
- ✅ Wallet transactions recorded in ledger
- ✅ Session limits enforced server-side
- ✅ Responsible gambling prompts functioning

### Before Production (Week 10-12):
- ✅ UKGC + BGgov license approvals received (or at minimum, provisional)
- ✅ Security audit passed (no critical vulns)
- ✅ Load test passed (1000+ concurrent users, <500ms latency)
- ✅ Staging environment stable for 7 days (no crashes)
- ✅ Localization complete (English + Bulgarian 100%)
- ✅ Legal docs reviewed by counsel (UK + Bulgarian)
- ✅ Compliance officer sign-off on all controls

### At Launch (Week 12-14):
- ✅ Both domains (novagaming.co.uk + novagaming.bg) live + HTTPS working
- ✅ Player signup + KYC flow tested (both markets)
- ✅ Game launches working across both providers
- ✅ Live dealer tables operational
- ✅ Support team trained + on-call
- ✅ Monitoring + alerts configured
- ✅ Rollback procedure documented + tested

---

## COMMUNICATION CADENCE

**Weekly Sync (Monday 10am):**
- Status update per team (backend, frontend, compliance, DevOps)
- Blocker review
- Risk mitigation for licensing delays

**Bi-weekly Compliance Review (Wednesday 3pm):**
- License application progress (UKGC + BGgov)
- KYC/AML provider onboarding
- Regulatory reporting readiness

**Incident Escalation:**
- Any blocking issue → A.K. notified same-day
- Production-impacting bugs → incident channel (Slack #nova-incidents)

---

## FINANCIAL ASSUMPTIONS

| Item | Cost | Owner |
|------|------|-------|
| UKGC License Fee | £5,000-20,000 | Compliance |
| BGgov License Fee | BGN 100,000+ (~$50,000 USD) | Compliance |
| Legal Counsel (UK + Bulgaria) | £10,000-30,000 | Legal |
| Security Audit + Penetration Test | $10,000-20,000 | DevOps |
| Backend Hosting (12 weeks @ scale) | ~$5,000-15,000 | DevOps |
| KYC Provider Setup (2 providers) | $3,000-8,000 | Compliance |
| Game Provider Rev Share (monthly, post-launch) | Negotiable (typically 20-35%) | Finance |
| **Total Pre-Launch (approximate)** | **$50,000-100,000** | — |

---

## RISK REGISTER

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| UKGC/BGgov license delayed | MEDIUM | Timeline +4-8 weeks | File Week 1, engage experienced counsel |
| Game provider (EGT/Pragmatic) integration over-runs | MEDIUM | Timeline +2-4 weeks | Start SDK integration Week 2, allocate 2 engineers |
| KYC provider (Bulgaria) unavailable | LOW | Compliance block | Identify backup provider now |
| Security audit finds critical vulns | LOW | Timeline +2-3 weeks | Conduct early security review (Week 5) |
| Load test reveals infrastructure bottleneck | MEDIUM | Scaling issue | Over-provision initially, optimize post-launch |
| Localization (Bulgarian) quality issues | MEDIUM | Player experience | Hire professional translator, QA testing |
| Live dealer provider (if using third-party) delays | MEDIUM | Timeline +2 weeks | Decide provider Week 1, sign contract Week 1 |

---

## TEAM REQUIREMENTS

**Backend (2-3 engineers):**
- Node/Express or Python/FastAPI experience
- PostgreSQL + Redis
- Payment processing (Stripe)
- WebSocket real-time systems

**Frontend (2 engineers):**
- Next.js 16 + React 19
- TypeScript
- i18n implementation
- Mobile responsiveness

**DevOps / Infrastructure (1-2 engineers):**
- AWS / DigitalOcean / Heroku
- CI/CD (GitHub Actions)
- Security best practices
- Load testing

**Compliance / Legal (1-2 people):**
- Gaming license experience (UKGC + BGgov)
- KYC/AML regulations
- Data protection (GDPR + Bulgaria equivalents)
- Responsible gambling frameworks

**QA / Testing (1-2 engineers):**
- Multi-market testing (UK + Bulgaria workflows)
- KYC flow testing
- Load testing
- Security testing

**Total: 8-10 people for 12-14 week sprint**

---

## NEXT IMMEDIATE ACTIONS

**By end of day (TODAY):**
- [ ] A.K. confirms: Pragmatic Play YES / NO / Alternative
- [ ] A.K. provides: novagaming.co.uk + novagaming.bg domain names
- [ ] A.K. nominates: Compliance officer (name + email)

**By end of Week 1:**
- [ ] Compliance + Legal begin UKGC + BGgov application drafting
- [ ] DevOps provision backend hosting
- [ ] Backend team starts API skeleton (auth, wallet, KYC hooks)
- [ ] Frontend team reviews dual-market UI requirements

**By end of Week 2:**
- [ ] License applications filed (both UKGC + BGgov)
- [ ] Game provider agreements signed (EGT + Pragmatic if YES)
- [ ] KYC provider contracts signed (both markets)
- [ ] Backend API /health endpoint responding

---

## COMMITMENT

✅ **NOVA Gaming is ready to execute.** All control files completed. Business model locked. Game providers selected. Timelines scoped. Teams aligned.

**Launch target: 12-14 weeks from start of development (Weeks 1-14)**

**Assuming:** A.K. decisions made this week, teams allocated by Week 1, development starts immediately.

---

**Questions?** Reference:
- **PROJECT_STATE.md** — Current state, blockers, architecture
- **TASKS.md** — Complete work register (Critical, High, Normal, Blocked, Complete)
- **SECURITY.md** — Data protection, compliance, incident response
- **DECISIONS.md** — Why we chose Next.js, EGT, etc., and what's pending
- **CONTRIBUTING.md** — Developer workflow, code style, testing

**Repository:** https://github.com/angellllkr-eng/novagaming  
**Latest commit:** e25615e
