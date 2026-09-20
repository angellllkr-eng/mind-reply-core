# NOVA Gaming — Domain Strategy

**Decision Date:** 2026-09-20  
**Owner:** A.K.  
**Status:** ✅ APPROVED

---

## DOMAIN ASSIGNMENTS (LOCKED)

### Primary Domains (Launch)

| Market | Domain | Purpose | SSL |
|--------|--------|---------|-----|
| 🇬🇧 **UK** | novagaming.co.uk | UK-facing platform, Gambling Commission branding | Vercel auto-handle |
| 🇧🇬 **Bulgaria** | novagaming.bg | Bulgaria-facing platform, BGgov compliance | Vercel auto-handle |
| 🌐 **Global** | novagaming.com | Brand + SEO anchor (ResellerPro routing) | Vercel auto-handle |

### Domain Routing Logic

```
novagaming.com (ResellerPro Proxy)
  ├─ GeoIP: UK → novagaming.co.uk (Vercel UK)
  ├─ GeoIP: Bulgaria → novagaming.bg (Vercel BG)
  └─ Other → novagaming.co.uk (fallback) or info page

novagaming.co.uk (Vercel UK Instance)
  ├─ Backend: shared or regional
  ├─ i18n: English (UK)
  ├─ Currency: GBP
  └─ Compliance: UKGC #TBD

novagaming.bg (Vercel Bulgaria Instance)
  ├─ Backend: shared or regional
  ├─ i18n: Bulgarian
  ├─ Currency: BGN
  └─ Compliance: BGgov #TBD
```

---

## DNS CONFIGURATION

### novagaming.co.uk (UK Primary)

```
A Record:           @ → Vercel IP (auto-configured)
CNAME Record:       www → cname.vercel-dns.com
MX Record:          @ → mail server (Google Workspace or custom)
TTL:                3600 seconds
SSL:                Let's Encrypt (auto via Vercel)
```

### novagaming.bg (Bulgaria Primary)

```
A Record:           @ → Vercel IP (auto-configured)
CNAME Record:       www → cname.vercel-dns.com
TTL:                3600 seconds
SSL:                Let's Encrypt (auto via Vercel)
```

### novagaming.com (Brand/Proxy)

```
Option A (GeoIP Routing via ResellerPro):
  A Record:         @ → ResellerPro DNS proxy IP
  Routing:          GeoIP detection → regional domain
  TTL:              3600 seconds

Option B (Simple CNAME Redirect):
  CNAME Record:     @ → novagaming.co.uk
  TTL:              3600 seconds
```

---

## VERCEL CONFIGURATION

### Project 1: nova-gaming-uk

```
Domain:             novagaming.co.uk
Environment:        production
Branch:             main
Auto-deploy:        on merge
Analytics:          Vercel + Plausible
Environment vars:   NEXT_PUBLIC_MARKET=UK, NEXT_PUBLIC_CURRENCY=GBP
```

### Project 2: nova-gaming-bg

```
Domain:             novagaming.bg
Environment:        production
Branch:             main
Auto-deploy:        on merge
Analytics:          Vercel + Plausible
Environment vars:   NEXT_PUBLIC_MARKET=BG, NEXT_PUBLIC_CURRENCY=BGN
```

### OR Single Project (Multi-Domain)

```
Domain 1:           novagaming.co.uk → Production
Domain 2:           novagaming.bg → Production
Middleware:         Detect domain → set locale/currency
Environment vars:   NEXT_PUBLIC_MARKET=*auto-detect*
```

---

## PHASED ROLLOUT TIMELINE

### Week 2-3: Staging

- staging.novagaming.co.uk (Vercel preview)
- staging.novagaming.bg (Vercel preview)
- Verify KYC flow, wallet, games, live tables
- Load testing against staging domains

### Week 10-12: Production (Pending License Approval)

- novagaming.co.uk → LIVE (UK instance)
- novagaming.bg → LIVE (Bulgaria instance)
- novagaming.com → GeoIP routing (or info page)
- DNS cutover from staging to production

### Post-Launch: Monitoring

- CloudFlare or similar for DDoS protection (optional)
- Health checks on both domains (uptime monitoring)
- SSL cert auto-renewal (Vercel handles)

---

## COMPLIANCE REQUIREMENTS

### UKGC (UK Gambling Commission)

- Domain: novagaming.co.uk (required for licensing)
- Footer text: "Licence: UKGC-[NUMBER]"
- ToS link visible in footer
- Responsible gambling helpline (GamCare): +44 0808 8020 133
- Privacy policy (UK GDPR format)

### BGgov (Bulgaria Gambling Regulator)

- Domain: novagaming.bg (preferred, shows local presence)
- Footer text: "License: BGgov-[NUMBER]"
- Bulgarian language UI (via i18n)
- Bulgaria GDPR equivalent compliance
- Local representative contact

### Brand (novagaming.com)

- SEO anchor (high authority domain)
- GeoIP routing to regional sites
- Or static brand page (no gaming content)

---

## REGISTRATION CHECKLIST

**By end of Week 1:**

- [ ] novagaming.co.uk registered (ResellerPro or UK registrar)
- [ ] novagaming.bg registered (ResellerPro or Bulgaria registrar)
- [ ] novagaming.com registered (ResellerPro — use for proxy/SEO)
- [ ] All three domains added to Vercel (Settings → Domains)
- [ ] DNS records configured (A, CNAME records pointing to Vercel)
- [ ] DNS propagation verified (nslookup / dig / online checker)
- [ ] SSL certificates auto-provisioned (Vercel handles)
- [ ] HTTPS verified on all three (green 🔒 in browser)

**Example DNS Lookup Verification:**

```bash
nslookup novagaming.co.uk
# Should show Vercel IP

nslookup novagaming.bg
# Should show Vercel IP

nslookup novagaming.com
# Should show ResellerPro IP (or Vercel if using CNAME)
```

---

## SUCCESS CRITERIA (Go-Live Gate)

- ✅ novagaming.co.uk resolves to UK Vercel instance
- ✅ novagaming.bg resolves to Bulgaria Vercel instance
- ✅ novagaming.com GeoIP routes correctly (test with VPN)
- ✅ HTTPS working on all three (no cert warnings)
- ✅ DNS propagation complete (verified via nslookup)
- ✅ No mixed content warnings (all assets over HTTPS)
- ✅ Footer displays correct license #
- ✅ Responsive layout works on mobile (all three domains)
- ✅ Games load correctly on both regional sites
- ✅ KYC flow works region-specific (UK form vs. BG form)

---

## NEXT ACTIONS

**This Week:**
1. Register all three domains (coordinate with ResellerPro)
2. Add to Vercel projects (Settings → Domains)
3. Configure DNS records (follows Vercel setup guide)
4. Verify DNS propagation (15-60 minutes typically)
5. Test HTTPS (curl or browser)

**Week 2:**
1. Configure staging domains (staging.novagaming.co.uk, staging.novagaming.bg)
2. Load test against staging URLs
3. Verify regional routing works (GeoIP or manual testing)

**Week 10-12:**
1. Final DNS verification before production cutover
2. Production Vercel projects configured with live domains
3. Failover plan documented (if one domain has issues)
4. 24/7 support on-call for launch day

---

## DOMAIN DECISION LOCKED ✅

**Approved domains:**
- novagaming.co.uk (UK)
- novagaming.bg (Bulgaria)
- novagaming.com (Brand + ResellerPro routing)

**ResellerPro Integration:** novagaming.com routes via ResellerPro registry infrastructure (GeoIP detection or simple redirect).

**Next:** Teams register domains → Vercel configuration → DNS setup → Week 1 infrastructure ready.
