const CHECKOUT = "https://book.stripe.com/8x2aER4owd8c1TG4Ku63K00";

const checks = [
  ["01", "Release engineering", "Branches, CI/CD, environments, deployment controls and rollback readiness."],
  ["02", "Automation reliability", "Python and workflow automation reviewed for failure handling, maintainability and operational risk."],
  ["03", "Security & secrets", "Secret exposure paths, permissions, dependency risk and practical control gaps."],
  ["04", "Revenue-to-delivery", "Payment, intake, fulfillment and customer handoff paths checked for avoidable leakage."],
  ["05", "Operational evidence", "Health signals, logs, ownership and release evidence checked against what the system can actually prove."],
  ["06", "Margin opportunities", "Concrete reliability, cost and delivery improvements prioritized by business impact."],
];

export default function AuditPage() {
  return <main className="mc-page">
    <nav className="mc-nav" aria-label="Primary navigation">
      <a className="mc-brand" href="/">MindReply<small>OPERATING SYSTEM</small></a>
      <div className="mc-nav-center"><a href="/platform">Platform</a><a href="/services">Services</a><a href="/operations">Operations</a><a href="/evidence">Evidence</a></div>
      <div className="mc-nav-right"><span className="mc-state"><i className="mc-dot"/>SYSTEM LIVE</span><a href="/contact">Contact</a></div>
    </nav>

    <section className="mc-hero" aria-labelledby="audit-title">
      <div>
        <p className="mc-kicker"><i/>GITHUB + PYTHON PROFIT AUDIT</p>
        <h1 id="audit-title">Find what is slowing delivery, increasing risk, or leaking margin.</h1>
        <p className="lead">A focused seven-day technical-commercial review of your repositories, automation and delivery path. We turn system evidence into a short, prioritized action plan.</p>
        <div className="mc-actions"><a className="mc-primary" href={CHECKOUT} target="_blank" rel="noreferrer">Start the €3,000 audit ↗</a><a className="mc-secondary" href="/contact">Ask a question</a></div>
      </div>
      <aside className="mc-console" aria-label="Audit outcome">
        <div className="mc-console-top"><span>AUDIT / OUTPUT</span><b>7 DAYS</b></div>
        <div className="mc-console-main"><span className="mc-console-label">Deliverable</span><div className="mc-verdict"><strong>Evidence-led findings.</strong><span>PRIORITIZED</span></div><div className="mc-lanes">{[["Risk","Ranked"],["Reliability","Scored"],["Margin","Mapped"],["Actions","Sequenced"]].map(([a,b])=><div className="mc-lane" key={a}><span>{a}</span><div className="mc-lane-bar"><i style={{width:"100%"}}/></div><b>{b}</b></div>)}</div></div>
      </aside>
    </section>

    <section className="mc-section" aria-labelledby="checks-title">
      <div className="mc-section-head"><span>WHAT WE CHECK</span><h2 id="checks-title">The review follows the path from code to commercial outcome.</h2></div>
      <div className="mc-rail">{checks.map(([n,title,body])=><article className="mc-module" key={n}><span className="num">{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="mc-section" aria-labelledby="after-title">
      <div className="mc-section-head"><span>AFTER THE REVIEW</span><h2 id="after-title">Leave with decisions, not another report.</h2></div>
      <div className="mc-link-grid"><article className="mc-link-card"><span>01 · Findings</span><b>Evidence</b></article><article className="mc-link-card"><span>02 · Priorities</span><b>Impact</b></article><article className="mc-link-card"><span>03 · Remediation</span><b>Sequence</b></article><article className="mc-link-card"><span>04 · Operations</span><b>Control</b></article></div>
    </section>

    <section className="mc-closing"><p className="mc-kicker"><i/>REALITY DELTA</p><h2>Know what the system actually does before you scale it.</h2><p>The audit is designed to establish a factual baseline, expose the highest-value gaps, and give your team a practical route from current state to controlled execution.</p><a className="mc-primary" href={CHECKOUT} target="_blank" rel="noreferrer">Start the audit ↗</a></section>
    <footer className="mc-footer"><span>MindReply</span><span>OPERATE · EVIDENCE · RELEASE</span><div className="mc-footer-links"><a href="/status">System status ↗</a><a href="/contact">Contact ↗</a></div></footer>
  </main>;
}
