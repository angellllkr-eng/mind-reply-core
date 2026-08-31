# MindReply Microservices

The MindReply web application exposes small, independently testable service boundaries through Next.js route handlers. They are designed to run on the same Vercel deployment while remaining separable for later extraction.

## Services

| Service | Endpoint | Responsibility |
|---|---|---|
| Health | `/api/health` | Liveness, uptime and service identity |
| Readiness | `/api/ready` | Deployment configuration gate |
| Version | `/api/version` | Runtime release metadata |
| Service registry | `/api/services` | Machine-readable platform capability catalog |
| Status UI | `/status` | Human-facing live service view |

## Extraction boundary

Each route is stateless and should avoid sharing request-local state. Database access, model execution, connector work and evidence capture can later move behind authenticated internal APIs without changing the public status contract.

## Safety

- Never return secret values.
- Readiness checks only expose missing variable names, not values.
- Runtime metadata uses Vercel-provided environment values when present.
- No service is reported operational merely because an animation says so; status surfaces read actual route responses.
- Destructive operations require separate authenticated endpoints and approval controls.

## Verification

Production verification should request:

```text
GET /api/health
GET /api/ready
GET /api/version
GET /api/services
GET /status
```

Expected healthy deployment:

- `/api/health` returns HTTP 200.
- `/api/version` returns HTTP 200.
- `/api/services` returns HTTP 200.
- `/status` loads without client exceptions.
- `/api/ready` returns HTTP 200 only when required deployment configuration exists.
