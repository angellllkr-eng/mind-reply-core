# MindReply Platform Contract

Role: canonical product/core runtime.
Reconstruction branch: `reconstruct/platform-estate-2026-08`.

## Boundary
Own product runtime, shared business logic, customer-facing APIs and reusable platform capabilities. Do not own estate-wide governance or unrelated commerce infrastructure.

## Required layers
- Web/application surface
- API/service layer
- data/persistence adapters
- authentication/authorization
- observability and health
- integration adapters
- test/verification harness

## Release rule
`main` is production source. Reconstruction changes land here only after build, route, API, security, and deployment evidence is recorded by the control plane.

## Vercel rule
Exactly one authoritative production project should serve the canonical MindReply product surface. Other Vercel projects are preview, migration, or quarantine targets until proven otherwise.
