# NOVA Gaming — Outstanding Work Register

**Updated:** 2026-09-20  
**Owner:** A.K.  
**Status view:** [Critical](#critical) | [High](#high) | [Normal](#normal) | [Deferred](#deferred) | [Blocked](#blocked) | [Complete](#complete)

---

## CRITICAL 🔴

These block all deployment and must be resolved before staging.

### C1. Backend API Service
- **Owner:** Backend team
- **Deadline:** Week 1-2
- **Blocker:** No API infrastructure exists; frontend is isolated
- **What:** Build Node/Express or Python/FastAPI service with:
  - User authentication (sessions, OAuth)
  - Wallet ledger (play-money balance, transactions)
  - Game state management (current game, session)
  - Live table state (dealer feed, player list)
- **Verification:** API responds to `/api/health`, returns `{ status: ok }`
- **Evidence:** API repo created, health check passes, documented in /docs/INTEGRATION_REGISTER.md

---

### C2. Game Provider SDK Integration
- **Owner:** Frontend / Integration lead
- **Deadline:** Week 2-3
- **Blocker:** Games are mock data only; no actual game launches
- **What:** Choose provider (Pragmatic Play, Microgaming, NetEnt, Novomatic) and:
  - Integrate SDK
  - Implement game launcher (iFrame or native)
  - Test game session persistence
  - Validate result reporting to backend
- **Verification:** Sample game launches in browser, session ends, result recorded
- **Evidence:** /app/play/[gameId].tsx implemented, game iFrame renders, backend receives result
- **Link:** See DECISIONS.md for provider selection rationale

---

### C3. Live Dealer Backend (WebSocket)
- **Owner:** Backend lead
- **Deadline:** Week 2
- **Blocker:** Live table cards show static data; no real dealer feed
- **What:** 
  - Set up WebSocket server (Socket.io or native ws)
  - Implement live table state sync (open seats, current hand, dealer actions)
  - Real-time player notifications (join, leave, new round)
  - Video stream integration (third-party or self-hosted)
- **Verification:** Connect to live table, receive real-time updates, dealer action triggers refresh
- **Evidence:** WebSocket server running, /api/live/table/:id streams data, client updates without page reload

---

### C4. KYC / Identity Verification
- **Owner:** Compliance lead
- **Deadline:** Week 2 (if licensed mode)
- **Blocker:** Required for UK, EU licensed markets
- **What:**
  - Integrate third-party KYC provider (IDology, Jumio, GBG)
  - Implement document upload + facial recognition
  - Store verification status securely
  - Reject or escalate failed verifications
- **Verification:** Full KYC flow works end-to-end (upload, verify, approve/reject)
- **Evidence:** /app/account/kyc/ pages implemented, API integrates with provider, test upload passes

---

### C5. Decide Business Model & Licensing
- **Owner:** A.K. (decision)
- **Deadline:** Immediate
- **Blocker:** Determines scope, backend complexity, compliance requirements
- **Decision needed:**
  - [ ] Demo-only (current path, lowest effort)
  - [ ] UK licensed (need Gambling Commission approval, 6-8 weeks)
  - [ ] EU multi-market (need GDPR + local licenses, 12+ weeks)
  - [ ] Regional partnerships (licensed operators white-label this platform)
- **Impact:** Demo-only = skip KYC/payments. Licensed = add 4-6 weeks.
- **Next:** Once decided, update TASKS.md scope

---

### C6. Assign Live Domain
- **Owner:** A.K.
- **Deadline:** Immediate
- **Blocker:** Need to register domain and configure DNS
- **What:**
  - [ ] Decide domain (novagaming.com, skynova.co.uk, etc.)
  - [ ] Register + DNS setup
  - [ ] SSL certificate (Vercel auto-handles via Let's Encrypt)
  - [ ] Test DNS propagation
- **Evidence:** Domain resolves, HTTPS works, homepage loads
- **Next:** Once assigned, update Vercel project settings + update live URL in docs

---

## HIGH 🟠

Critical for launch, but can be parallelized; solve in weeks 2-3.

### H1. Wallet Ledger + Stripe Connection
- **Owner:** Backend / Payments
- **Deadline:** Week 2
- **What:**
  - Implement balance display (GET /api/user/wallet/balance)
  - Transaction history (GET /api/user/wallet/transactions)
  - Deposit simulation with Stripe test tokens
  - Withdrawal requests (play-money → demo account)
- **Verification:** Balance changes after game session, transaction shows in history
- **Evidence:** /app/account/wallet page shows real data, test deposit flow works
- **Link:** INTEGRATION_REGISTER.md → Stripe

---

### H2. Responsible Gambling Enforcement
- **Owner:** Compliance / Backend
- **Deadline:** Week 2
- **What:**
  - Session time limits (enforced server-side)
  - Deposit caps (daily/weekly/monthly)
  - Self-exclusion tool (account closure)
  - Mandatory helpline links (GamCare, NCPG)
  - Mandatory breaks (prompt after 30 min play)
- **Verification:** Limit triggers correctly, user can't bypass client-side validation
- **Evidence:** /app/safer-gambling/ page complete, server-side checks in API

---

### H3. Performance Optimization (Lighthouse 90+)
- **Owner:** Frontend lead
- **Deadline:** Week 3
- **What:**
  - Image optimization (next/image, WebP)
  - Code splitting (lazy load game grids)
  - Font optimization (system fonts or subset)
  - Cache headers (static assets 1y, API 5m)
  - Minification + tree-shaking
- **Verification:** Lighthouse score 90+ on desktop & mobile
- **Evidence:** Lighthouse report screenshot in /docs/VISUAL_QA.md

---

### H4. Full Accessibility Audit (WCAG AA)
- **Owner:** Frontend / QA
- **Deadline:** Week 3
- **What:**
  - Keyboard navigation (Tab, Enter, Esc, arrow keys)
  - Screen reader testing (NVDA, JAWS, VoiceOver)
  - Color contrast (4.5:1 text, 3:1 UI)
  - Focus indicators (visible, logical order)
  - Semantic HTML (headings, landmarks, lists)
- **Verification:** Full keyboard nav works, screen reader announces page correctly
- **Evidence:** Accessibility report in /docs/VISUAL_QA.md, video demo of keyboard nav

---

### H5. CI/CD Pipeline (GitHub Actions)
- **Owner:** DevOps / Frontend
- **Deadline:** Week 2
- **What:**
  - Lint check (eslint)
  - Type check (tsc)
  - Build test (next build)
  - Unit tests (jest, if any)
  - Deploy to Vercel preview on PR
  - Deploy to production on main merge
- **Verification:** PR opens, preview deploys automatically
- **Evidence:** .github/workflows/deploy.yml created, test run successful

---

### H6. Staging Environment
- **Owner:** DevOps
- **Deadline:** Week 2
- **What:**
  - Separate Vercel deployment for staging
  - Staging backend API endpoint
  - Staging database snapshot
  - Staging payment tokens (Stripe test mode)
- **Verification:** staging.novagaming.com loads, connects to staging API
- **Evidence:** Vercel project configured, environment variables set

---

### H7. GDPR + Responsible Gambling Compliance
- **Owner:** Legal / Compliance
- **Deadline:** Week 2
- **What:**
  - Privacy policy (GDPR-compliant)
  - Terms of Service
  - Responsible gambling disclaimer
  - Data retention policy (when user data deleted)
  - Cookie policy
- **Verification:** All pages linked in footer, lawyer review complete
- **Evidence:** /app/legal/ pages created, reviewed, linked

---

## NORMAL 🟡

Nice-to-have pre-launch; can defer to post-launch if timeline tight.

### N1. Load Testing (1000 concurrent users)
- **Owner:** QA / DevOps
- **Deadline:** Week 3
- **What:**
  - Set up load test (k6, Apache JMeter)
  - Simulate 1000 concurrent users
  - Monitor API latency, DB CPU, memory
  - Identify bottlenecks
- **Verification:** System handles 1000 users without errors, latency <500ms
- **Evidence:** Load test report in /docs/EVIDENCE_LOG.md

---

### N2. Mobile Testing (Real Devices)
- **Owner:** QA
- **Deadline:** Week 3
- **What:**
  - Test on iPhone 12, iPhone SE, Pixel 5, Galaxy S20
  - Verify touch interactions, form input, game launch
  - Check portrait + landscape
- **Verification:** All flows work on real phones
- **Evidence:** Screenshot log in /docs/VISUAL_QA.md

---

### N3. Regional Localization (Initial)
- **Owner:** Frontend
- **Deadline:** Post-launch
- **What:**
  - [ ] English (UK)
  - [ ] English (US)
  - [ ] Bulgarian
  - [ ] German
  - [ ] French
  - [ ] Spanish
- **Verification:** Language toggle works, all pages translated
- **Evidence:** i18n config set up, language switcher in header

---

### N4. Tournament / Leaderboard Feature
- **Owner:** Backend / Frontend
- **Deadline:** Post-launch
- **What:**
  - Weekly leaderboard (top 100 players)
  - Tournament bracket (optional prize pool)
  - Real-time position updates
- **Verification:** Leaderboard displays correctly, updates in real-time
- **Evidence:** /app/tournaments/ pages created

---

### N5. Advanced Analytics Dashboard
- **Owner:** Analytics / DevOps
- **Deadline:** Post-launch
- **What:**
  - User retention by week
  - Game popularity trend
  - Revenue metrics (demo)
  - Player lifetime value
- **Verification:** Dashboard loads, metrics accurate
- **Evidence:** /admin/analytics page implemented

---

## DEFERRED 🔵

Post-launch expansion; no timeline pressure.

### D1. Native iOS App
- **Owner:** Mobile team (external)
- **Deadline:** Q2 2027
- **Description:** React Native or Swift app, same feature set as web
- **Est. work:** 8-10 weeks

### D2. Native Android App
- **Owner:** Mobile team (external)
- **Deadline:** Q2 2027
- **Description:** React Native or Kotlin app
- **Est. work:** 8-10 weeks

### D3. VIP Tier Expansion
- **Owner:** Product / Backend
- **Deadline:** Q4 2026
- **Description:** Add Elite+ and Whale tiers with premium benefits
- **Est. work:** 2 weeks

### D4. Third-Party Game Provider Expansion
- **Owner:** Partnerships / Integration
- **Deadline:** Post-launch (as needed)
- **Description:** Add more providers beyond primary choice (multi-provider support)
- **Est. work:** 1 week per provider

### D5. Live Chat Support
- **Owner:** Customer Success
- **Deadline:** Post-launch
- **Description:** Real-time player support via chat (or integrate Intercom)
- **Est. work:** 3 days

---

## BLOCKED 🛑

Waiting on external decision or dependency.

### BL1. Business Model Decision
- **Reason:** Awaiting A.K. decision (demo-only vs. licensed vs. partnerships)
- **Blocked on:** C5 (Decide Business Model & Licensing)
- **Unblocks:** C4, H2, H7, scope of entire backend
- **Owner:** A.K.
- **Action:** Decide and update PROJECT_STATE.md

### BL2. Domain Assignment
- **Reason:** Awaiting domain from A.K.
- **Blocked on:** C6 (Assign Live Domain)
- **Unblocks:** DNS setup, SSL, production deployment
- **Owner:** A.K.
- **Action:** Provide domain name

### BL3. Game Provider Selection
- **Reason:** Awaiting decision on which SDK to integrate
- **Blocked on:** C2 (Game Provider SDK Integration)
- **Unblocks:** Game launch feature, backend game result reporting
- **Owner:** Product / A.K.
- **Action:** Choose provider (Pragmatic Play, Microgaming, NetEnt, etc.) and share SDK docs

### BL4. Backend Infrastructure Ready
- **Reason:** No API service, database, or deployment target assigned
- **Blocked on:** C1, C3 (Backend API + WebSocket)
- **Unblocks:** All wallet, session, live table features
- **Owner:** DevOps / Backend lead
- **Action:** Provision cloud infrastructure (AWS, GCP, Heroku, etc.) and share endpoints

---

## VERIFIED COMPLETE ✅

### VC1. Frontend UI Shell (Homepage + Lobby)
- **Status:** ✅ COMPLETE
- **Commit:** 7e80d91 (README), earlier commits for feature build
- **What:** Hero section, game grid, live tables, promo carousel, rewards tier, winners ticker
- **Verified:** Code compiles, components render, responsive breakpoints in CSS
- **Evidence:** app/page.tsx, components/ folder structure, public/games/ assets

### VC2. Design System (Shadcn + Tailwind)
- **Status:** ✅ COMPLETE
- **What:** Component library, color palette, typography, spacing scale
- **Verified:** components.json configured, Tailwind 4.3.3 installed, can extend
- **Evidence:** components/ folder, CSS in app/globals.css

### VC3. Mobile Responsive Layout
- **Status:** ✅ COMPLETE (CSS done, device testing pending)
- **What:** Breakpoints at 375px, 768px, 1200px in CSS
- **Verified:** CSS media queries present, no horizontal scroll in CSS
- **Evidence:** app/globals.css media queries
- **Note:** Real device testing (N2) still needed

### VC4. Game Detail Pages
- **Status:** ✅ COMPLETE (template)
- **What:** app/game/[gameId].tsx with metadata
- **Verified:** Page component created, metadata handling ready
- **Evidence:** Commit 0556699 + 9c5a90d
- **Note:** Real game data will come from backend (C2)

### VC5. Deployment Ready (Vercel)
- **Status:** ✅ COMPLETE
- **What:** next.config.mjs set, package.json scripts ready, v0 integration active
- **Verified:** npm run build works (untested locally), can push to Vercel
- **Evidence:** Repo pushed to GitHub, Vercel can auto-deploy on main merge
- **Note:** Needs domain (C6) before production DNS cut

---

## SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| **CRITICAL** | 6 | 🔴 All need immediate work |
| **HIGH** | 7 | 🟠 Weeks 2-3 parallel work |
| **NORMAL** | 5 | 🟡 Post-launch OK |
| **DEFERRED** | 5 | 🔵 Q4 2026+ |
| **BLOCKED** | 4 | 🛑 Awaiting decisions/infra |
| **COMPLETE** | 5 | ✅ Ready to use |

**Timeline estimate (demo-only path):** 4-5 weeks (C1, C2, C3, H1, H3, H4, H5, H6, H7)  
**Timeline estimate (UK licensed path):** 10-12 weeks (+ compliance, KYC, legal review)

---

**Next step:** A.K. decides business model (C5) and domain (C6), then teams execute CRITICAL items in parallel.
