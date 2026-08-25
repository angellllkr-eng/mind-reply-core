# GKE Standard + Self-Hosted TensorBoard Plan

**Status:** SEALED — APPROVAL GATED  
**Owner:** CEO A.K.  
**Referenced project:** `mind-reply-496111`  
**Region/zone:** `us-central1` / `us-central1-a`  
**Rule:** Do not run any `gcloud` create/enable command until the owner issues an explicit written approval in this cycle. This file is a plan only.

---

## Why this is gated

| Item | Note |
|------|------|
| Spend | ~$283/mo nodes (3× n2-standard-8 24/7) + ~$73 GKE management + LB + storage |
| Irreversible | Cluster + bucket + SA + LoadBalancer create real billable resources |
| API state | Plan notes Compute Engine API may be disabled — enabling is an owner action |
| A11 policy | Security / network / cloud apply agents are mutation_policy = blocked |

**Primary recommendation in the source plan:** Option 1 (GKE + self-hosted TensorBoard + GCS Fuse CSI) is retained as the technical preference *if* diagnostics are authorised. It is not auto-executed.

---

## Objectives (if approved)

1. GKE Standard cluster in `us-central1-a` with Workload Identity + GcsFuseCsiDriver.  
2. Bucket `gs://mind-reply-496111-tb-logs` for training / XProf logs.  
3. Self-hosted TensorBoard Deployment + LoadBalancer Service.  
4. No long-lived JSON keys — Workload Identity only.

---

## Variables (reference only)

```bash
export PROJECT_ID="mind-reply-496111"
export REGION="us-central1"
export ZONE="us-central1-a"
export CLUSTER_NAME="ml-diagnostics-cluster"
export BUCKET_NAME="mind-reply-496111-tb-logs"
export GCP_SA_NAME="tensorboard-sa"
export K8S_NAMESPACE="ml-diagnostics"
```

---

## Pre-flight (owner checklist before any apply)

- [ ] Written approval: “OK apply GKE TensorBoard plan for mind-reply-496111”  
- [ ] Confirm billing account active and budget alert set  
- [ ] Confirm N2 quota in us-central1 ≥ 24 vCPU  
- [ ] Enable APIs only if approved: compute, container, storage, aiplatform  
- [ ] Decide Spot / scale-to-zero to control cost  
- [ ] Confirm no production traffic depends on this cluster  

---

## Execution outline (do not run until approved)

1. `gcloud services enable …`  
2. Create bucket  
3. `gcloud container clusters create … --addons=GcsFuseCsiDriver --workload-pool=…`  
4. Workload Identity SA + bucket IAM  
5. Apply Namespace / SA / Job / TensorBoard Deployment / Service manifests  
6. Watch LoadBalancer external IP  
7. Scale to zero or delete when diagnostics complete  

Full command bodies remain in the owner-supplied source document; they are intentionally not duplicated here as copy-paste-ready apply scripts to avoid accidental execution.

---

## Cost control after approval

- Prefer Spot node pool for training jobs.  
- Autoscaling min nodes = 0 when idle.  
- Object lifecycle on the log bucket.  
- Delete cluster when the diagnostic window ends unless a written keep decision exists.

---

## Relationship to live monitoring

The public/operator **Live Monitor** page (`apps/a11k/public/monitor.html`) shows this plan as **GATED**. It will never claim a cluster is live until a verified external IP or cluster status is recorded in the decision log with evidence.

---

## Handoff

No GKE resource has been created by the agent.  
To proceed: reply with explicit approval and any cost cap (e.g. “OK apply, max $50 for this experiment”).  
Until then this plan stays sealed.
