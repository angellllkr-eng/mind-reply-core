"use client";

import { useEffect, useState } from "react";

/**
 * Operator console — compile → gate → pack end-to-end.
 * No secrets in the browser. Uses same-origin API only.
 */
export default function OperatorPage() {
  const [requestId, setRequestId] = useState(
    () => `audit_${new Date().toISOString().slice(0, 10)}_demo`
  );
  const [draft, setDraft] = useState(
    "Executive findings: repository shows clear delivery drag in CI paths and three high-value automation opportunities. Recommendations are bounded and reversible."
  );
  const [intent, setIntent] = useState(
    "Professional tone. Ban guarantee. Max 2000 tokens. Rewrite once on fail."
  );
  const [clientLabel, setClientLabel] = useState("");
  const [result, setResult] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("Loading status…");

  useEffect(() => {
    fetch("/api/elysium/status")
      .then((r) => r.json())
      .then((j) => {
        const e = j.elysium ?? {};
        setStatus(
          `loop=${e.auditLoopEnabled ? "on" : "off"} · ledger=${e.ledger ?? "?"} · edge=${e.edge ?? "?"}`
        );
      })
      .catch(() => setStatus("status unreachable"));
  }, []);

  async function run(
    path: "/api/elysium/compile" | "/api/elysium/gate" | "/api/elysium/pack"
  ) {
    setBusy(true);
    setResult("");
    try {
      const body =
        path === "/api/elysium/compile"
          ? { intent, target: "profit-audit" }
          : {
              requestId,
              draft,
              clientLabel: clientLabel || undefined,
            };
      const res = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
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
          <a href="/api/elysium/status">Status JSON</a>
        </div>
      </nav>

      <section className="section" style={{ paddingTop: 48 }}>
        <p className="eyebrow">Operator room · full path</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)" }}>
          Compile · wall · receipt
        </h2>
        <p className="lead" style={{ maxWidth: "40rem" }}>
          Aurelia compile → Lumenforge gate → Veridex pack. Same-origin only.
          Host flag <code>ELYSIUM_AUDIT_LOOP=1</code> leaves no-op mode.
        </p>
        <p className="op-status">{status}</p>

        <div className="op-grid">
          <div className="op-form">
            <label className="op-label">EXPERT INTENT (Aurelia)</label>
            <textarea
              className="op-textarea"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              rows={3}
            />
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
              rows={8}
            />
            <div className="op-actions">
              <button
                className="button op-alt"
                type="button"
                disabled={busy}
                onClick={() => run("/api/elysium/compile")}
              >
                Compile intent
              </button>
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
        .op-status {
          margin: 16px 0 0;
          font: 600 12px ui-monospace, monospace;
          color: #7eb0ff;
          letter-spacing: 0.04em;
        }
        .op-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 28px; }
        .op-form { display: flex; flex-direction: column; gap: 8px; }
        .op-label { font: 600 10px ui-monospace, monospace; letter-spacing: 0.12em; color: #7eb0ff; margin-top: 12px; }
        .op-input, .op-textarea {
          width: 100%; padding: 12px 14px; border-radius: 10px;
          border: 1px solid #ffffff14; background: #0e1218; color: #f2f4f7;
          font: 14px/1.5 ui-sans-serif, system-ui, sans-serif;
        }
        .op-textarea { resize: vertical; min-height: 100px; }
        .op-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
        .op-alt { background: transparent !important; color: #f2f4f7 !important; border: 1px solid #ffffff22; }
        .op-out {
          margin: 0; padding: 20px; border-radius: 12px; border: 1px solid #ffffff14;
          background: #0a0e14; color: #a5adba; font: 12px/1.55 ui-monospace, monospace;
          overflow: auto; max-height: 560px; white-space: pre-wrap;
        }
        @media (max-width: 850px) { .op-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
