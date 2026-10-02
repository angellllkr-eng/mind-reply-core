# Cross-Org Artifact Transfer & Platform Migration Plan

**Status:** Comprehensive transfer mapping complete  
**Direction:** Personal ↔ Brand Org bidirectional movement  
**Goal:** Consolidate useful artifacts into canonical repos  

---

## 1. AUDIT FINDINGS

### From Personal Account (angellllkr-eng)

**In mind-reply-core (Canonical):**
- ✅ Complete monorepo structure (apps, services, packages, infrastructure)
- ✅ All A11-K surfaces merged (a11k, chat, nexus, forge, studio)
- ✅ Docker & docker-compose (dev + prod)
- ✅ CI/CD workflows (.github/workflows/)
- ✅ Core documentation (CONSOLIDATION_REPORT, ESTATE.yaml, CANONICAL-SOURCE)
- ✅ Phone-first SaaS starter template
- ✅ All modern deps (Next.js 16.3.6, React 19.3.0, Tailwind 4.3.2)

### From Brand Organization (Mind-Reply)

**In A11-K repo (Rich operational content):**
- ✅ Complete A11-K brand identity (BRAND.md, BRAND_SYSTEM_2026.md, CANONICAL-ESTATE.md)
- ✅ HTML static pages (30+ pages for brand positioning)
- ✅ Extensive documentation (DOCKER_AGENT_INTEGRATION.md, BRAND-RELEASE-REGISTRY.md, PRODUCT_IDENTITY.md)
- ✅ Docker setup (.dockerignore, Dockerfile, docker-compose.yml + .prod.yml)
- ✅ Google Cloud integration (cloudbuild.yaml, wrangler.toml)
- ✅ Revenue & operational policy (revenue-action-policy.json, service.yaml)
- ✅ Config & lib directories (advanced setup)

**In resellerpro repo:**
- ✅ Complete standalone platform (full Next.js + Prisma + Docker)
- ✅ Deployment guides (DEPLOYMENT_GUIDE.md, SOURCE_SYNC_MANIFEST, TRANSFER_EXECUTION)
- ✅ Advanced tooling (docker-compose.yml, Dockerfile, deploy.sh)
- ✅ Test suite setup (jest.config.cjs, tests/ directory)
- ✅ Operational docs (STATUS_TRUTH.md, RESELLERPRO_COMPLETE.md, AGENTS.md)
- ✅ Middleware & auth (middleware.ts, full Next.js setup)

**In mind-reply-app repo:**
- ✅ Billing & monetization docs (note-billing.md, profit-forge-accountant.md)
- ✅ Setup automation (setup-all-brands-final.js)
- ✅ Sales structure doc (SELL-STRUCTURE.md)
- ✅ Vercel & CloudFlare config (vercel.json, wrangler.toml)

**In replycontrol repo:**
- ✅ Agent integration docs (AGENTS.md)
- ✅ Frontier docs (cutting-edge work)
- ✅ Production deployment config
- ✅ Vercel optimized setup

---

## 2. TRANSFER MATRIX (What moves where)

### 🔵 PERSONAL → PERSONAL (consolidate within account)

These stay in `mindreply-platform` (renamed from mind-reply-core):

```
mindreply-platform/
├── KEEP: Complete app ecosystem
├── KEEP: Docker setup (both dev + prod optimized)
├── KEEP: Core CI/CD pipelines
├── KEEP: All brand monorepo structure
└── ADD FROM BRAND: (see section 3)
```

### 🟢 BRAND ORG → PERSONAL (move strategic files)

**From Mind-Reply/A11-K to mindreply-platform/apps/a11k/:**
- BRAND_SYSTEM_2026.md → docs/A11K_BRAND_SYSTEM.md
- CANONICAL-ESTATE.md → docs/A11K_ESTATE.md
- BRAND-RELEASE-REGISTRY.md → docs/A11K_RELEASE_REGISTRY.md
- DOCKER_AGENT_INTEGRATION.md → docs/DOCKER_AGENT_INTEGRATION.md
- docker-compose.yml (A11-K version) → merge best practices
- service.yaml (revenue policy) → config/a11k-service-policy.yaml
- revenue-action-policy.json → config/a11k-revenue-policy.json
- All *.html brand pages → apps/a11k/public/pages/
- mindreply.css, mindreply.js, taste.css → apps/a11k/styles/ (reference)
- All brand identity files (Brushworks/, NOVA_PRIME/, etc.) → apps/a11k/brand/

