# Mind-Reply Monorepo

Multi-service AI/LLM platform with Next.js frontend, Python RWA bridge, and orchestrated microservices.

## Project Structure

```
mind-reply/
├── apps/
│   └── web-replycontrol/      # Next.js frontend
├── services/
│   └── rwa-bridge/            # Python RWA acquisition engine
├── docker-compose.yml         # Local orchestration
├── docker-compose.prod.yml    # Production orchestration
├── .dockerignore
├── .env.example
├── Dockerfile.rwa             # RWA bridge image
└── docs/
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    └── TROUBLESHOOTING.md
```

## Quick Start

```bash
# Development
docker compose up --pull always

# Production
docker compose -f docker-compose.prod.yml up -d

# Health check
curl http://localhost:3000  # Web UI
curl http://localhost:8000  # RWA Bridge
```

## Services

- **web-replycontrol**: Next.js frontend on :3000
- **rwa-bridge**: Python RWA bridge on :8000
- **healthcheck-monitor**: Service health probe

## Environment

Copy `.env.example` to `.env.local` and configure:
- `AGENT_WALLET_ADDRESS`
- `AGENT_SESSION_KEY`
- `LEGAL_ENTITY_API_URL`

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
