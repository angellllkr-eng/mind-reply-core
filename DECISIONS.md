# NOVA Gaming — Technical & Business Decisions

**Format:** Decision → Date → Owner → Alternatives considered → Rationale → Impact → Reversibility

---

## D001: Frontend Framework Choice (Next.js 16)

**Decision:** Use Next.js 16 + React 19 as frontend framework  
**Date:** 2026-09-10  
**Owner:** A.K. / Product  
**Status:** ACTIVE

**Alternatives considered:**
1. ✓ **Next.js 16 + React 19** (chosen)
   - Pro: Fast refresh, built-in API routes, Vercel deployment, SSR/SSG, App Router
   - Con: Locked to Vercel ecosystem (though not exclusive)
2. Remix (full-stack but heavier setup, less gaming-specific examples)
3. SvelteKit (smaller bundle, newer, fewer libraries for gaming UI)
4. Astro (static-first, not ideal for real-time game updates)

**Rationale:** Next.js 16 has strong TypeScript support, extensive component library ecosystem (shadcn/ui), and proven track record for gaming platforms (Sky Vegas uses similar stack). Vercel deployment is fast, allows Stripe + third-party integrations easily.

**Impact:** 
- Committed to React ecosystem for game UI
- Vercel hosting recommended (though not required)
- Future refactor to another framework would require rewriting ~60% of frontend

**Reversibility:** Moderate. UI layer is decoupled from backend; could rebuild UI in another framework if needed (8-12 week effort).

**Monitoring:** Performance metrics, build time, bundle size. If Lighthouse drops below 85, investigate code-splitting opportunities.

---

## D002: Game Provider SDK Selection (TBD)

**Decision:** Pending. Choose between Pragmatic Play, Microgaming, NetEnt, or Novomatic  
**Date:** 2026-09-20  
**Owner:** A.K. / Product  
**Status:** BLOCKED (awaiting decision)

**Alternatives:**
1. **Pragmatic Play** (28% UK market share, strong mobile, ~2000 games)
   - Pro: Largest mobile portfolio, auto-launch iFrame, good support
   - Con: Higher rev share (typically 25-35%), requires licensing agreement
2. **Microgaming** (15% UK market share, oldest provider, ~850 games)
   - Pro: Established, MobileConnect launch system, loyalty integrations
   - Con: Older game aesthetic, slower to launch mobile titles
3. **NetEnt** (owned by Evolution, strong UK presence, ~250 games)
   - Pro: High-quality graphics, strong responsible gambling tools
   - Con: Smaller portfolio, premium rev share (30-40%)
4. **Novomatic / Greentube** (smaller but growing, EU strong)
   - Pro: European focus, lower rev share sometimes
   - Con: Smaller portfolio, less UK experience
5. **In-house indie games** (low cost, complete control)
   - Pro: Full control, no rev share, unique brand
   - Con: Development time (6-12 weeks per game), risky for launch (need 20+ games min)

**Rationale:** TBD. Decision depends on:
- Target market (UK vs. EU vs. global)
- Budget for licensing + rev share
- Time to market (Pragmatic Play fastest, in-house slowest)
- Risk tolerance (established provider = safe, in-house = risky but unique)

