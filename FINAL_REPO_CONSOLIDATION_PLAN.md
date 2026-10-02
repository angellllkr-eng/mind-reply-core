# Final Repository Consolidation Execution Plan

**Status:** Ready for execution  
**Target:** One platform repo per real product  
**Canonical owner:** `angellllkr-eng`  
**Primary repo:** `mind-reply-core` (legacy) -> `mindreply-platform` (target)

---

## 1. FINAL TARGET ARCHITECTURE

```
angellllkr-eng/
├── mindreply-platform            # Customer product: mindreply.com
├── a11-platform                  # A11-K brand: a11-k.space
├── reseller-platform             # Reseller GTM: reseller.mindreply.com
├── nowline-platform              # Roadmap/tooling: roadmap.mindreply.com
├── nexus-platform                # Internal control plane (private)
├── bridge-rwa                    # Service integration
├── service-auth                  # Auth service
├── service-notification           # Notifications/emails/webhooks
├── service-api-gateway           # API gateway
├── service-llm-router            # LLM routing
├── sdk-public                    # Public SDK
├── packages-shared               # Shared UI + config + types
├── infrastructure-shared         # Docker + IaC + monitoring + secrets
├── docs-central                  # Docs + architecture + runbooks
├── templates-starter             # Reference starter kits
└── archive/ (logical group)     # Historical repos archived only
```

---

## 2. REPO DECISION MATRIX

### KEEP AS ACTIVE PLATFORM REPOS
- `mindreply-platform` -> main product
- `a11-platform` -> A11-K brand platform
- `reseller-platform` -> separate GTM product if still active
- `nowline-platform` -> separate product if unique
- `nexus-platform` -> internal control plane

### CONSOLIDATE INTO TARGET REPOS
- `mind-reply-core` -> `mindreply-platform`
- `a11-homepage` -> `a11-platform`
- `a11-evidence-surface` -> `a11-platform`
- `a11-sovereign-nowline` -> `a11-platform`
- `eu-ai-operator-desk` -> `a11-platform`
- `enterprise-engine-radar` -> `a11-platform`
- `nexus-core` -> `nexus-platform`
- `agent-control-plane` -> `nexus-platform`
- `forge` -> `templates-starter` or archived by feature
- `brushworks` -> `templates-starter` or archived by feature
- `chrome-devtools-mcp` -> `packages-shared` or `sdk-public` depending on use
- `gtm-cheat-codes` -> `docs-central` or `templates-starter`

### DELETE OR ARCHIVE
Delete if clearly duplicate or accidental:
- `mr-app-copy`
- `Own`
- `Own1`
- `EPHEMERAL`
- `source1`
- `source2`
- `NEW-SIGNAL-check`
- `patchtalk-ux`
- `hello-world-do-template`
- `burning-heart-launcher`
- `awesome-selfhosted` (fork)
- `azure-cli-extensions-` (fork)
- `python-docs-samples` (fork)

Archive if historical or legacy:
- `mind-reply`
- `a11k-surface`
- `forge`
- `brushworks`
- `nexus-core`
- `saas-starter`
- old `mind-reply-core` after migration

---

## 3. MIGRATION SEQUENCE

### Phase 1: Create target repos

Create these repositories first:

```bash
# Organization repos to create
mindreply-platform
a11-platform
reseller-platform
nowline-platform
nexus-platform
bridge-rwa
service-auth
service-notification
service-api-gateway
service-llm-router
sdk-public
packages-shared
infrastructure-shared
docs-central
templates-starter
```

Use GitHub UI or CLI to create them under `angellllkr-eng`.

---

### Phase 2: Migrate platform code

#### 2.1 Migrate current `mind-reply-core` into `mindreply-platform`

```bash
git clone https://github.com/angellllkr-eng/mind-reply-core.git
cd mind-reply-core

git remote rename origin old-origin

git remote add new-origin https://github.com/angellllkr-eng/mindreply-platform.git

git push new-origin HEAD:main
```

If you want the full history preserved cleanly, create a branch after migration and retain old repo archived. For a less risky move:

```bash
git clone https://github.com/angellllkr-eng/mindreply-platform.git
cd mindreply-platform

git remote add legacy https://github.com/angellllkr-eng/mind-reply-core.git
git fetch legacy

git merge --allow-unrelated-histories legacy/main
```

Then commit and push.

---

#### 2.2 Migrate A11-K surfaces into `a11-platform`

```bash
# Example flow for one surface
cd /tmp

git clone https://github.com/angellllkr-eng/a11-homepage.git
cd a11-homepage

git remote add target https://github.com/angellllkr-eng/a11-platform.git
git fetch target

# If you want to merge as subdirectory:
git subtree add --prefix apps/a11k-homepage target/main --squash

git push target HEAD:main
```

Repeat for:
- `a11-evidence-surface`
- `a11-sovereign-nowline`
- `eu-ai-operator-desk`
- `enterprise-engine-radar`

Then archive each old repo after validation.

---

### Phase 3: Migrate backend services

#### 3.1 `bridge-rwa`

```bash
git clone https://github.com/angellllkr-eng/mind-reply-core.git
cd mind-reply-core
# Copy relevant service files to a new repository or create a dedicated repo
# Recommended: move /services/rwa-bridge/ to bridge-rwa
```

