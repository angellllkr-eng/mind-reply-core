# NOVA Gaming — Parallel Execution Roadmap (Week-by-Week)

**Status:** FULL EXECUTION MODE  
**Timeline:** 12-14 weeks (Weeks 1-14)  
**Teams:** 8-10 people across 5 workstreams  
**Repo:** github.com/angellllkr-eng/novagaming

---

## EXECUTION MODEL

**5 Parallel Workstreams (no sequential blocking):**

1. **Compliance & Licensing** — License applications, KYC/AML setup, regulatory reporting
2. **Backend Infrastructure** — API service, database, Redis, WebSocket server, multi-currency wallets
3. **Game Provider Integration** — EGT SDK (Bulgaria), Pragmatic Play SDK (UK), game session handling
4. **DevOps & Infrastructure** — Hosting, CI/CD, domains, staging environment, monitoring
5. **Frontend & UX** — i18n setup, KYC flow UI, localization, accessibility, mobile responsiveness

**Each workstream operates independently with minimal blockers. Daily syncs to coordinate dependencies.**

---

## WEEK 1: KICKOFF (All Hands)

### 🔴 COMPLIANCE & LICENSING
**Owner:** Compliance Officer + Legal Counsel  
**Goal:** License applications filed, KYC/AML providers selected

- [ ] UKGC application drafted (due by Wed)
- [ ] BGgov application drafted (due by Wed)
- [ ] Engage local Bulgarian representative (BGgov requirement)
- [ ] UK legal counsel reviews + signs off (Wed-Thu)
- [ ] Bulgaria legal counsel reviews + signs off (Wed-Thu)
- [ ] File UKGC application (Friday, target approval 6-8 weeks)
- [ ] File BGgov application (Friday, target approval 4-6 weeks)
- [ ] **Parallel:** Start KYC provider evaluation (IDology/Jumio for UK, BGgov-approved for Bulgaria)
- [ ] **Parallel:** Start AML screening provider selection (Lexis Nexis, Socure, or similar)

**Success:** Both applications filed by end of Friday. KYC providers shortlisted.

---

### 🟠 BACKEND INFRASTRUCTURE
**Owner:** DevOps Lead  
**Goal:** Hosting provisioned, database schema ready, backend skeleton deployed

- [ ] Choose hosting platform (AWS / DigitalOcean / Heroku) — decision by Monday
- [ ] Provision PostgreSQL (master + replica for HA)
- [ ] Provision Redis (session store, cache)
- [ ] Provision WebSocket server (or plan for later)
- [ ] Set up GitHub Actions CI/CD (basic: lint, build, test)
- [ ] Create backend skeleton (Node/Express or Python/FastAPI)
  - [ ] GET /api/health endpoint
  - [ ] Database connection verified
  - [ ] Environment variable templates (.env.example)
- [ ] Deploy backend to staging (auto-deploy on branch)
- [ ] Backend repo ready for team commits

**Success:** Backend health endpoint responding on staging URL.

---

### 🟢 DEVOPS & DOMAINS
**Owner:** DevOps Lead (parallel with Backend Infrastructure)  
**Goal:** All 3 domains registered, DNS configured, Vercel projects created

- [ ] Register novagaming.co.uk (ResellerPro or registrar)
- [ ] Register novagaming.bg (ResellerPro or registrar)
- [ ] Register novagaming.com (ResellerPro for brand routing)
- [ ] Create Vercel project for UK (nova-gaming-uk)
- [ ] Create Vercel project for Bulgaria (nova-gaming-bg)
- [ ] Add novagaming.co.uk to Vercel project (Settings → Domains)
- [ ] Add novagaming.bg to Vercel project (Settings → Domains)
- [ ] Configure DNS records (A records, CNAME for www)
- [ ] Verify DNS propagation (all three should resolve in <1 hour)
- [ ] Test HTTPS (green 🔒 on all three domains)
- [ ] Set up Vercel environment variables (NEXT_PUBLIC_MARKET, NEXT_PUBLIC_CURRENCY)

**Success:** All three domains live with HTTPS verified. Vercel projects auto-deploy on PR.

