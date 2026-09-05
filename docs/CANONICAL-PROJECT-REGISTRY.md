# CANONICAL PROJECT REGISTRY
**Owner:** Angel K / A11-K / MindReply  
**Updated:** 2026-09-05  
**Purpose:** Kill name-collision chaos. Agents MUST resolve work only via this table. Fuzzy name matching is forbidden.

---

## Agent hard rules (non-negotiable)

1. **Never pick a repo by similar name.** `mindreply`, `mind-reply`, `mind-reply-core`, `mindreply-org-site`, `MindReply` are **different**.
2. **Canonical = one GH repo + one primary Vercel project.** Everything else is ALIAS, ARCHIVE, or NOISE.
3. **If the task name is ambiguous, stop and use this registry.** Do not "guess the most recent."
4. **Do not push, deploy, or open PRs on ALIAS / NOISE / ARCHIVE** unless owner explicitly names that exact full path.
5. **Before any GH/Vercel write:** confirm `owner/repo` matches the CANONICAL column below.

---

## Tier 0 — CANONICAL (work here only)

| Intent | Canonical GitHub | Primary Vercel project | Domain / notes |
|--------|------------------|------------------------|----------------|
| Unified platform monorepo | `angellllkr-eng/mind-reply-core` | `a11-k-core` (`prj_tF8MATzE2bOP0hPfiKZcuGX992dh`) | mindreply.com + a11-k.space surfaces live in this monorepo |
| Public org / marketing site | `angellllkr-eng/mindreply-org-site` | `mindreply-org-site` (`prj_U0IAVGgzJKZhEl1FLts2vJft23Ym`) | Standalone public site source |
| Agent mesh / control plane | `angellllkr-eng/agent-control-plane` | Prefer `agent-control-plane-vezr` or `optimus-the-ai-platform-to-bu` — **pick one production alias and freeze it** | 98 open issues; do not open parallel optimus work without mapping |
| Live cloud execution | `angellllkr-eng/a11-live-cloud-execution` | `a11-live-cloud-execution` | Revenue-first routes; public |
| Multiverse / voice | `angellllkr-eng/a11-k-multiverse-5d` | `a11-k-multiverse` (`prj_FMXa3IdiAQaX60hq9YTJUUsEiOf8`) | Not older GH name `a11-k-multiverse` |
| Control platform (guide) | `angellllkr-eng/mindreply-control` | `public-site` (not `public-site-kmcc`) | Multilingual guide / conversion |
| Enterprise radar | `angellllkr-eng/enterprise-engine-radar` | `enterprise-engine-radar` | Public scorecard |
| Reseller platform | `angellllkr-eng/resellerpro-platform` | `resellerpro-platform` | Not the many `resellerpro-platform-*` forks |
| Reseller enterprise pack | `angellllkr-eng/reseller-pro-enterprise` | `reseller-pro-enterprise` | Not `*-1juj` |
| RAG platform | `angellllkr-eng/a11-rag-platform` | `a11-rag-platform` / `dashboard` | |
| SaaS starter | `angellllkr-eng/saas-starter` | `saas-starter` | Not `saas-starter1` |
| Opportunity radar | `angellllkr-eng/opportunity-radar` | — | |
| Real-estate radar | `angellllkr-eng/real-estate-value-radar` | — | Sovereign long-term asset |
| Agentic commerce CP | `angellllkr-eng/agentic-commerce-control-plane` | — | |
| PatchTalk | `angellllkr-eng/patchtalk` | `patchtalk` | |
| Nexus command plane | `angellllkr-eng/nexus-core` | `nexus-core` | Owner-only |
| Private opportunity core | `angellllkr-eng/private-opportunity-core` | `private-opportunity-core` | |

---

## Tier 1 — DISTINCT products (not the monorepo)

These are **complete separate platforms**. Do not merge into mind-reply-core without an explicit owner order.

