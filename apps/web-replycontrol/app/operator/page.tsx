"use client";

import { useState } from "react";

/**
 * Operator console — exercise gate + pack locally.
 * No secrets in the browser. Uses same-origin API only.
 */
export default function OperatorPage() {
  const [requestId, setRequestId] = useState(
    () => `audit_${new Date().toISOString().slice(0, 10)}_demo`
  );
  const [draft, setDraft] = useState(
    "Executive findings: repository shows clear delivery drag in CI paths and three high-value automation opportunities. Recommendations are bounded and reversible."
  );
  const [clientLabel, setClientLabel] = useState("");
  const [result, setResult] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function run(path: "/api/elysium/gate" | "/api/elysium/pack") {
    setBusy(true);
    setResult("");
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestId,
          draft,
          clientLabel: clientLabel || undefined,
        }),
      });
      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));
    } catch (e) {
      setResult(String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="operator">
      <nav className="nav">
        <a className="brand" href="/">
          MindReply<span>®</span>
        </a>
        <div className="navLinks">
          <a href="/">Public</a>
          <a href="/api/elysium/status">Status</a>
        </div>
      </nav>

      <section className="section" style={{ paddingTop: 48 }}>
        <p className="eyebrow">Operator room</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)" }}>
          Exercise the wall and the receipt
        </h2>
        <p className="lead" style={{ maxWidth: "40rem" }}>
          Same-origin only. No service keys in the browser. Enable{" "}
          <code>ELYSIUM_AUDIT_LOOP=1</code> on the host to leave no-op mode.
        </p>

        <div className="op-grid">
          <div className="op-form">
            <label className="op-label">REQUEST ID</label>
            <input
              className="op-input"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
            />
            <label className="op-label">CLIENT LABEL (optional)</label>
            <input
              className="op-input"
              value={clientLabel}
              onChange={(e) => setClientLabel(e.target.value)}
              placeholder="Client or engagement name"
            />
            <label className="op-label">DRAFT</label>
            <textarea
              className="op-textarea"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={10}
            />
            <div className="op-actions">
              <button
                className="button"
                type="button"
                disabled={busy}
                onClick={() => run("/api/elysium/gate")}
              >
                Run gate
              </button>
              <button
                className="button op-alt"
                type="button"
                disabled={busy}
                onClick={() => run("/api/elysium/pack")}
              >
                Build delivery pack
              </button>
            </div>
          </div>
          <pre className="op-out">{result || "Result appears here."}</pre>
        </div>
      </section>

      <footer>
        <span>Operator · not a public CTA</span>
        <span>People decide · Evidence leads</span>
      </footer>

      <style>{`
        .operator { width: min(calc(100% - 40px), 1160px); margin: auto; }
        .op-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 36px; }
        .op-form { display: flex; flex-direction: column; gap: 8px; }
        .op-label { font: 600 10px ui-monospace, monospace; letter-spacing: 0.12em; color: #7eb0ff; margin-top: 12px; }
        .op-input, .op-textarea {
          width: 100%; padding: 12px 14px; border-radius: 10px;
          border: 1px solid #ffffff14; background: #0e1218; color: #f2f4f7;
          font: 14px/1.5 ui-sans-serif, system-ui, sans-serif;
        }
        .op-textarea { resize: vertical; min-height: 180px; }
        .op-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
        .op-alt { background: transparent !important; color: #f2f4f7 !important; border: 1px solid #ffffff22; }
        .op-out {
          margin: 0; padding: 20px; border-radius: 12px; border: 1px solid #ffffff14;
          background: #0a0e14; color: #a5adba; font: 12px/1.55 ui-monospace, monospace;
          overflow: auto; max-height: 520px; white-space: pre-wrap;
        }
        @media (max-width: 850px) { .op-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