---

### 🔵 FRONTEND & LOCALIZATION
**Owner:** Frontend Lead  
**Goal:** i18n skeleton ready, repo branches created, localization setup started

- [ ] Set up i18n (next-intl or i18n-js decision)
- [ ] Create English base translations (app/lib/i18n/en.json)
- [ ] Create Bulgarian stub translations (app/lib/i18n/bg.json — keys only, no translations yet)
- [ ] Language toggle component (header, persists to URL)
- [ ] Currency display component (GBP vs BGN based on locale)
- [ ] Create branch: feature/kYC-flow-uk
- [ ] Create branch: feature/localization
- [ ] Create branch: feature/multi-currency-wallet-ui
- [ ] KYC flow UI skeleton (mock form, no backend yet)

**Success:** i18n working, language toggle functional, branches ready for Week 2 work.

---

### 📊 WEEK 1 SYNC-UP (Friday 4pm)
- [ ] License applications filed ✅
- [ ] Backend health endpoint live ✅
- [ ] Domains registered + DNS live ✅
- [ ] Frontend i18n setup ready ✅
- [ ] Blockers identified → resolve by Monday

**Unblock:** Compliance officer nominated (if not done earlier). All Week 2 dependencies cleared.

---

## WEEK 2-3: PARALLEL BUILD (Core Infrastructure)

### 🔴 COMPLIANCE & LICENSING (Continued)

**Owner:** Compliance Officer  
**Goal:** KYC + AML providers integrated, first test flows passing

- [ ] KYC provider contract signed (UK: IDology/Jumio)
- [ ] KYC provider contract signed (Bulgaria: BGgov-approved)
- [ ] API credentials received + secured in secrets manager
- [ ] AML screening provider contract signed
- [ ] OFAC + SDN lists downloaded, integrated into API
- [ ] Test KYC upload flow (UK workflow)
- [ ] Test KYC upload flow (Bulgaria workflow)
- [ ] Test AML screening (flag test accounts)
- [ ] Regulatory reporting dashboard skeleton (UKGC format draft)
- [ ] Regulatory reporting dashboard skeleton (BGgov format draft)

**Success:** KYC test flows complete. AML screening returns results.

---

### 🟠 BACKEND API (Core Services)

**Owner:** Backend Team (2-3 engineers)  
**Goal:** User auth, wallet ledger, KYC status tracking, game session hooks

**Parallel stream A: Authentication**
- [ ] User registration endpoint (POST /api/auth/register)
- [ ] Email verification flow
- [ ] Login endpoint (POST /api/auth/login)
- [ ] Session token generation + validation
- [ ] Logout endpoint
- [ ] MFA setup (TOTP, optional for users)

**Parallel stream B: User & Profile**
- [ ] GET /api/user/profile
- [ ] PATCH /api/user/profile (update name, preferences)
- [ ] GET /api/user/kYC-status (returns: pending, submitted, approved, rejected)
- [ ] POST /api/user/kYC-submit (receives uploaded docs, calls KYC provider)
- [ ] GET /api/user/kYC-history (for compliance audit)

**Parallel stream C: Wallets & Transactions**
- [ ] Wallet model: { user_id, market (UK/BG), currency (GBP/BGN), balance, updated_at }
- [ ] GET /api/wallet/balance (returns current balance)
- [ ] POST /api/wallet/deposit (validates amount, market rules, calls Stripe)
- [ ] POST /api/wallet/withdrawal (initiates withdrawal to bank)
- [ ] GET /api/wallet/transactions (paginated history)
- [ ] Ledger table: immutable transaction log (deposit, wager, win, fee, withdrawal)

**Parallel stream D: Game Sessions**
- [ ] POST /api/games/:provider/session (EGT or Pragmatic provider param)
- [ ] Returns: session_token (opaque, time-limited), game_url (with token embedded)
- [ ] POST /api/games/result (receives game result: game_id, wager, win, provider)
- [ ] Updates wallet + ledger atomically
- [ ] Validate provider signature on result (prevent tampering)

