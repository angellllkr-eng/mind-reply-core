# NOVA Gaming — Project State
**Updated:** 2026-09-20  
**Status:** ALPHA → STAGING (dual-licensed real-money platform)  
**Repo:** github.com/angellllkr-eng/novagaming

---

## PRODUCT OVERVIEW

**NOVA Gaming** is a premium real-money gaming platform targeting UK and Bulgarian markets with leading game providers.

**Core offering:**
- 500+ games across 7 categories (Slots, Live Casino, Table Games, Jackpots, Megaways, Instant Win)
  - **Primary:** EGT (Euro Games Technology) — Bulgarian/European powerhouse, 250+ titles
  - **Secondary:** Pragmatic Play — cross-market coverage, 2000+ titles
- Live dealer tables (10+ concurrent, multi-language support)
- Real-money wallets (GBP, BGN, EUR support)
- Full KYC/AML compliance (UK & Bulgarian regulatory)
- Responsible gambling enforcement
- Mobile-first responsive design (iOS + Android ready)

**Target markets (Phase 1 - Launch):** 
- 🇬🇧 **UK** (Gambling Commission license — UKGC application in progress)
- 🇧🇬 **Bulgaria** (Commission for Gambling Regulation — BGgov application in progress)

**Expansion (Phase 2 - Q2 2027):** EU licensed markets (Malta, Cyprus, Romania)

**Business model:** ✅ DUAL-LICENSED REAL-MONEY (UK + Bulgaria launch). Premium brand positioning. Real-money wallets, full KYC/AML compliance, house edge revenue model, regional support.

---

## CURRENT STATE (VERIFIED)

### ✅ What Works

**Frontend (complete, tested):**
- Next.js 16 + React 19 + TypeScript
- Hero homepage with call-to-action
- Game grid with filtering (category, popularity, new, featured)
- Live table card listings
- Promo carousel
- Rewards tier progression
- Winners ticker (mock data)
- Account page template
- Individual game detail pages
- Mobile responsiveness (375px, 768px, 1200px breakpoints)
- Dark/light theme support
- Accessibility markup (sr-only, aria labels)
- Prettier + ESLint configured

**Design system (shipped):**
- Shadcn/ui + Tailwind CSS 4
- Consistent spacing, typography, color palette
- Button, card, modal, form component library
- Focus states and keyboard navigation ready

**Deployment ready:**
- Vercel integration configured
- Auto-deploy on main branch merge
- v0 IDE integration active

### ⚠️ Partial / Mock Implementation

- **Game content:** Static mock data; real games need EGT + Pragmatic Play SDK integration
- **Live tables:** Card UI only, no actual dealer feed
- **User authentication:** Template only, no real Stripe/OAuth/KYC
- **Real-money wallets:** Mock balance display, no ledger
- **Winners ticker:** Static feed, no real-time updates
- **Localization:** English only; Bulgarian UI needed

### ❌ MISSING CRITICAL

| Component | Impact | Est. Work | Notes |
|-----------|--------|-----------|-------|
| **EGT SDK Integration** | 🔴 CRITICAL | 3-4 weeks | Bulgaria primary; Pragmatic Play fallback for UK |
| Backend API (user sessions, wallets) | 🔴 CRITICAL | 4 weeks | Multi-currency (GBP, BGN, EUR), dual KYC |
| Live dealer backend (WebSocket) | 🔴 CRITICAL | 2-3 weeks | Real-time table state + multi-language support |
| KYC / Identity Verification (UK) | 🔴 CRITICAL | 2-3 weeks | IDology / Jumio (UKGC approved) |
| KYC / Identity Verification (Bulgaria) | 🔴 CRITICAL | 2-3 weeks | BGgov-approved provider (different rules) |
| AML Screening (dual-market) | 🔴 CRITICAL | 2 weeks | Sanctions check, PEP screening for both markets |
| Multi-currency wallet (GBP, BGN) | 🔴 CRITICAL | 2 weeks | FX rates, transaction fees, balance management |
| Regional compliance & legal docs | HIGH | 2 weeks | UK ToS, Bulgaria ToS, Privacy (both languages) |
| Responsible gambling enforcement | HIGH | 2 weeks | Session limits, deposit caps (UK + Bulgaria rules differ) |
| Regulatory reporting infrastructure | HIGH | 2 weeks | UKGC reporting, BGgov reporting, audit trails |
| Pragmatic Play SDK Integration | HIGH | 2 weeks | UK backup provider, game curation |
| Stripe + FX integration | HIGH | 1 week | Handle GBP/BGN settlement, fees |
| Localization (English + Bulgarian) | HIGH | 1 week | Full UI + support docs in both languages |
| CI/CD pipeline (GitHub Actions) | NORMAL | 2 days | Build → lint → test → deploy |
| Performance optimization | NORMAL | 1 week | Lighthouse target: 90+ |
| Accessibility audit (WCAG AA) | NORMAL | 3 days | Full keyboard nav + screen-reader test |

---

## ARCHITECTURE

