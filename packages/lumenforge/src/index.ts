/**
 * Lumenforge — Quality as Executable Law
 * Active middleware that evaluates every payload against compiled Helix
 * contracts before the end-user ever sees output.
 *
 * Intended deployment: Vercel Edge Middleware.
 *
 * @see docs/ELYSIUM_STACK.md
 * @see epic #38 / issue #40
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

/** Approximate token count (whitespace + punctuation heuristic). */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // ~4 chars/token English average, with a floor for short strings
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

/**
 * Evaluate a draft payload against a Helix contract.
 * Checks: token budget, banned vocabulary, latency budget, empty draft,
 * and optional tone keyword presence (soft signal only).
 */
export function evaluatePayload(
  payload: ElysiumPayload,
  options: EvaluateOptions
): LumenforgeEvaluation {
  const { contract } = options;
  const started = options.startedAt ?? Date.now();
  const violations: string[] = [];
  const draft = payload.draft ?? "";

  if (!draft.trim()) {
    violations.push("empty_draft");
  }

  if (contract.max_tokens) {
    const tokens = estimateTokens(draft);
    if (tokens > contract.max_tokens) {
      violations.push(`token_budget_exceeded:${tokens}>${contract.max_tokens}`);
    }
  }

  if (contract.banned_vocabulary?.length && draft) {
    const lower = draft.toLowerCase();
    for (const term of contract.banned_vocabulary) {
      if (!term) continue;
      // word-boundary-ish match to reduce false positives
      const re = new RegExp(
        `(^|[^a-z0-9])${escapeRegExp(term.toLowerCase())}([^a-z0-9]|$)`,
        "i"
      );
      if (re.test(lower)) {
        violations.push(`banned_vocabulary:${term}`);
      }
    }
  }

  // Soft tone signal: if required_tone is professional, flag obvious casual markers
  if (contract.required_tone === "professional" && draft) {
    const casual = [/\blol\b/i, /\bomg\b/i, /\bwtf\b/i, /!!!{2,}/];
    for (const re of casual) {
      if (re.test(draft)) {
        violations.push("tone_mismatch:professional");
        break;
      }
    }
  }

  const latencyMs = Date.now() - started;
  if (contract.max_latency_ms && latencyMs > contract.max_latency_ms) {
    violations.push(`latency_exceeded:${latencyMs}>${contract.max_latency_ms}`);
  }

  const passed = violations.length === 0;
  return {
    contractId: contract.id,
    passed,
    score: passed ? 1 : Math.max(0, 1 - violations.length * 0.2),
    violations: violations.length ? violations : undefined,
    latencyMs,
    evaluatedAt: new Date().toISOString(),
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Edge-ready helper: evaluate and decide action per fallback_strategy.
 * Does not call the model — returns instruction for the caller.
 */
export type GateAction = "allow" | "block" | "rewrite_once" | "localized_fallback";

export function decideGateAction(
  evaluation: LumenforgeEvaluation,
  contract: HelixContract
): GateAction {
  if (evaluation.passed) return "allow";
  switch (contract.fallback_strategy) {
    case "block":
      return "block";
    case "localized_fallback":
      return "localized_fallback";
    case "rewrite_once":
    default:
      return "rewrite_once";
  }
}

export type { HelixContract, ElysiumPayload, LumenforgeEvaluation };