**Parallel stream E: Compliance Hooks**
- [ ] GET /api/user/session-time (minutes played today)
- [ ] POST /api/user/deposit-limit-check (validate against daily cap)
- [ ] POST /api/user/session-limit-check (validate against time limit)
- [ ] POST /api/user/self-exclude (lock account, 6-month minimum cool-off)
- [ ] GET /api/user/self-exclusion-status

**Success:** /api/health returning all services + KYC endpoints tested + wallet endpoints operational.

---

### 🟢 GAME PROVIDER INTEGRATION (Parallel)

**Owner:** Frontend + Integration Lead (2 engineers)  
**Goal:** Both SDKs integrated, game launching, result reporting working

**Parallel stream A: EGT (Bulgaria)**
- [ ] EGT SDK documentation reviewed + API keys received
- [ ] EGT SDK library added to backend (npm package or custom wrapper)
- [ ] Session token generation for EGT games
- [ ] Game iFrame launcher component (/app/play/[gameId].tsx handles EGT)
- [ ] Test game launch (sample EGT slot game)
- [ ] Result callback handler (receives wager + result from EGT)
- [ ] Validate EGT signature on result callback
- [ ] Route result to backend wallet update
- [ ] EGT game catalog ingested (250+ games to lib/data/games.ts)

**Parallel stream B: Pragmatic Play (UK)**
- [ ] Pragmatic Play SDK documentation reviewed + API keys received
- [ ] Pragmatic SDK library added to backend
- [ ] Session token generation for Pragmatic games
- [ ] Game iFrame launcher component (same /app/play/[gameId].tsx, provider detection)
- [ ] Test game launch (sample Pragmatic slot game)
- [ ] Result callback handler
- [ ] Validate Pragmatic signature
- [ ] Route result to backend wallet update
- [ ] Pragmatic game catalog ingested (2000+ games subset)

**Success:** Sample EGT game launches → result recorded. Sample Pragmatic game launches → result recorded.

---

### 🔵 FRONTEND: KYC & Localization

**Owner:** Frontend Lead  
**Goal:** KYC UI complete, Bulgarian translations done, form validation working

**Parallel stream A: KYC Flow UI**
- [ ] Account dashboard template (/app/account/kyc/)
- [ ] Document upload component (drag-drop for passport/driving license/utility bill)
- [ ] Liveness check component (camera access for video selfie, if provider supports)
- [ ] Address verification form (postcode + address fields)
- [ ] KYC status display (pending / submitted / approved / rejected)
- [ ] Form validation (client-side + server-side)
- [ ] Error handling (provider errors → user-friendly messages)
- [ ] Success confirmation page

**Parallel stream B: Localization (English + Bulgarian)**
- [ ] Translate all UI strings to Bulgarian (~500 strings)
- [ ] Hire professional translator (if not in-house)
- [ ] Legal docs translations:
  - [ ] Terms of Service (UK version + BG version)
  - [ ] Privacy Policy (UK GDPR format + BG equivalent)
  - [ ] Responsible Gambling (both versions)
- [ ] Test language toggle (all pages render in Bulgarian)
- [ ] Currency formatting per locale (GBP £ vs BGN лв)
- [ ] Date/time formatting per locale

**Success:** KYC flow mockup complete. All Bulgarian translations done. Language toggle works.

---

### 📊 WEEK 2-3 SYNC-UPS (Wed + Fri)
- [ ] Backend API /health returning all services
- [ ] EGT + Pragmatic SDKs integrated, sample games launch
- [ ] KYC provider tests passing
- [ ] Frontend KYC UI ready for backend integration
- [ ] All Bulgarian translations complete
- [ ] Blockers: Identify + escalate

---

## WEEK 4-6: LIVE SYSTEMS & PAYMENTS

### 🟠 LIVE DEALER BACKEND (WebSocket)

**Owner:** Backend Lead  
**Goal:** Live table state streaming, real-time updates, video integration