**From Mind-Reply/resellerpro to mindreply-platform/apps/reseller-platform/:**
- DEPLOYMENT_GUIDE.md → docs/RESELLER_DEPLOYMENT.md
- STATUS_TRUTH.md → docs/RESELLER_STATUS.md
- AGENTS.md → docs/RESELLER_AGENTS.md
- middleware.ts (auth pattern) → reference for shared auth service
- docker-compose.yml (with postgres/redis config) → merge into root
- deploy.sh (deployment automation) → scripts/deploy-reseller.sh
- Dockerfile (Next.js production optimized) → reference
- All src/ app code → merge into apps/reseller-platform/src/
- prisma/ schema → packages/shared/prisma/ (if not already there)
- tests/ → tests/reseller/

**From Mind-Reply/mind-reply-app to mindreply-platform/:**
- note-billing.md → docs/BILLING_SYSTEM.md
- profit-forge-accountant.md → docs/ACCOUNTING_AUTOMATION.md
- SELL-STRUCTURE.md → docs/GTM_SELL_STRUCTURE.md
- setup-all-brands-final.js → scripts/setup-brands.js
- vercel.json (optimizations) → reference for root vercel.json
- wrangler.toml → infrastructure/cloudflare/wrangler.toml

**From Mind-Reply/replycontrol to mindreply-platform/apps/web-replycontrol/:**
- AGENTS.md → docs/REPLYCONTROL_AGENTS.md
- FRONTIER.md → docs/FRONTIER_FEATURES.md
- vercel.json (optimized) → reference
- Any unique routing or deployment patterns → docs/

### 🔴 PERSONAL → BRAND (mirror for public consumption)

**Create in Mind-Reply org (if maintaining brand separation):**
- Mind-Reply/mindreply-platform-public (mirror of canonical)
  - Auto-synced from angellllkr-eng/mindreply-platform
  - Public-facing version with brand docs
  - Deployment config for mindreply.com

**Or consolidate everything into:**
- Mind-Reply/mindreply-platform (single source)
  - Keep it as canonical for entire brand
  - Private Mind-Reply/mind-reply-app becomes archive

---

## 3. EXECUTION PLAN (By Repository)

### PHASE 1: Prepare mindreply-platform (Personal)

**Step 1: Create new directories**
```bash
cd mindreply-platform
mkdir -p apps/reseller-platform/src
mkdir -p config/policies
mkdir -p docs/brand
mkdir -p docs/reseller
mkdir -p infrastructure/cloudflare
mkdir -p scripts/deploy
```

**Step 2: Transfer A11-K brand docs**
```bash
# From Mind-Reply/A11-K
cp BRAND_SYSTEM_2026.md → mindreply-platform/docs/A11K_BRAND_SYSTEM.md
cp CANONICAL-ESTATE.md → mindreply-platform/docs/A11K_ESTATE.md
cp BRAND-RELEASE-REGISTRY.md → mindreply-platform/docs/A11K_RELEASE_REGISTRY.md
cp DOCKER_AGENT_INTEGRATION.md → mindreply-platform/docs/DOCKER_AGENT_INTEGRATION.md
cp service.yaml → mindreply-platform/config/a11k-service-policy.yaml
cp revenue-action-policy.json → mindreply-platform/config/a11k-revenue-policy.json

# Brand pages (HTML)
cp *.html → mindreply-platform/apps/a11k/public/pages/  (30+ files)

# Styles
cp mindreply.css → mindreply-platform/apps/a11k/styles/brand.css
cp taste.css → mindreply-platform/apps/a11k/styles/taste.css

# Brand identity folders
cp -r Brushworks/ → mindreply-platform/apps/a11k/brand/brushworks
cp -r NOVA_PRIME/ → mindreply-platform/apps/a11k/brand/nova-prime
cp -r Unapologetic/ → mindreply-platform/apps/a11k/brand/unapologetic
```

