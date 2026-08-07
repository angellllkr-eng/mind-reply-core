const PROFIT_AUDIT_CHECKOUT =
  "https://book.stripe.com/8x2aER4owd8c1TG4Ku63K00";

const outcomes = [
  {
    title: "1. Secure intake",
    body: "Share repository scope after checkout. Never send passwords, private keys, tokens, or secret values.",
  },
  {
    title: "2. Evidence-led review",
    body: "Every important finding links to code, configuration, workflow, or reproducible check evidence.",
  },
  {
    title: "3. Actionable delivery",
    body: "Receive a prioritized plan separating urgent fixes, revenue opportunities, and longer-term architecture.",
  },
];

export default function HomePage() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <span className="brand">MindReply</span>
        <span className="status">Live checkout verified</span>
      </nav>

      <section className="hero" aria-labelledby="audit-title">
        <div>
          <p className="eyebrow">Seven-day repository clarity</p>
          <h1 id="audit-title">Turn GitHub uncertainty into a profit plan.</h1>
          <p className="lead">
            A focused GitHub + Python audit that finds security risk, delivery
            friction, and the three highest-value automation opportunities—backed
            by repository evidence.
          </p>
          <div className="actions">
            <a
              className="button"
              href={PROFIT_AUDIT_CHECKOUT}
              target="_blank"
              rel="noreferrer"
            >
              Book the audit — €3,000
            </a>
            <span className="note">One-time payment · delivery in 7 days</span>
          </div>
        </div>

        <aside className="price" aria-label="Engagement summary">
          <span>Fixed engagement</span>
          <strong>€3,000</strong>
          <p>
            Inventory, code and dependency review, CI/CD findings, three
            automation opportunities, executive report, and prioritized action
            plan.
          </p>
        </aside>
      </section>

      <section className="outcomes" aria-label="How the audit works">
        {outcomes.map((outcome) => (
          <article className="outcome" key={outcome.title}>
            <h2>{outcome.title}</h2>
            <p>{outcome.body}</p>
          </article>
        ))}
      </section>

      <section className="trust" aria-label="Approval and security boundary">
        <strong>Read-only by default.</strong> No merges, deployments, billing
        changes, or external communication occur without explicit approval.
      </section>

      <footer>MindReply · GitHub + Python Profit Audit</footer>
    </main>
  );
}