- [ ] WebSocket server setup (Socket.io or native ws)
- [ ] Live table model: { id, status (Open/InPlay/Closed), seats[], current_hand, dealer_actions }
- [ ] Player join /leave table events
- [ ] Real-time updates to all connected players
- [ ] Video stream integration (third-party provider or mock)
- [ ] Multi-language support for dealer UI (English + Bulgarian overlays)
- [ ] Test: Connect 10 users to live table → all receive real-time updates
- [ ] Fallback: If video unavailable, degrade gracefully (still show table state)

**Success:** Live table receives real-time updates, multiple players sync'd.

---

### 💳 MULTI-CURRENCY WALLET & PAYMENTS

**Owner:** Backend + Payments Lead  
**Goal:** GBP/BGN ledgers working, Stripe FX integrated, deposits/withdrawals functional

- [ ] Dual ledger per user (GBP account + BGN account)
- [ ] Stripe FX setup (automatic currency conversion)
- [ ] Test GBP deposit (user in UK → receives GBP balance)
- [ ] Test BGN deposit (user in Bulgaria → receives BGN balance)
- [ ] FX margin calculation (1-2% documented in ToS)
- [ ] Withdrawal initiation (routes to Stripe ACH or local equivalent)
- [ ] Settlement verification (match bank deposits to ledger)
- [ ] Test end-to-end: Deposit → Play game → Win → Withdraw
- [ ] Transaction history UI shows correct currency + FX details

**Success:** Deposits in GBP work. Deposits in BGN work. Withdrawal process tested.

---

### 🔴 COMPLIANCE: RESPONSIBLE GAMBLING & REPORTING

**Owner:** Compliance + Backend  
**Goal:** Session limits enforced, deposit caps working, regulatory reports generated

**Enforcement (Server-Side):**
- [ ] Session time limit enforcement
  - UK: 60 min auto-logout
  - Bulgaria: 90 min auto-logout
- [ ] Mandatory break prompts (every 30 min)
- [ ] Deposit cap enforcement
  - UK: $500/day, $2000/week, $5000/month
  - Bulgaria: BGN 100/day (~$50 equivalent)
- [ ] User-set loss limits (optional)
- [ ] Self-exclusion tool (account locked, 6-month minimum)
- [ ] Test: User plays 60 min (UK) → forced logout
- [ ] Test: User attempts deposit exceeding daily cap → rejected

**Reporting:**
- [ ] UKGC monthly report generation (player count, revenue, incidents)
- [ ] BGgov monthly report generation (different format + fields)
- [ ] Audit trail queries (generate historical compliance reports)
- [ ] Regulatory dashboard (compliance officer can download + submit)

**Success:** Session limits enforced. Deposit caps enforced. Reports generate correctly.

---

### 🟢 STAGING ENVIRONMENT & TESTING PREP

**Owner:** DevOps + QA  
**Goal:** Staging environment live (both domains), test infrastructure ready

- [ ] Staging Vercel projects configured (staging.novagaming.co.uk + staging.novagaming.bg)
- [ ] Staging database provisioned (copy of production schema, but isolated)
- [ ] Staging backend deployed
- [ ] Staging frontend deployed
- [ ] Test accounts created (UK test user, Bulgaria test user, for QA)
- [ ] Monitoring + logging configured (CloudWatch or similar)
- [ ] Basic load testing infrastructure ready (k6, Locust, or Apache JMeter)

**Success:** Staging environment stable for testing. Test accounts functional.

---

### 📊 WEEK 4-6 SYNC (Wed + Fri)
- [ ] Live dealer WebSocket working (real-time updates verified)
- [ ] Multi-currency wallet operational (GBP + BGN tested)
- [ ] Responsible gambling limits enforced server-side
- [ ] Regulatory reports generating correctly
- [ ] Staging environment stable
- [ ] Next: Security audit + load testing (Week 4-5)

---

## WEEK 7-10: HARDENING & TESTING

### 🔒 SECURITY AUDIT + PENETRATION TESTING

**Owner:** External Security Firm + DevOps  
**Goal:** No critical vulnerabilities, security report accepted by UKGC + BGgov