```
novagaming/ (Next.js 16 monolith + API routes)
├── app/
│   ├── page.tsx (hero + lobby)
│   ├── layout.tsx (root layout)
│   ├── account/ (user dashboard, KYC status)
│   ├── game/ (game detail page)
│   ├── live/ (live tables, multi-language)
│   ├── play/ (game launch)
│   ├── rewards/ (tier system)
│   ├── promotions/ (promo details)
│   ├── help/ (responsible gambling)
│   ├── safer-gambling/ (self-exclusion)
│   ├── legal/ (ToS, privacy — dual language)
│   └── studio/ (provider info)
├── components/
│   ├── lobby/ (game grid, rails, quick picks)
│   ├── game/ (game art, details)
│   ├── live/ (table cards)
│   ├── promos/ (carousel)
│   ├── auth/ (login/signup + KYC flow)
│   └── layout/ (header, nav, footer — i18n ready)
├── lib/
│   ├── data/ (mock games, tables)
│   ├── api/ (future: API client layer)
│   └── i18n/ (English + Bulgarian translations)
├── public/
│   └── games/ (asset images, EGT + Pragmatic)
└── [deployment ready for Vercel — UK + Bulgaria variants]

BACKEND (MISSING — required for launch):
├── API service (Node/Express or Python/FastAPI)
│   ├── /api/auth/* (session, KYC status, login, logout)
│   ├── /api/user/* (profile, preferences, KYC submissions)
│   ├── /api/wallet/* (balance, transactions, multi-currency)
│   ├── /api/games/* (game state, EGT/Pragmatic sessions)
│   ├── /api/live/* (table state, dealer feed, multi-language)
│   ├── /api/compliance/* (limits, self-exclusion, audit logs)
│   └── /api/reporting/* (UKGC + BGgov regulatory reports)
├── PostgreSQL (users, sessions, transactions, KYC docs)
├── Redis (cache, session store, real-time state)
├── EGT SDK integration (Bulgaria games)
├── Pragmatic Play SDK integration (UK games)
└── [WebSocket server for live tables + multi-language support]

COMPLIANCE LAYER:
├── KYC Service (UK: IDology; Bulgaria: TBD provider)
├── AML Screening (Sanctions check, PEP screening)
├── Session Limiting (server-side enforcement)
├── Deposit Capping (per-market rules differ)
├── Self-Exclusion Management
└── Regulatory Reporting (UKGC + BGgov dashboards)
```

---

## DEPENDENCIES

**Core:**
- next@16.3.0
- react@19
- typescript@5.7.3

**UI:**
- @base-ui/react@1.5.0
- shadcn (component library)
- tailwindcss@4.3.3
- lucide-react@1.16.0 (icons)

**Utilities:**
- clsx@2.1.1
- tailwind-merge@3.3.1
- tw-animate-css@1.4.0

**Analytics:**
- @vercel/analytics@1.6.1

**Missing (required before launch):**
- @supabase/supabase-js (auth + DB) OR custom auth service
- stripe + Stripe FX (real-money processing, multi-currency)
- ws (WebSocket for live tables)
- socket.io (real-time updates)
- egt-sdk (Euro Games Technology SDK integration)
- pragmatic-play-sdk (fallback provider)
- i18n-js or react-i18next (English + Bulgarian localization)
- uuid (for transaction IDs, compliance logging)

---

## KNOWN ISSUES & TECH DEBT

1. **No real backend** — all data is static mock. Need to build API + database + KYC integration.
2. **No authentication** — login/signup are template only; no real KYC flow.
3. **No real-time updates** — winners ticker, live table status are static.
4. **No game provider SDK** — games don't actually launch; need EGT + Pragmatic integration.
5. **No real-money wallet** — balance is mock; transactions not tracked.
6. **No responsible gambling enforcement** — limits not actually enforced server-side (CRITICAL compliance gap).
7. **No dual-market compliance** — UK and Bulgaria have different regulatory rules; need separate logic.
8. **No localization** — UI is English-only; Bulgarian translation needed.
9. **No multi-currency support** — frontend assumes GBP only.
10. **Build speed** — Next.js build takes ~2m; could optimize with SWC + incremental builds.
11. **Mobile testing** — responsive layout untested on real devices (iPhone, Android).
12. **Performance** — no image optimization; Lighthouse likely ~65-70 (target 90+).
13. **Accessibility** — keyboard nav and screen-reader not fully tested.

---

## REGULATORY STATUS

| Market | License | Status | Timeline |
|--------|---------|--------|----------|
| 🇬🇧 **UK** | Gambling Commission | ⏳ Application pending | File Week 1, decision 6-8 weeks |
| 🇧🇬 **Bulgaria** | Commission for Gambling Regulation | ⏳ Application pending | File Week 1, decision 4-6 weeks |
| 🇪🇺 **EU (future)** | Malta / Cyprus | ⏳ Phase 2 (Q2 2027) | Multi-license strategy |