**Step 3: Transfer Reseller platform**
```bash
# From Mind-Reply/resellerpro
# Copy entire src/ structure
cp -r resellerpro/src/* → mindreply-platform/apps/reseller-platform/src/
cp -r resellerpro/prisma/ → mindreply-platform/packages/shared/prisma/ (if needed)
cp -r resellerpro/tests/ → mindreply-platform/tests/reseller/

# Docs
cp DEPLOYMENT_GUIDE.md → mindreply-platform/docs/RESELLER_DEPLOYMENT.md
cp STATUS_TRUTH.md → mindreply-platform/docs/RESELLER_STATUS.md
cp AGENTS.md → mindreply-platform/docs/RESELLER_AGENTS.md
cp RESELLERPRO_COMPLETE.md → mindreply-platform/docs/RESELLER_COMPLETE.md

# Config & deployment
cp deploy.sh → mindreply-platform/scripts/deploy-reseller.sh
cp middleware.ts → mindreply-platform/apps/reseller-platform/middleware.ts
cp next.config.ts → mindreply-platform/apps/reseller-platform/next.config.ts
cp Dockerfile → mindreply-platform/apps/reseller-platform/Dockerfile

# Docker config (merge best practices)
# Take postgres/redis config from resellerpro/docker-compose.yml
# Merge into mindreply-platform/docker-compose.yml
```

**Step 4: Transfer MindReply app docs**
```bash
# From Mind-Reply/mind-reply-app
cp note-billing.md → mindreply-platform/docs/BILLING_SYSTEM.md
cp profit-forge-accountant.md → mindreply-platform/docs/ACCOUNTING_AUTOMATION.md
cp SELL-STRUCTURE.md → mindreply-platform/docs/GTM_SELL_STRUCTURE.md
cp setup-all-brands-final.js → mindreply-platform/scripts/setup-brands.js

# Vercel optimizations
# Review vercel.json, merge build optimizations into root vercel.json
```

**Step 5: Update package.json**
```bash
# In mindreply-platform/package.json
# Update workspace to include reseller-platform:
# "apps/reseller-platform"

# Add shared scripts
"reseller:dev": "cd apps/reseller-platform && npm run dev"
"reseller:build": "cd apps/reseller-platform && npm run build"
"setup-brands": "tsx scripts/setup-brands.js"
```

**Step 6: Merge Docker configs**
```bash
# Review both:
# - mindreply-platform/docker-compose.yml (current)
# - Mind-Reply/resellerpro/docker-compose.yml (reseller version)
# - Mind-Reply/A11-K/docker-compose.yml (A11-K version)

# Take best practices from all:
# - Use resellerpro version as reference (has postgres/redis/tests setup)
# - Merge A11-K's service configs
# - Keep mindreply's existing structure
# - Result: unified docker-compose with all services
```

### PHASE 2: Archive source repos in brand org

**Step 1: Mark as consolidated**
```bash
# In each Mind-Reply repo to archive, add README update:
---
# ✅ CONSOLIDATED

This repository has been consolidated into the canonical monorepo.

**Canonical Location:** https://github.com/angellllkr-eng/mindreply-platform

**Content moved:**
- A11-K platform → apps/a11k/
- Reseller platform → apps/reseller-platform/
- Docs & brand → docs/
- Deployment configs → infrastructure/

See CONSOLIDATION_STATUS.md for migration details.
---
```

**Step 2: Archive repos**
```bash
gh repo archive Mind-Reply/mind-reply-app --confirm
gh repo archive Mind-Reply/mindreply-platform --confirm (if exists)
gh repo archive Mind-Reply/A11-K --confirm (after content transfer)
gh repo archive Mind-Reply/resellerpro --confirm (after content transfer)
# Keep replycontrol active if it's a separate product
```

### PHASE 3: Create public mirror (optional)

If you want a brand org repo for public consumption:

**Create Mind-Reply/mindreply-platform**
```bash
# Create new empty repo
gh repo create Mind-Reply/mindreply-platform --public

# Add as remote to personal canonical
cd mindreply-platform
git remote add brand-mirror https://github.com/Mind-Reply/mindreply-platform.git

# Push to both
git push origin main                    # angellllkr-eng/mindreply-platform
git push brand-mirror main              # Mind-Reply/mindreply-platform (sync'd)
```