- [ ] Source code review (OWASP Top 10)
- [ ] Infrastructure penetration test
- [ ] KYC/AML flow security (no data leakage)
- [ ] Payment processing security (PCI-DSS scope verification)
- [ ] API security (authentication, rate limiting, input validation)
- [ ] Database security (encryption at rest, access controls)
- [ ] Session handling (token expiry, regeneration)
- [ ] Findings report + remediation plan
- [ ] Critical vulnerabilities fixed (blocker for deployment)
- [ ] Medium/low vulnerabilities tracked (post-launch acceptable)

**Success:** Security report issued, no critical vulns, signed off by compliance officer.

---

### 📊 LOAD TESTING & PERFORMANCE

**Owner:** QA + DevOps  
**Goal:** 1000+ concurrent users supported, latency <500ms p95

- [ ] Load test infrastructure (k6 scripts prepared)
- [ ] Simulate 1000 concurrent UK users
- [ ] Simulate 500 concurrent Bulgaria users
- [ ] Test peak scenarios (live table join, game launch, withdrawal)
- [ ] Monitor: API latency, DB CPU, memory, network
- [ ] Identify bottlenecks (scale DB, optimize queries, cache more aggressively)
- [ ] Run multiple iterations (target: 2-3 successful runs)
- [ ] Document: Baseline latencies, peak capacity, scaling plan

**Success:** Load test report: 1000 concurrent users, <500ms latency p95, no crashes.

---

### 📱 MOBILE & ACCESSIBILITY TESTING

**Owner:** QA + Frontend  
**Goal:** Responsive layout verified, WCAG AA compliance confirmed

**Mobile Testing (Real Devices):**
- [ ] iPhone 12 (portrait + landscape)
- [ ] iPhone SE (small screen)
- [ ] Pixel 5 (Android, portrait + landscape)
- [ ] Galaxy S20 (large screen)
- [ ] Test: Game launch, KYC flow, wallet, live table
- [ ] Document: Issues found + resolutions

**Accessibility Testing (WCAG AA):**
- [ ] Keyboard navigation (Tab, Enter, Esc, arrow keys all work)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast verification (4.5:1 for text)
- [ ] Focus indicators visible + logical order
- [ ] Alt text for all images
- [ ] Semantic HTML (headings, landmarks, lists)

**Success:** Mobile testing report. Accessibility audit: WCAG AA compliant.

---

### 🔵 FINAL CI/CD & DEPLOYMENT PREP

**Owner:** DevOps  
**Goal:** GitHub Actions pipeline production-ready, deployment process documented

- [ ] GitHub Actions workflows finalized
- [ ] Lint + format checks (ESLint, Prettier)
- [ ] Type checking (TypeScript compilation)
- [ ] Build test (next build succeeds)
- [ ] Secret detection (truffleHog, gitleaks)
- [ ] Dependency audit (npm audit, pip audit)
- [ ] Deploy to staging on PR (auto-preview)
- [ ] Deploy to production on main merge (behind approval gate)
- [ ] Rollback procedure documented + tested
- [ ] Monitoring alerts configured (errors, latency spikes, crashes)

**Success:** CI/CD pipeline fully functional. Production deployment tested (to staging first).

---

### 📊 WEEK 7-10 SYNC (Wed + Fri)
- [ ] Security audit complete, no critical vulns
- [ ] Load test complete, 1000+ concurrent users verified
- [ ] Mobile + accessibility testing done, issues logged
- [ ] CI/CD pipeline live, all checks passing
- [ ] Staging environment production-quality stable

---

## WEEK 11-12: FINAL COMPLIANCE & CUTOVER

### 🔴 FINAL COMPLIANCE AUDIT

**Owner:** Compliance Officer + Legal  
**Goal:** UKGC + BGgov sign-off on deployment readiness

- [ ] License applications status check
  - UKGC: Approval expected (6-8 weeks from Week 1 filing)
  - BGgov: Approval expected (4-6 weeks from Week 1 filing)