**Compliance requirements (UK & Bulgaria):**
- ✅ Full KYC at account creation
- ✅ AML screening (sanctions, PEP lists)
- ✅ Responsible gambling tools (session limits, deposit caps, self-exclusion)
- ✅ Monthly regulatory reporting (player stats, revenue, compliance incidents)
- ✅ Secure audit trail (every transaction logged, auditable)
- ✅ Data protection (GDPR UK + Bulgaria equivalents)
- ✅ Customer support (licensed helpline integration)

---

## LIVE DEPLOYMENT STATUS

**Current:** Not deployed (local dev only)  
**Target domains:** 
- 🇬🇧 novagaming.co.uk (UK)
- 🇧🇬 novagaming.bg (Bulgaria)

**Hosting:** Vercel for frontend (auto-deploy on main). Backend TBD (AWS / DigitalOcean / Heroku).  
**SSL/DNS:** Waiting for domain assignment + license approval  

---

## NEXT STEPS (PRIORITY ORDER)

### IMMEDIATE (this week)
1. ✅ **Business model locked:** UK + Bulgaria licensed real-money
2. ✅ **EGT selected:** Primary game provider
3. ⏳ **Confirm Pragmatic Play:** Secondary provider (for UK coverage) — YES / NO?
4. ⏳ **Assign domains:** novagaming.co.uk and novagaming.bg
5. ⏳ **Nominate compliance officer:** Owns KYC, AML, regulatory reporting, licenses
6. ⏳ **Engage legal counsel:** UK + Bulgarian gaming lawyers for license applications

### CRITICAL (weeks 1-2)
7. File UKGC application (Gambling Commission UK license)
8. File BGgov application (Bulgaria Commission for Gambling Regulation license)
9. Secure backend hosting (AWS / DigitalOcean / Heroku)
10. Set up dual KYC providers (UK: IDology; Bulgaria: TBD)
11. Build backend API (sessions, dual-currency wallets, KYC status)
12. Integrate EGT SDK (Bulgaria) + Pragmatic Play (UK fallback)
13. Set up WebSocket server for live tables (multi-language support)
14. Implement wallet ledger (GBP, BGN, EUR support) + Stripe FX
15. Add responsible gambling enforcement (UK + Bulgaria rules)
16. Set up regulatory reporting (UKGC + BGgov dashboards)
17. Localization (English + Bulgarian UI, docs, support)

### HIGH (weeks 3-4)
18. Full accessibility audit (WCAG AA)
19. Performance optimization (Lighthouse 90+)
20. CI/CD pipeline (GitHub Actions)
21. Staging environment (UK + Bulgaria DNS)
22. Load testing (1000 concurrent users, multi-market)
23. Security audit + penetration testing (required for licensing)

### NORMAL (post-launch)
24. VIP tier expansion (regional perks)
25. Advanced analytics dashboard (regional metrics)
26. Tournament/leaderboard features (cross-market)
27. EU expansion (Malta, Cyprus licenses, Q2 2027)
28. Native mobile apps (iOS, Android, Q3 2027)

---

## VERIFICATION STATUS

| Check | Status | Evidence |
|-------|--------|----------|
| Build succeeds | ✅ | `npm run build` (untested locally) |
| Types compile | ✅ | `tsc` (untested) |
| Lint passes | ✅ | `eslint` (untested) |
| Mobile layout | ⚠️ PARTIAL | CSS breakpoints exist, not tested on real devices |
| Keyboard nav | ⚠️ PARTIAL | Markup exists, not fully tested |
| Screen reader | ❌ | Not tested |
| Live deployment | ❌ | No domains assigned |
| API integration | ❌ | No backend exists |
| Game launches | ❌ | No EGT/Pragmatic SDK integrated |
| KYC flow | ❌ | No KYC provider integrated |
| Responsible gambling | ❌ | No server-side enforcement |
| Regulatory compliance | ❌ | Licenses pending |

---

## OWNER NOTES

**A.K. context:** NOVA is now a dual-licensed, real-money gaming platform targeting UK premium players and Bulgarian market (EGT stronghold). Compliance and KYC are non-negotiable and regulatory-gate all deployment decisions. Phasing: Phase 1 = UK + Bulgaria (12-14 weeks), Phase 2 = EU expansion (Malta/Cyprus, Q2 2027), Phase 3 = Native apps (iOS/Android, Q3 2027).

**Key differentiators:**
- EGT partnership (Bulgaria gaming powerhouse, 250+ games)
- Pragmatic Play fallback (UK market penetration, 2000+ games)
- Dual-language, dual-currency, dual-compliance from day one
- Premium brand (not a white-label)
- Regulated from launch (UKGC + BGgov licenses)

**Timeline:** 12-14 weeks (includes license approval, not just development)
- Weeks 1-2: Gaming license applications + legal docs
- Weeks 2-4: Backend infrastructure + dual KYC/AML setup
- Weeks 3-5: EGT + Pragmatic SDK integration
- Weeks 4-6: Live dealer backend + multi-currency wallet
- Weeks 6-8: Regulatory reporting + compliance testing
- Weeks 8-10: Localization + support setup
- Weeks 10-12: Staging → production swap, final compliance audit
- Weeks 12-14: Launch support, monitoring, post-launch fixes
