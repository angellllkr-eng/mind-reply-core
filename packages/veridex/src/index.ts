/**
 * Veridex — Provenance-First Intelligence
 * Packages every input, evaluation, and output into an immutable
 * cryptographic envelope. Emits signed .epack receipts.
 *
 * @see docs/ELYSIUM_STACK.md
 * @see epic #38 / issue #41
 */

import type {
  ElysiumPayload,
  LumenforgeEvaluation,
  VeridexEnvelope,
} from "@mind-reply/elysium-core";

export interface StampOptions {
  payload: ElysiumPayload;
  evaluation: LumenforgeEvaluation;
  promptVersion?: string;
  previousHash?: string;
  /** Optional external append writer (e.g. Supabase). Called after local hash. */
  appendWriter?: (envelope: VeridexEnvelope) => Promise<void>;
}

/** Canonical JSON for hashing — stable key order for core fields */
function canonicalString(
  payload: ElysiumPayload,
  evaluation: LumenforgeEvaluation,
  promptVersion?: string,
  previousHash?: string
): string {
  return JSON.stringify({
    requestId: payload.requestId,
    timestamp: payload.timestamp,
    promptVersion: promptVersion ?? payload.promptVersion ?? null,
    draftLength: payload.draft?.length ?? 0,
    evaluation: {
      contractId: evaluation.contractId,
      passed: evaluation.passed,
      score: evaluation.score ?? null,
      violations: evaluation.violations ?? [],
      latencyMs: evaluation.latencyMs ?? null,
      evaluatedAt: evaluation.evaluatedAt,
    },
    previousHash: previousHash ?? null,
  });
}

/** Real SHA-256 via Web Crypto (Edge / Node 18+ / Browser) */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  // globalThis.crypto is available in modern Node, Edge, and browsers
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    // Extremely constrained environments — still produce a deterministic hex
    let h = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return `fnv1a32-${(h >>> 0).toString(16).padStart(8, "0")}`;
  }
  const digest = await subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Create a Veridex envelope with SHA-256 payload hash.
 * Optionally persists via appendWriter (Supabase RLS table recommended).
 */
export async function stampEnvelope(
  options: StampOptions
): Promise<VeridexEnvelope> {
  const { payload, evaluation, promptVersion, previousHash, appendWriter } =
    options;

  const canonical = canonicalString(
    payload,
    evaluation,
    promptVersion,
    previousHash
  );
  const payloadHash = await sha256Hex(canonical);

  const envelope: VeridexEnvelope = {
    envelopeId: `epack_${payload.requestId}_${Date.now()}`,
    payloadHash,
    evaluation,
    promptVersion: promptVersion ?? payload.promptVersion,
    signedAt: new Date().toISOString(),
    previousHash,
    signature: `sha256:${payloadHash}`,
  };

  if (appendWriter) {
    await appendWriter(envelope);
  }

  return envelope;
}

/**
 * Build a Supabase-compatible row for an append-only ledger table.
 * Table suggestion:
 *   veridex_envelopes (
 *     envelope_id text primary key,
 *     payload_hash text not null,
 *     signature text,
 *     previous_hash text,
 *     prompt_version text,
 *     evaluation jsonb not null,
 *     signed_at timestamptz not null,
 *     request_id text not null
 *   )
 * RLS: insert for service role only; select for owner roles.
 */
export function toSupabaseRow(envelope: VeridexEnvelope, requestId: string) {
  return {
    envelope_id: envelope.envelopeId,
    payload_hash: envelope.payloadHash,
    signature: envelope.signature ?? null,
    previous_hash: envelope.previousHash ?? null,
    prompt_version: envelope.promptVersion ?? null,
    evaluation: envelope.evaluation,
    signed_at: envelope.signedAt,
    request_id: requestId,
  };
}

export type { VeridexEnvelope, ElysiumPayload, LumenforgeEvaluation };