**Impact:**
- Provider choice locks technical integration (iFrame API, session tokens, result reporting)
- Rev share affects unit economics (demo doesn't matter, but real-money licensing does)
- Time to market: Pragmatic Play (2 weeks integration), in-house (10+ weeks)

**Reversibility:** Hard. Switching providers mid-launch requires API rewrite (~4 weeks). Best to choose once and commit for 12+ months.

**Decision needed by:** Week 1 of development (blocks C2 task)

---

## D003: Backend Architecture (API + Database)

**Decision:** Pending. Choose between monolith, serverless, or microservices  
**Date:** 2026-09-20  
**Owner:** Backend lead  
**Status:** BLOCKED (awaiting decision)

**Alternatives:**
1. **Monolith (Node/Express + PostgreSQL)** — recommended for v1
   - Pro: Single codebase, easier debugging, simpler deployment
   - Con: Vertical scaling only, single point of failure
2. **Serverless (AWS Lambda + DynamoDB / Firestore)**
   - Pro: Auto-scales, pay-per-request, fast cold start improvements
   - Con: Harder debugging, DynamoDB can be pricey at scale, vendor lock-in
3. **Microservices (separate auth, wallet, game, live-table services)**
   - Pro: Independent scaling, loose coupling
   - Con: Operational complexity, latency between services, data consistency challenges
4. **Hybrid (Next.js API routes + Supabase)**
   - Pro: Simple to start, Supabase handles auth + DB
   - Con: Depends on Supabase uptime, limited control over performance

**Recommendation:** **Start with Node/Express + PostgreSQL monolith** for v1 (simplicity + time-to-market). Plan for microservices split if concurrent users exceed 5000 (estimated Q2 2027).

**Impact:**
- Monolith choice: Can iterate fast, but need careful performance tuning as users grow
- Serverless choice: Higher AWS costs initially, but better scaling story
- Microservices choice: 12+ weeks extra engineering, not recommended for launch

**Reversibility:** Moderate. Move from monolith to microservices takes 6-8 weeks of refactoring but is possible.

**Decision needed by:** Week 1 of backend development

---

## D004: Real-Money Licensing Scope

**Decision:** Pending. Choose between demo-only, UK licensed, or EU multi-market  
**Date:** 2026-09-20  
**Owner:** A.K. (decision) + Compliance  
**Status:** BLOCKED (awaiting A.K. decision)

**Alternatives:**
1. **Demo-only (play-money only)** — recommended for MVP
   - Pro: No licensing required, fast to market (4-5 weeks), no KYC/AML overhead
   - Con: Limited revenue opportunity (advertising, in-app cosmetics only), harder to scale
2. **UK licensed (Gambling Commission)**
   - Pro: Huge market, established license holders, licensing path clear
   - Con: Expensive ($20-50k initial + ongoing compliance), 6-8 week approval process, strict responsible gambling rules
3. **EU multi-market (multiple licenses)**
   - Pro: Largest market opportunity, diverse revenue sources
   - Con: Complex compliance (27 member states), expensive ($100k+ licensing), 12+ weeks setup
4. **Whitelabel / partnership model (licensed operator runs platform)**
   - Pro: Operator handles licensing, we get rev share (15-30%)
   - Con: No direct control, lower margin, dependent on operator

**Recommendation:** **Phase 1: Demo-only MVP** (4-5 weeks). If user traction strong, **Phase 2: UK licensed** (6-8 weeks later).

**Impact:**
- Demo-only: Skip KYC (C4), AML (special section needed), reduce responsible gambling scope (still need helpline links)
- UK licensed: Add 4-6 weeks to timeline, need Compliance officer, need external legal review
- EU multi-market: Add 12+ weeks, need regional teams or outsource compliance

**Decision needed by:** Immediate (blocks scope for entire project)

---

## D005: Hosting & Deployment Strategy

**Decision:** Vercel for frontend, TBD for backend  
**Date:** 2026-09-20  
**Owner:** DevOps  
**Status:** PARTIAL (frontend decided, backend pending)

**Frontend (DECIDED: Vercel)**
- Pro: Zero-config Next.js deployment, auto-scaling, global CDN, integrates with GitHub
- Con: Vendor lock-in, can't run arbitrary Docker, edge runtime limits
- Alternative: AWS S3 + CloudFront (~same cost, more complex setup)

**Backend (PENDING decision between):**
1. **Heroku** (simplest, $50-200/month for small scale)
   - Pro: Easy deploy, built-in PostgreSQL, great for small teams
   - Con: Less control, becomes expensive at scale
2. **AWS (EC2 + RDS + ElastiCache)** (most control, $200-1000/month)
   - Pro: Auto-scaling, fine-grained control, large ecosystem
   - Con: Operational complexity, need DevOps expertise
3. **DigitalOcean (App Platform)** (middle ground, $100-500/month)
   - Pro: Simple to start, reasonable pricing, good support
   - Con: Smaller ecosystem than AWS, fewer integrations
4. **GCP (App Engine + Cloud SQL)** (~similar to AWS)
   - Pro: Google infrastructure, good for AI/ML integrations (future)
   - Con: Complex pricing, steeper learning curve

**Recommendation:** **Heroku for MVP** (simplest, fastest), plan migration to AWS if scale demands.

**Impact:**
- Heroku: Fast onboarding, easier debugging, but cost becomes issue if revenue low
- AWS: More operational burden, but better unit economics at scale
- DigitalOcean: Good middle ground

**Decision needed by:** Week 1 of backend development

---

## D006: Live Table Integration (Dealer Feed)

**Decision:** Pending. Choose between third-party provider vs. in-house WebSocket  
**Date:** 2026-09-20  
**Owner:** Backend lead  
**Status:** BLOCKED (awaiting decision)

**Alternatives:**
1. **Third-party live dealer provider (Kambi, Sportech, CasinoModule)**
   - Pro: Dealers + video already managed, white-label ready, compliance handled
   - Con: Expensive (typically $5-50k setup + rev share), less control, slower iteration
2. **In-house WebSocket (stream video from our own dealers, or third-party video)**
   - Pro: Full control, lower cost, can iterate quickly
   - Con: Operational complexity (manage video infra, dealer scheduling), compliance responsibility
3. **Mock live tables (no actual dealers, just animations)**
   - Pro: Simplest to build (1-2 weeks), good for MVP/demo
   - Con: Not authentic, players will see through it quickly

**Recommendation:** **Start with mock live tables (C3 in TASKS.md) for MVP**. Plan integration with third-party provider if real-money licensed (adds 2-3 weeks to backend).

**Impact:**
- Mock: Fast iteration, good for demo/learning, but not production-ready for real money
- Third-party: More legitimate, but locked into provider contract
- In-house: Most control, but highest operational risk

**Decision needed by:** Week 2 of development (if taking third-party route)

---

## D007: Responsible Gambling Enforcement

**Decision:** Mandatory for all markets; server-side enforcement  
**Date:** 2026-09-20  
**Owner:** Compliance + Backend  
**Status:** ACTIVE (non-negotiable)

**Mechanisms:**
- Session time limits (30 min auto-logout)
- Deposit caps ($100/day play-money demo, real limits if licensed)
- Mandatory break prompts (every 30 min)
- Self-exclusion tool (user can lock account)
- Helpline links (GamCare, NCPG)
- Net loss warnings

**Enforcement:** All limits enforced server-side. Client-side validation for UX only; server rejects requests violating limits.

**Rationale:** Required for UK Gambling Commission licensing (if licensed route taken), best practice even for demo-only. Shows player safety is priority.

**Impact:** Adds ~1 week to backend development (H2 in TASKS.md).

**Reversibility:** Easy. Can adjust thresholds (session limit, deposit cap) without code changes.

---

## D008: Payment Processing (Play-Money Wallet)

**Decision:** Stripe for initial implementation; consider moving to custom ledger if scaling  
**Date:** 2026-09-20  
**Owner:** Backend / Payments  
**Status:** PENDING (tech debt to monitor)

**Alternatives:**
1. **Stripe** (recommended for MVP)
   - Pro: PCI-compliant, handles everything, easy refunds, good for play-money
   - Con: 2.2% + $0.30 per transaction, not ideal for micro-transactions
2. **Custom wallet ledger (PostgreSQL table)**
   - Pro: Full control, no fees, can optimize for micro-transactions
   - Con: Must build PCI-compliance ourselves (risky), more code to maintain
3. **Hybrid** (Stripe for real money if licensed, custom ledger for demo play-money)
   - Pro: Best of both (simple for real money, optimized for demo)
   - Con: More operational complexity

**Recommendation:** **Stripe for v1** (simplicity + trust). Migrate to custom ledger if volume demands (estimated at 100k+ daily transactions).

**Impact:**
- Stripe: ~2% transaction fees, but zero compliance risk
- Custom: Save fees but add compliance burden

**Decision needed by:** Week 2 of backend development

---

## D009: Analytics & Tracking

**Decision:** Plausible or Posthog (privacy-first)  
**Date:** 2026-09-20  
**Owner:** Analytics / Product  
**Status:** PENDING

**Why privacy-first:** Gaming platforms are heavily scrutinized for user privacy. Avoid Google Analytics (overkill, data-heavy).

**Alternatives:**
1. **Plausible** (privacy-first, GDPR-compliant)
   - Pro: Simple, no cookies, GDPR OK, fast
   - Con: Limited custom events, $23/month
2. **Posthog** (open-source, self-hosted or cloud)
   - Pro: Full control, rich event tracking, free tier available
   - Con: More complex setup, bigger data footprint
3. **Mixpanel** (event-focused)
   - Pro: Excellent funnel analysis
   - Con: Higher cost, less privacy-focused
4. **In-house tracking (Postgres + custom API)**
   - Pro: Full control, no third-party dependency
   - Con: More engineering effort, must handle GDPR compliance

**Recommendation:** **Plausible for v1** (simple, privacy-respecting, cost-effective).

**Data tracked:** Game starts, game ends, category views, signup funnel (no PII).
**Data NOT tracked:** User ID, email, balance, wagers (too sensitive).

---

## D010: Localization Roadmap

**Decision:** English (UK) first; add Bulgarian, German, French post-launch  
**Date:** 2026-09-20  
**Owner:** Product / Frontend  
**Status:** ACTIVE (post-launch)

**Phase 1 (MVP):** English (UK) only  
**Phase 2 (Q4 2026):** Add Bulgarian (target Bulgaria market)  
**Phase 3 (Q1 2027):** Add German, French, Spanish, Italian  

**Tech:** i18n-js (Next.js native support) or Crowdin (translation management).

**Impact:** Each language adds ~1 week of work (translation + testing).

---

## DECISION LOG (Historical)

| Decision | Date | Owner | Status |
|----------|------|-------|--------|
| Use Next.js 16 | 2026-09-10 | A.K. | ✅ ACTIVE |
| Vercel for frontend | 2026-09-10 | DevOps | ✅ ACTIVE |
| Shadcn/ui for components | 2026-09-10 | Frontend | ✅ ACTIVE |
| Demo-only for MVP (pending confirmation) | 2026-09-20 | A.K. | ⏳ PENDING |
| Backend tech stack (TBD) | 2026-09-20 | Backend lead | ⏳ PENDING |
| Game provider (TBD) | 2026-09-20 | A.K. | ⏳ PENDING |
| Domain name (TBD) | 2026-09-20 | A.K. | ⏳ PENDING |

---

**Next step:** A.K. makes decisions on D004 (licensing), D002 (game provider), C6 (domain). Unblock entire roadmap.

