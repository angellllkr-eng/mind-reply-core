/**
 * Lumenforge — Quality as Executable Law
 * Active middleware that evaluates every payload against compiled Helix
 * contracts before the end-user ever sees output.
 *
 * Intended deployment: Vercel Edge Middleware (sub-millisecond path).
 *
 * @see docs/ELYSIUM_STACK.md
 * @see epic #38
 */

import type {
  ElysiumPayload,
  HelixContract,
  LumenforgeEvaluation,
} from "@mind-reply/elysium-core";

export interface EvaluateOptions {
  contract: HelixContract;
  startedAt?: number;
}

/**
 * Evaluate a draft payload against a Helix contract.
 * Scaffold implementation — production version will run token counting,
 * tone classifiers, banned-vocabulary scans, latency budgets, and
 * optional hallucination probes at the edge.
 */
export function evaluatePayload(
  payload: ElysiumPayload,
  options: EvaluateOptions
): LumenforgeEvaluation {
  const { contract } = options;
  const started = options.startedAt ?? Date.now();
  const violations: string[] = [];

  // Scaffold checks (expand in subsequent PRs)
  if (contract.max_tokens && payload.draft) {
    // naive token estimate; replace with real tokenizer
    const approxTokens = Math.ceil(payload.draft.length / 4);
    if (approxTokens > contract.max_tokens) {
      violations.push(`token_budget_exceeded:${approxTokens}>${contract.max_tokens}`);
    }
  }

  if (contract.banned_vocabulary && payload.draft) {
    const lower = payload.draft.toLowerCase();
    for (const term of contract.banned_vocabulary) {
      if (lower.includes(term.toLowerCase())) {
        violations.push(`banned_vocabulary:${term}`);
      }
    }
  }

  const latencyMs = Date.now() - started;
  if (contract.max_latency_ms && latencyMs > contract.max_latency_ms) {
    violations.push(`latency_exceeded:${latencyMs}>${contract.max_latency_ms}`);
  }

  return {
    contractId: contract.id,
    passed: violations.length === 0,
    score: violations.length === 0 ? 1 : Math.max(0, 1 - violations.length * 0.25),
    violations: violations.length ? violations : undefined,
    latencyMs,
    evaluatedAt: new Date().toISOString(),
  };
}

export type { HelixContract, ElysiumPayload, LumenforgeEvaluation };