- [ ] Final security audit results review (by regulators if required)
- [ ] Responsible gambling controls verified (audit + enforce)
- [ ] Data protection (GDPR + Bulgarian DPA) verified
- [ ] Audit trail completeness (all transactions logged)
- [ ] Compliance officer sign-off (ready for production)
- [ ] Legal counsel sign-off (all docs reviewed + compliant)

**Success:** Both license approvals received (or provisional approval sufficient). Compliance officer green-light.

---

### 🌐 PRODUCTION CUTOVER (DNS Swap)

**Owner:** DevOps + All Teams  
**Goal:** Live domains go live, production environment active

**Cutover plan (Friday evening, low-traffic window):**
1. Final health check (staging all green ✅)
2. Database backup (production snapshot)
3. Notify support team (24/7 on-call standby)
4. Update DNS records:
   - novagaming.co.uk → Production Vercel IP
   - novagaming.bg → Production Vercel IP
5. Verify DNS propagation (15-60 min)
6. Test both domains (users can now access)
7. Monitor closely (first 2 hours critical)

**Rollback procedure (if critical issue found):**
- Revert DNS to staging
- Investigate issue
- Fix in staging
- Re-attempt cutover next day

**Success:** Both domains live. Users can sign up, verify identity, deposit, play games.

---

## WEEK 12-14: LAUNCH & POST-LAUNCH SUPPORT

### 🚀 LAUNCH DAY & FIRST WEEK

**Owner:** All Teams (24/7 on-call)  
**Goal:** Stable launch, all systems operational, player support functional

**Pre-Launch (Day 1 morning):**
- [ ] Final sanity checks (all services responding)
- [ ] Support team briefing (escalation procedures)
- [ ] Monitoring dashboards live (errors, latency, user count)
- [ ] Comms: Announce to initial user cohort

**Post-Launch (Day 1-7):**
- [ ] Monitor: Error rates, latency, database performance
- [ ] Triage: Any critical issues escalate immediately
- [ ] Support: Players contact via email/chat, issues logged
- [ ] Player onboarding: Track KYC completion rate, first deposit rate
- [ ] Game health: Both EGT + Pragmatic games launching successfully
- [ ] Compliance: Daily check (no violation of session limits, deposit caps)
- [ ] Community: Gather feedback, log minor bugs for post-launch fixing

**Success Criteria (Week 1):**
- ✅ 99%+ uptime
- ✅ <500ms latency p95
- ✅ Zero critical issues
- ✅ 50%+ player KYC completion rate (within 24 hours of signup)
- ✅ 20%+ first deposit conversion rate
- ✅ Support team responding <2 hours to issues

---

### 📈 POST-LAUNCH OPTIMIZATION (Weeks 2-4)

**Owner:** All Teams  
**Goal:** Stabilize operations, optimize based on early feedback

- [ ] Fix non-critical bugs identified during launch
- [ ] Optimize slow queries (database profiling)
- [ ] Improve KYC flow (if drop-off rate high)
- [ ] Player feedback loop (gather pain points, plan improvements)
- [ ] Compliance monitoring (daily, then weekly reports to UKGC + BGgov)
- [ ] Analytics dashboard live (user retention, game popularity by market)
- [ ] Regional support setup (UK + Bulgaria support hours)

**Success:** By Week 14, platform stable, player feedback incorporated, early metrics looking good.

---

## PARALLEL EXECUTION RULES (CRITICAL)

### ✅ DO:
- **Independent branches:** Each workstream on separate git branches (feature/backend-api, feature/egt-sdk, etc.)
- **Daily 15-min standups:** Each team reports (1) what done yesterday, (2) what today, (3) blockers
- **Async communication:** Slack for quick questions, GitHub issues for tracking
- **Merge early & often:** Small PRs reviewed + merged daily (reduces merge conflicts)
- **Shared staging:** All teams test on staging environment (same domains for all)

### ❌ DON'T:
- **Don't wait for sequential tasks:** All workstreams run in parallel
- **Don't commit to main without review:** All PRs require code review + CI checks pass
- **Don't skip testing:** Every feature tested locally + on staging before merge
- **Don't let blockers linger:** Surface immediately → unblock same day
- **Don't merge untested code:** Risk cascading failures across teams