#### 3.2 `nexus-platform`

```bash
# Move internal orchestration from legacy agent-control-plane or nexus-core
# Use relevant directory in the old code as source of truth
```

#### 3.3 `service-auth`, `service-notification`, `service-api-gateway`, `service-llm-router`

Create fresh repos from the best implementation in the existing codebase and move only the relevant modules.

---

### Phase 4: Shared repos

#### `packages-shared`

Move shared libraries such as:
- `packages/shared-ui`
- `packages/shared-config`
- `packages/shared-types`
- `packages/shared-utils`
- `packages/sdk` if applicable

#### `sdk-public`

Create SDK repo from `packages/sdk` once stable.

#### `infrastructure-shared`

Move Docker, Terraform, monitoring, and deployment configuration files into a dedicated infrastructure repo.

#### `docs-central`

Move architecture and documentation files from root-level docs and from repo docs into the new central repo.

---

## 4. EXACT ARCHIVE / DELETE COMMANDS

### Archive old repos

```bash
# gh CLI examples
gh repo archive angellllkr-eng/mind-reply --confirm
gh repo archive angellllkr-eng/mind-reply-core --confirm
gh repo archive angellllkr-eng/a11k-surface --confirm
gh repo archive angellllkr-eng/forge --confirm
gh repo archive angellllkr-eng/brushworks --confirm
gh repo archive angellllkr-eng/nexus-core --confirm
gh repo archive angellllkr-eng/saas-starter --confirm
```

### Delete duplicates

```bash
gh repo delete angellllkr-eng/mr-app-copy --confirm
gh repo delete angellllkr-eng/Own --confirm
gh repo delete angellllkr-eng/Own1 --confirm
gh repo delete angellllkr-eng/EPHEMERAL --confirm
gh repo delete angellllkr-eng/hello-world-do-template --confirm
gh repo delete angellllkr-eng/NEW-SIGNAL-check --confirm
gh repo delete angellllkr-eng/patchtalk-ux --confirm
gh repo delete angellllkr-eng/burning-heart-launcher --confirm
gh repo delete angellllkr-eng/source1 --confirm
gh repo delete angellllkr-eng/source2 --confirm
gh repo delete angellllkr-eng/awesome-selfhosted --confirm
gh repo delete angellllkr-eng/azure-cli-extensions- --confirm
gh repo delete angellllkr-eng/python-docs-samples --confirm
```

---

## 5. ORGANIZATION CLEANUP RULES

### Rule 1: One repo per platform
Each real product gets one repo. Do not keep multiple copies of the same app in different repos.

### Rule 2: Archive old repos, do not just leave them active
Once migrated and verified, archive old repo to preserve history and avoid confusion.

### Rule 3: Private operational repos stay private
If a repo is control-plane, internal tooling, or telemetry, keep it private.

### Rule 4: Platform names should be clean and descriptive
Use naming conventions like:
- `mindreply-platform`
- `a11-platform`
- `reseller-platform`
- `nexus-platform`
- `bridge-rwa`

Avoid generic names like `mind-reply`, `core`, `app-copy`, `source1`.

---

## 6. VALIDATION CHECKLIST

### Pre-migration
- [ ] Confirm repo contents to migrate
- [ ] Back up every old repo
- [ ] Confirm target repos are empty or ready
- [ ] Check Vercel project links
- [ ] Verify GitHub Actions secrets

### Migration validation
- [ ] Repo builds locally
- [ ] App routes load correctly
- [ ] CI/CD runs successfully
- [ ] Secrets are injected properly
- [ ] No outdated links point to old repos
- [ ] Health checks pass for each app service

### Post-migration
- [ ] Archive old repo
- [ ] Remove stale docs references
- [ ] Update profile README and org docs
- [ ] Verify final platform URLs

---

## 7. RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data loss during migration | Critical | Archive before delete; keep a backup branch |
| Broken deploys | High | Validate each platform before archive |
| Unclear repo ownership | High | Use final naming conventions and org-level rules |
| Duplicate authorship confusion | Medium | Remove duplicates and archive old repos |
| External integrations break | Medium | Keep old deployment active until cutover is verified |

---

## 8. FINAL EXECUTION ORDER

1. Create new target repos
2. Validate old repos and back them up
3. Migrate `mind-reply-core` -> `mindreply-platform`
4. Migrate A11-K repos -> `a11-platform`
5. Migrate control plane -> `nexus-platform`
6. Migrate shared packages -> `packages-shared`
7. Migrate infra -> `infrastructure-shared`
8. Migrate docs -> `docs-central`
9. Archive dated legacy repos
10. Delete obvious stale repos
11. Re-test deployments and CI/CD
12. Update public README and organization landing pages

---

## 9. RECOMMENDATION

This should be the real end state:

- `mindreply-platform` = main product / business source of truth
- `a11-platform` = A11-K product / operator surface
- `nexus-platform` = internal control layer
- `bridge-rwa` = service layer
- `packages-shared` = shared UI/types/config
- `infrastructure-shared` = deployment, docker, cloud configs
- `docs-central` = architecture and runbooks

Everything else should be either:
- archived for history,
- deleted if duplicate,
- or moved into one of the above as a real subsystem.

---

**Summary:** This is the final and clean repo model. The old repo graph should be reduced to a clear, intentional platform ecosystem.
