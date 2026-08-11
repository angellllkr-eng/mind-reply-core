/**
 * Veridex → Supabase append-only ledger writer
 *
 * Env (server-only):
 *   VERIDEX_SUPABASE_URL
 *   VERIDEX_SUPABASE_SERVICE_ROLE_KEY
 *   VERIDEX_SUPABASE_TABLE (default: veridex_envelopes)
 *
 * Never expose the service role key to the browser.
 *
 * @see packages/veridex/sql/veridex_envelopes.sql
 */

import type { VeridexEnvelope } from "@mind-reply/elysium-core";
import { toSupabaseRow } from "./index";

export function isSupabaseWriterConfigured(): boolean {
  if (typeof process === "undefined" || !process.env) return false;
  return Boolean(
    process.env.VERIDEX_SUPABASE_URL &&
      process.env.VERIDEX_SUPABASE_SERVICE_ROLE_KEY
  );
}

/**
 * Append one envelope to Supabase via PostgREST.
 * Uses service role; fail-soft when not configured (returns without throw
 * only if caller prefers — this function throws on HTTP failure).
 */
export async function appendEnvelopeToSupabase(
  envelope: VeridexEnvelope,
  requestId: string
): Promise<{ ok: true; table: string } | { ok: false; reason: string }> {
  const url = process.env.VERIDEX_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.VERIDEX_SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.VERIDEX_SUPABASE_TABLE || "veridex_envelopes";

  if (!url || !key) {
    return { ok: false, reason: "veridex_supabase_not_configured" };
  }

  const row = toSupabaseRow(envelope, requestId);
  const endpoint = `${url}/rest/v1/${table}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `veridex_supabase_append_failed:${res.status}:${text.slice(0, 200)}`
    );
  }

  return { ok: true, table };
}

/**
 * Factory for stampEnvelope({ appendWriter })
 */
export function createSupabaseAppendWriter(requestId: string) {
  return async (envelope: VeridexEnvelope) => {
    if (!isSupabaseWriterConfigured()) return;
    await appendEnvelopeToSupabase(envelope, requestId);
  };
}
