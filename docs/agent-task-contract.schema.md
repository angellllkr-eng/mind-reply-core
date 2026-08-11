# Agent Task Contract

Every parallel engineering task must declare a narrow scope before execution.

```yaml
id: unique-task-id
agent: bounded-agent-name
purpose: one concrete outcome
branch: isolated/frontier branch
allowed_paths:
  - exact/path/or/prefix
blocked_paths:
  - production-sensitive/path
input:
  source_commit: immutable-sha
  evidence_refs: []
validation:
  commands: []
  e2e: []
proof:
  required: true
  binds_to: [commit_sha, tree_sha]
stop_conditions:
  - missing evidence
  - stale proof
  - scope overlap
  - unsafe requested action
promotion:
  owner_approval_required: true
```

## Required controls

- One task has one isolated branch/worktree.
- File ownership must be explicit before parallel edits.
- Overlapping ownership blocks autonomous integration.
- Validation must execute against the exact candidate tree.
- A passing result without a commit/tree binding is invalid proof.
- Stale proof cannot promote a changed tree.
- Production and destructive actions remain owner-gated.

## Minimal proof record

```yaml
run_id: YYYYMMDD-HHMM-SOFIA
source_commit: sha
candidate_commit: sha
validation_profile: name
commands: []
results: pass|fail
artifacts: []
verified_at: timestamp
```

This contract is intentionally repository-local and dependency-free. External agent harnesses may be evaluated against it but cannot weaken it.