### 🔄 DEPENDENCY MANAGEMENT:
- **Backend → Frontend:** Frontend waits for backend API contracts (documented in OpenAPI/Swagger)
- **EGT SDK → Game Launch:** Frontend waits for EGT session token format (documented Week 2)
- **KYC Providers → KYC Flow:** Frontend waits for KYC API structure (documented Week 2)
- **Compliance Rules → Enforcement:** Backend waits for exact limits from compliance team (defined Week 2)

**Solution:** All dependencies defined by end of Week 1. Teams proceed independently thereafter.

---

## COMMUNICATION CADENCE

### Daily (All Teams):
- **9am standup (15 min):** Each team status + blockers
- **Slack channels:** #nova-backend, #nova-frontend, #nova-devops, #nova-compliance, #nova-general

### Weekly (Leads):
- **Monday 10am:** Planning sync (priorities for the week)
- **Friday 4pm:** Review + retrospective (what went well, what didn't, blockers)

### Bi-Weekly (Compliance):
- **Wednesday 3pm:** Regulatory status (license apps, KYC provider progress)

### Ad-Hoc (Escalation):
- **Critical blocker:** Ping team lead + A.K. immediately (Slack + email)
- **Production incident (post-launch):** Page on-call engineer + all leads

---

## SUCCESS METRICS (Per Phase)

| Phase | Week | Success Metric |
|-------|------|-----------------|
| **Kickoff** | 1 | License apps filed ✅, Backend health endpoint live ✅, Domains live ✅ |
| **Core Build** | 2-3 | EGT game launches ✅, Pragmatic game launches ✅, KYC flows tested ✅ |
| **Infrastructure** | 4-6 | Live dealer working ✅, Wallet tested ✅, Compliance enforcement live ✅ |
| **Hardening** | 7-10 | Security audit passed ✅, Load test passed ✅, Mobile + a11y tested ✅ |
| **Launch Prep** | 11-12 | License approvals ✅, Compliance sign-off ✅, Final DNS cutover ready ✅ |
| **Launch & Stabilize** | 12-14 | 99%+ uptime ✅, <500ms latency ✅, Support operational ✅, Players signing up ✅ |

---

## FINAL ROADMAP VISUALIZATION

```
WEEK 1  |████| Kickoff
WEEK 2  |████| License apps filed + Backend scaffold
WEEK 3  |████| SDK integration begins
WEEK 4  |████| Live dealer WebSocket
WEEK 5  |████| Multi-currency wallet
WEEK 6  |████| Staging environment ready
WEEK 7  |████| Security audit + Load testing
WEEK 8  |████| Mobile + A11y testing
WEEK 9  |████| Final compliance audit
WEEK 10 |████| Cutover planning
WEEK 11 |████| Production cutover (DNS swap)
WEEK 12 |████| LAUNCH 🚀
WEEK 13 |████| Post-launch support
WEEK 14 |████| Stabilization + Optimization
```

---

## NEXT IMMEDIATE ACTIONS (TODAY)

**For A.K.:**
- [ ] Nominate compliance officer (if not done) — needed by tomorrow
- [ ] Confirm all 3 decisions locked (Pragmatic YES, domains set, compliance officer TBD)

**For Team Leads:**
- [ ] Get access to novagaming repo (GitHub org access)
- [ ] Join Slack channels (#nova-backend, #nova-frontend, #nova-devops, #nova-compliance)
- [ ] Review PROJECT_STATE.md + TASKS.md + GO_LIVE_READINESS.md
- [ ] Attend kickoff meeting (Monday 9am)
- [ ] Start Week 1 tasks immediately

**For DevOps:**
- [ ] Choose hosting platform (AWS/DigitalOcean/Heroku) by Monday
- [ ] Start infrastructure provisioning (can't wait)

**For Compliance:**
- [ ] Start UKGC + BGgov application drafts (can't wait)
- [ ] Engage legal counsel this week

---

**EXECUTION STARTS NOW. PARALLEL MODE ACTIVE. 12-14 weeks to LAUNCH. 🚀**
