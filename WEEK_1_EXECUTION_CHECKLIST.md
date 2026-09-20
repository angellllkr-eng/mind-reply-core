# WEEK 1 EXECUTION CHECKLIST — NOVA Gaming Parallel Launch

**Week 1 Deadline:** End of Friday  
**Status:** 🔴 IN-PROGRESS (4 workstreams active)  
**Daily Standup:** Monday-Friday 9am  

---

## WORKSTREAM 1: COMPLIANCE & LICENSING

**Owner:** Compliance Officer + Legal Counsel  
**Deadline:** Friday (apps filed)

### Monday-Tuesday: Draft Applications
- [ ] UKGC application drafted (legal counsel input)
- [ ] BGgov application drafted (local Bulgaria rep required)
- [ ] Supporting docs compiled (company formation, funding proof, compliance policy)

### Wednesday-Thursday: Review & Approval
- [ ] UK legal counsel reviews + signs off UKGC draft
- [ ] Bulgaria legal counsel reviews + BGgov draft
- [ ] Compliance officer approved both drafts

### Friday: File Applications
- [ ] UKGC application filed (target: Friday 2pm)
- [ ] BGgov application filed (target: Friday 3pm)
- [ ] Filing confirmation receipts saved
- [ ] Estimated decision dates logged (UKGC: 6-8 weeks, BGgov: 4-6 weeks)

### Parallel: KYC/AML Provider Selection
- [ ] UK KYC provider shortlist reviewed (IDology vs Jumio)
- [ ] Bulgaria KYC provider search started (BGgov-approved list)
- [ ] AML provider options reviewed (Lexis Nexis, Socure, etc.)
- [ ] Contracts requested from 2-3 options (RFP sent)

---

## WORKSTREAM 2: BACKEND INFRASTRUCTURE

**Owner:** DevOps Lead  
**Deadline:** Friday (health endpoint live)

### Monday: Platform Decision + Setup
- [ ] Hosting platform chosen (AWS / DigitalOcean / Heroku)
- [ ] AWS/DigitalOcean/Heroku account created + billing configured
- [ ] PostgreSQL provisioned (or RDS instance created)
- [ ] Redis provisioned (or ElastiCache)
- [ ] Initial database schema created

### Tuesday-Wednesday: Backend Skeleton
- [ ] Git repository initialized (or clone novagaming repo)
- [ ] Node.js / Express (or Python/FastAPI) skeleton created
- [ ] Environment variables documented (.env.example)
- [ ] Database connection verified
- [ ] GET /api/health endpoint implemented + returning `{ status: "ok" }`

### Thursday: Deployment to Staging
- [ ] Backend deployed to staging environment
- [ ] Health endpoint responds on staging URL
- [ ] CI/CD pipeline triggered (basic: lint, build, test)
- [ ] Logs accessible (CloudWatch, stdout, etc.)

### Friday: Team Handoff
- [ ] Backend skeleton code merged to main (or feature branch)
- [ ] All team members can clone + run locally
- [ ] Staging health endpoint verified by all (Slack confirmation)
- [ ] Week 2 API contracts documented (auth, wallet, game session hooks)

---

## WORKSTREAM 3: DEVOPS & DOMAINS

**Owner:** DevOps Lead (parallel with Workstream 2)  
**Deadline:** Friday (domains live with HTTPS)

### Monday-Tuesday: Domain Registration
- [ ] novagaming.co.uk registered (ResellerPro or registrar)
- [ ] novagaming.bg registered (ResellerPro or registrar)
- [ ] novagaming.com registered (ResellerPro for brand routing)
- [ ] Registrar logins secured (password manager)
- [ ] Registrant contact info confirmed

### Wednesday: Vercel Setup
- [ ] Create Vercel project: nova-gaming-uk
- [ ] Create Vercel project: nova-gaming-bg
- [ ] novagaming.co.uk added to nova-gaming-uk (Settings → Domains)
- [ ] novagaming.bg added to nova-gaming-bg (Settings → Domains)
- [ ] Vercel DNS instructions noted

### Thursday: DNS Configuration
- [ ] novagaming.co.uk: A record configured (Vercel IP)
- [ ] novagaming.co.uk: CNAME for www configured
- [ ] novagaming.bg: A record configured (Vercel IP)
- [ ] novagaming.bg: CNAME for www configured
- [ ] novagaming.com: ResellerPro routing configured (or simple CNAME)

### Friday: Verification
- [ ] DNS propagation checked (nslookup / dig)
- [ ] All three domains resolve correctly
- [ ] HTTPS verified (green lock in browser on all three)
- [ ] novagaming.co.uk loads Vercel project
- [ ] novagaming.bg loads Vercel project
- [ ] SSL certificates auto-provisioned (Vercel handles)

---

## WORKSTREAM 4: FRONTEND & LOCALIZATION

**Owner:** Frontend Lead  
**Deadline:** Friday (i18n working, branches ready)

### Monday: i18n Setup
- [ ] i18n library decision made (next-intl vs i18n-js)
- [ ] i18n package installed
- [ ] Middleware configured (auto-detect locale from URL)
- [ ] Create lib/i18n/ directory

### Tuesday-Wednesday: Translations Base
- [ ] Create app/lib/i18n/en.json (English base translations, ~500 strings)
  - UI labels (buttons, menus, forms)
  - Error messages
  - Legal disclaimers
  - Help text
