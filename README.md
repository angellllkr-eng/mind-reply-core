# MindReply — Canonical Monorepo

**Official source of truth** for the MindReply platform and ecosystem.

- **Homepage:** [mindreply.com](https://mindreply.com)
- **A11-K Branded Surface:** [a11-k.space](https://a11-k.space)
- **Documentation:** `./docs/`

---

## 🏗️ Project Structure

```
mind-reply-core/
├── apps/
│   ├── web-replycontrol/           # MindReply Core Web UI (mindreply.com)
│   ├── a11k/                       # A11-K Branded Surface (a11-k.space)
│   ├── marketing/                  # Landing pages & collateral
│   └── experimental/
│       ├── brushworks/             # Design-to-code studio (staging)
│       └── forge/                  # Business creation engine (staging)
│
├── services/
│   └── rwa-bridge/                 # Python RWA acquisition engine
│
├── infrastructure/
│   └── nexus/                      # AEGIS orchestration control plane
│
├── packages/
│   ├── shared-ui/                  # Shared React components
│   ├── shared-config/              # Shared environment & schemas
│   └── shared-types/               # Shared TypeScript types
│
├── docs/
│   ├── ARCHITECTURE.md             # System design
│   ├── DEPLOYMENT.md               # Deployment runbook
│   ├── OPERATIONS.md               # Ops & monitoring
│   ├── TROUBLESHOOTING.md          # Common issues
│   ├── BRAND_STRATEGY.md           # Brand alignment
│   └── ECOSYSTEM.md                # Product ecosystem
│
├── docker-compose.yml              # Development orchestration
├── docker-compose.prod.yml         # Production orchestration
├── .env.example                    # Environment template
├── pnpm-workspace.yaml             # Monorepo config
└── vercel.json                     # Vercel deployment config
```

---

## ⚡ Quick Start

### Development (Local Docker)

```bash
# Clone & enter repo
git clone https://github.com/angellllkr-eng/mind-reply-core.git
cd mind-reply-core

# Copy environment template
cp .env.example .env.local

# Start all services
docker compose up --pull always

# Open browser
# MindReply Core: http://localhost:3000
# A11-K Surface: http://localhost:3001
# RWA Bridge:    http://localhost:8000
```

### Development (Local Node)

```bash
# Install dependencies
pnpm install

# Run dev servers (all apps parallel)
pnpm dev

# Or run a specific app
pnpm dev --filter=web-replycontrol
pnpm dev --filter=a11k
```

### Production (Docker)

```bash
# Build & run production stack
docker compose -f docker-compose.prod.yml up -d

# View logs
docker compose logs -f

# Health check
curl http://localhost:3000     # mindreply-web
curl http://localhost:3001     # a11k-web
curl http://localhost:8000     # rwa-bridge
```

---

## 📦 Services

| Service | Port | Purpose | Technology |
|---------|------|---------|-----------|
| **mindreply-web** | 3000 | Core MindReply UI | Next.js + React |
| **a11k-web** | 3001 | A11-K branded surface | Next.js + React |
| **rwa-bridge** | 8000 | RWA acquisition engine | Python FastAPI |
| **postgres** | 5432 | Shared database | PostgreSQL 16 |
| **redis** | 6379 | Caching & sessions | Redis 7 |

---

## 🔧 Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```env
# Core Domain Configuration
MINDREPLY_DOMAIN=mindreply.com
A11K_DOMAIN=a11-k.space

# Shared Services
AGENT_WALLET_ADDRESS=0x...
AGENT_SESSION_KEY=0x...
LEGAL_ENTITY_API_URL=https://api.otoco.io/v1

# Database
POSTGRES_URL=postgresql://mindreply:password@localhost:5432/mindreply
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_URL=https://mindreply.com
NEXTAUTH_SECRET=your_secret_here
OPENAI_API_KEY=sk-...
```

See `.env.example` for complete configuration.

---

## 🚀 Deployment

### Mindreply.com (Docker + Container Registry)

```bash
# Build Docker image
docker compose -f docker-compose.prod.yml build mindreply-web

# Push to registry (e.g., Docker Hub, GitHub Container Registry)
docker tag mind-reply-core:latest ghcr.io/angellllkr-eng/mind-reply-core:latest
docker push ghcr.io/angellllkr-eng/mind-reply-core:latest

# Deploy to production host
ssh deploy@mindreply.com "docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d"
```

### A11-K.space (Vercel)

```bash
# Connect repo to Vercel
vercel link

# Deploy
vercel deploy --prod --scope=your_org

# Or auto-deploy via GitHub Actions (CI/CD)
# See .github/workflows/deploy-a11k.yml
```

See [`./docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for detailed runbooks.

---

## 📚 Documentation

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — System design, microservices, and data flow
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** — Deployment to mindreply.com & a11-k.space
- **[OPERATIONS.md](./docs/OPERATIONS.md)** — Monitoring, scaling, disaster recovery
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** — Common issues & solutions
- **[ECOSYSTEM.md](./docs/ECOSYSTEM.md)** — Product strategy & brand alignment
- **[BRAND_STRATEGY.md](./docs/BRAND_STRATEGY.md)** — Messaging & positioning

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm test --filter=web-replycontrol

# Run with coverage
pnpm test:coverage
```

---

## 🔐 Security

- ✅ Non-root Docker containers
- ✅ Environment variables (no secrets in code)
- ✅ Health checks enabled
- ✅ Network isolation (Docker bridge)
- ✅ Database backups (production)

See [`./docs/SECURITY.md`](./docs/SECURITY.md) for detailed security practices.

---

## 📋 CI/CD Pipelines

| Pipeline | Trigger | Action |
|----------|---------|--------|
| **Build & Deploy (mindreply.com)** | Push to main, `apps/web-replycontrol/**` | Build → Registry → Deploy |
| **Deploy A11-K (a11-k.space)** | Push to main, `apps/a11k/**` | Build → Vercel → Deploy |
| **Tests** | PR or push | Run test suite |
| **Linting** | PR or push | ESLint + Biome checks |

See `.github/workflows/` for pipeline definitions.

---

## 📞 Support

For issues, refer to:
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** — Common problems
- **GitHub Issues** — Feature requests & bug reports
- **Documentation** — Architecture & deployment guides

---

## 📄 License

Proprietary © MindReply. All rights reserved.

---

**Last Updated:** 2026-08-05  
**Maintainer:** Angel Krastev (`angellllkr-eng`)