---

## 4. CRITICAL FILES TO TRANSFER (Priority Order)

### 🔴 MUST TRANSFER (Business-critical)
1. `Mind-Reply/resellerpro/docker-compose.yml` → Unified Docker orchestration
2. `Mind-Reply/resellerpro/src/*` → Complete reseller platform code
3. `Mind-Reply/A11-K/service.yaml` → Revenue/service policies
4. `Mind-Reply/A11-K/docker-compose.yml` → A11-K specific services
5. `Mind-Reply/resellerpro/DEPLOYMENT_GUIDE.md` → Production deployment procedures

### 🟡 SHOULD TRANSFER (Operational docs)
1. `Mind-Reply/A11-K/BRAND_SYSTEM_2026.md` → Brand governance
2. `Mind-Reply/A11-K/*.html` → Brand pages (30+ static pages)
3. `Mind-Reply/resellerpro/STATUS_TRUTH.md` → Operational status tracking
4. `Mind-Reply/resellerpro/middleware.ts` → Auth middleware pattern
5. `Mind-Reply/mind-reply-app/setup-all-brands-final.js` → Initialization automation

### 🟢 NICE TO HAVE (Reference)
1. `Mind-Reply/A11-K/DOCKER_AGENT_INTEGRATION.md` → Agent integration patterns
2. `Mind-Reply/resellerpro/tests/*` → Test patterns
3. `Mind-Reply/A11-K/revenue-action-policy.json` → Revenue policies
4. `Mind-Reply/mind-reply-app/SELL-STRUCTURE.md` → GTM documentation

---

## 5. VERIFICATION CHECKLIST

### After Phase 1 (Personal consolidation)
- [ ] mindreply-platform has reseller-platform app
- [ ] All A11-K docs transferred and linked
- [ ] Docker-compose unified and tested: `docker compose up`
- [ ] All shared packages working: `pnpm install`
- [ ] All apps build: `pnpm build` or `pnpm -r build`
- [ ] No broken imports or references

### After Phase 2 (Archive brand repos)
- [ ] All Mind-Reply repos have README redirect
- [ ] All repos marked archived (visible on GitHub)
- [ ] Git history preserved (not deleted, archived only)
- [ ] No active CI/CD pipelines running (stop workflows)

### After Phase 3 (Public mirror, if done)
- [ ] Mind-Reply/mindreply-platform synced with personal canonical
- [ ] Both repos have same main branch content
- [ ] CI/CD pushes to both automatically (or manual sync)

### Final Verification
- [ ] mindreply.com still deploys successfully
- [ ] a11-k.space still deploys successfully
- [ ] Reseller platform builds and runs
- [ ] All health checks pass
- [ ] All documentation links work
- [ ] No secrets leaked in transfer

---

## 6. SUMMARY OF TRANSFERS

### From Brand Org → Personal Account

| From | To | Type | Files |
|------|-----|------|-------|
| Mind-Reply/A11-K | mindreply-platform/apps/a11k/ | Full brand system | 50+ files |
| Mind-Reply/resellerpro | mindreply-platform/apps/reseller-platform/ | Full platform | 100+ files |
| Mind-Reply/mind-reply-app | mindreply-platform/docs/ | Config + docs | 5 files |
| Mind-Reply/A11-K | mindreply-platform/config/ | Policies + YAML | 3 files |
| Mind-Reply/resellerpro | mindreply-platform/scripts/ | Deploy automation | 2 files |

### Result
```
mindreply-platform/ (CANONICAL)
├── apps/web-replycontrol/       (MindReply main)
├── apps/a11k/                   (A11-K + brand)
├── apps/reseller-platform/      (Reseller GTM)
├── apps/experimental/           (Staging)
├── services/                    (All services)
├── infrastructure/              (Docker, IaC)
├── packages/                    (Shared)
├── config/                      (Policies, revenue)
├── scripts/                     (Automation, deployment)
├── docs/                        (All documentation)
└── docker-compose.yml           (Unified orchestration)
```

**Status:** Single source of truth, all platforms consolidated, ready to deploy.

---

**Next Step:** Confirm transfer plan, then execute Phase 1 immediately.