| GitHub | Role |
|--------|------|
| `uptimepilot` | Uptime brand surface |
| `revenuepulse` | Revenue telemetry |
| `dealforge` | Lead qualification |
| `cloudtrim` | Cloud cost |
| `leadatlas` | B2B lead intel |
| `intentrank` | Intent ranking |
| `docparse` | Doc parse |
| `empirepulse` | Executive telemetry (**GH archived**) |
| `marginpilot` | Pricing (**GH archived**) |
| `leadrevive` | Lead recovery (**GH archived**) |
| `strateg` | Strategy surface |
| `auditforge-brand` | Audit brand |
| `unapolagetic-cosmetics` | Cosmetics brand |
| `pointer-ai-landing-page` | Landing |
| `expressme` | Express surface |
| `brushworks` | Design-to-code |
| `forge` | Business creation engine |
| `PA-tech` / `personal-agent` / `thetalk` / `kody-eve-template` | 2026-09-04 agent templates (keep separate) |

**Archived on GH (do not revive unless ordered):** empirepulse, cloudtrim, dealforge, leadrevive, marginpilot, leadatlas, linear-card-interaction, chatbot, chatbot1.

---

## Tier 2 — ALIAS / DUPLICATE Vercel (do not deploy here)

Same GH repo, many Vercel project names. **Agents always use the Primary in Tier 0.**

| Canonical GH | DO NOT USE (Vercel noise) |
|--------------|---------------------------|
| Mind-Reply/mindreply (org) | mindreplyupdate, moreofit, runnow, mind-reply-blv6, mindreplyviral, mrteamrun, mindef, mindreply-release, theone, mind-reply-96yt, mindreplyops, mindreply-package-proof, designer, dhnijomdu, source-mirror |
| mindreply-org-site | mindreply-org-site1, mindreply-org-site-zrvr |
| agent-control-plane | optimus-the-ai-platform-to-bu AND agent-control-plane-vezr — **freeze one** |
| mindreply-control | public-site-kmcc |
| mind-reply-core | angellllkr-eng-mind-reply-core*, a11k-live-foundation; a11-k-core is primary |
| resellerpro-platform | resellerpro-platform-8psz, -u16a, -fqnz, -original, resellerpro-platform11 |
| reseller-pro-enterprise | reseller-pro-enterprise-1juj |
| saas-starter | saas-starter1 |
| brushworks | brushworks-xjfn, -gtjn, -9ud8 |
| chatbot | chatbot-5hhe, a11k-chat |
| copy-of-a11-k-command-center | copy-of-a11-k-command-center-shdk |
| Mind-Reply/MindReply | mind-reply, mind-reply1, mindreply-branch-cleanup, mindreply-next-action, mindreply-launch-evidence, brillance-saas-landing-page |

---

## Tier 3 — MERGED / SUPERSEDED (never open as primary)

| Name | Status |
|------|--------|
| `a11k-surface` | MERGED → `mind-reply-core` apps/a11k |
| `a11-k-multiverse` (GH without -5d) | Prefer **a11-k-multiverse-5d** |
| `mind-repl` | Name collision trap — not core |
| `mr` | Related but not monorepo |
| nextjs1, nextjs-boilerplate, eve-chat-1, eve-chat-template, express-js-on-vercel, EPHEMERAL, source1, source2, Own1 | Archive candidates / noise |
| own | WhatsApp router related; not platform core |

---

## Missing / owner decisions

| Item | Action |
|------|--------|
| Vercel production freeze | One production project per Tier-0 row; disable auto-deploy on aliases |
| agent-control-plane dual Vercel | Pick **one** production project name and lock it in this table |
| Brand suite | Un-archive product repos for redesign **or** rebuild under `mind-reply-core/apps/*` — not both |
| Firecrawl shared client | `proxy: "auto"` (enhanced = same 1 credit) in any scrape path |

---

## Scrape standard (all agents)

```text
Firecrawl /scrape → proxy: "auto"  (or "enhanced")
Enhanced mode: NO surcharge — 1 credit same as basic
```

---

## How an agent must start a task

```
1. Read this registry (docs/CANONICAL-PROJECT-REGISTRY.md)
2. Map owner words → Tier 0 full name (owner/repo)
3. If no unique map → ask owner which Tier 0 row
4. Only then clone / PR / deploy / scrape
```

**Fatal mistakes this prevents:**
- Editing `Mind-Reply/mindreply` when work belongs in `angellllkr-eng/mind-reply-core`
- Deploying to `mindreply-org-site-zrvr` instead of `mindreply-org-site`
- Treating archived `leadatlas` as live product code
- Opening issues on `optimus-*` while the mesh lives in `agent-control-plane`