- [ ] Create app/lib/i18n/bg.json (Bulgarian stubs — keys only, no translations yet)
- [ ] Language toggle component in header
- [ ] Test: Toggle between English / Bulgarian (UI strings update)

### Thursday: Currency & Localization
- [ ] Currency display component (GBP vs BGN based on locale)
- [ ] Date/time formatting per locale
- [ ] KYC flow UI skeleton created (/app/account/kyc/)
  - Document upload form (mockup, no backend yet)
  - Address input form (mockup)
  - Status display (pending/submitted/approved/rejected)

### Friday: Team Handoff
- [ ] Feature branches created:
  - feature/localization (for Bulgarian translations in Week 2)
  - feature/kyc-flow-ui (for KYC form implementation in Week 2)
  - feature/multi-currency-ui (for wallet display in Week 2)
- [ ] i18n setup merged to main
- [ ] All team members can run locally + see language toggle working
- [ ] Slack confirmation that i18n skeleton complete

---

## CROSS-TEAM COORDINATION

### API Contracts (Backend → Frontend)
By end of Week 1, Backend documents:
- [ ] Authentication endpoints (POST /api/auth/login, POST /api/auth/register)
- [ ] User profile endpoints (GET /api/user/profile, PATCH /api/user/profile)
- [ ] Wallet endpoints (GET /api/wallet/balance, POST /api/wallet/deposit)
- [ ] Game session endpoints (POST /api/games/:provider/session)
- [ ] KYC endpoints (POST /api/user/kyc-submit, GET /api/user/kyc-status)

Frontend can then:
- [ ] Build mock API clients (using documented contracts)
- [ ] Build UI flows (using mock data)
- [ ] Ready to integrate real backend in Week 2

---

## WEEK 1 SUCCESS CRITERIA (Go/No-Go Gate)

**By Friday 5pm:**

- ✅ **Compliance:** Both UKGC + BGgov applications filed (proof of filing saved)
- ✅ **Backend:** GET /api/health responding on staging (Slack screenshot)
- ✅ **Domains:** All 3 domains live with HTTPS verified (tested by team)
- ✅ **Frontend:** i18n setup complete, language toggle works (Slack demo)
- ✅ **API Contracts:** Backend documented all Week 2 dependencies
- ✅ **Code:** All code merged/branched, CI passing, no blockers for Week 2

**If all ✅:** Week 2 teams can execute without waiting.  
**If any ❌:** Escalate immediately Friday → resolve by Monday 9am.

---

## DAILY STANDUP FORMAT (9am, 15 min)

**Each lead reports (2 min max):**

1. **What was completed yesterday?** (specific deliverable)
2. **What's planned for today?** (specific deliverable)
3. **What's blocking us?** (if any, exact issue + owner to unblock)

**Example:**
> "Compliance: Yesterday UKGC draft completed. Today: Legal counsel review (due Wed). Blocker: Need local Bulgaria rep contact (A.K. to provide by tomorrow)."

---

## BLOCKERS & ESCALATION

**If a blocker arises during Week 1:**

1. **Surface immediately** (don't wait for standup)
2. **Slack team leads + A.K.** (channel: #nova-blockers)
3. **Target:** Same-day resolution or clear workaround
4. **Log in TASKS.md** under BLOCKED section

**Examples:**
- "Hosting provider account creation delayed" → A.K. provides account access
- "Bulgaria legal counsel unavailable" → Switch to backup counsel
- "DNS propagation taking >30 min" → Common; continue parallel work

---

## HANDOFF TO WEEK 2 (Friday 5pm)

**Compliance delivers:**
- [ ] UKGC application copy (filed)
- [ ] BGgov application copy (filed)
- [ ] KYC + AML provider shortlist (ready for Week 2 contracts)

**Backend delivers:**
- [ ] Backend health endpoint live
- [ ] API contracts documented (OpenAPI/Swagger format preferred)
- [ ] Database schema pushed to repo
- [ ] CI/CD pipeline basic setup

**DevOps delivers:**
- [ ] All 3 domains live + HTTPS verified
- [ ] Vercel projects created + DNS configured
- [ ] Environment variables set

**Frontend delivers:**
- [ ] i18n setup complete
- [ ] Feature branches ready for Week 2 work
- [ ] Staging UI accessible

---

## KICKOFF MEETING (Monday 9am)

**Attendees:** All 5 team leads (or representatives)

**Agenda (30 min):**
1. Review PARALLEL_EXECUTION_ROADMAP.md (5 min)
2. Assign Week 1 owners (5 min)
3. Review blockers + dependencies (10 min)
4. Confirm daily standup time + channel (5 min)
5. Q&A (5 min)

**Output:** All teams aligned, work begins immediately after.

---

## WEEK 1 RESOURCE LINKS

- **Repo:** https://github.com/angellllkr-eng/novagaming
- **Documentation:** PROJECT_STATE.md, PARALLEL_EXECUTION_ROADMAP.md, SECURITY.md
- **Deploy:** Vercel (frontend), AWS/DigitalOcean/Heroku (backend)
- **Tracking:** This checklist + 21 todos (4 Week 1 todos in-progress)

---

**WEEK 1 EXECUTION CHECKLIST LIVE. ALL WORKSTREAMS STARTING NOW. 🚀**
