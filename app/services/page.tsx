import Link from "next/link";

const capabilities = [
  ["01", "Innovation & Intelligence", "Turn complex signals into predictive insight, intelligent workflows, and decision support that can be measured and governed."],
  ["02", "Data & Analytics", "Build dependable data foundations, operational dashboards, reporting pipelines, and analytics that turn information into action."],
  ["03", "IT Infrastructure Modernisation", "Modernise cloud and hybrid estates for resilience, scale, cost control, observability, and safer change."],
  ["04", "Application Modernisation & Development", "Replace fragile legacy paths or build cloud-native applications with clear interfaces, delivery controls, and production evidence."],
  ["05", "Security", "Reduce operational exposure with proactive controls, threat-aware architecture, zero-trust patterns, and verifiable security posture."],
  ["06", "Managed Services", "Keep critical systems monitored, maintained, optimised, and recoverable through defined operating procedures and measurable service health."],
  ["07", "Digital Workplace", "Connect people to secure, collaborative tools and workflows that work across locations without adding unnecessary operational friction."],
  ["08", "Training", "Close capability gaps with practical enablement, runbooks, workshops, and role-specific programmes tied to real technology adoption."],
] as const;

const delivery = [
  ["01", "Discover", "Map the current estate, objectives, constraints, risks, and measurable outcomes."],
  ["02", "Design", "Define the target architecture, service boundaries, security controls, data flows, and delivery plan."],
  ["03", "Build", "Implement applications, integrations, automation, infrastructure, and operational interfaces."],
  ["04", "Prove", "Test health, readiness, security, critical journeys, observability, and rollback before promotion."],
  ["05", "Operate", "Monitor the live estate, capture evidence, manage incidents, and continuously improve performance."],
] as const;

export default function ServicesPage() {
  return (
    <main className="mc-page">
      <nav className="mc-nav" aria-label="Primary navigation">
        <Link className="mc-brand" href="/">MindReply<small>OPERATIONS</small></Link>
        <div className="mc-nav-center">
          <Link href="/">Home</Link><Link href="/platform">Platform</Link><Link href="/services">Services</Link><Link href="/evidence">Evidence</Link><Link href="/status">Status</Link>
        </div>
        <Link className="mc-secondary" href="/contact">Start a conversation</Link>
      </nav>

      <section className="mc-section" style={{paddingTop:"7rem"}}>
        <div className="mc-section-head"><span>GLOBAL DELIVERY · REGIONAL READY</span><h1>Technology that moves from <em>strategy to production.</em></h1></div>
        <p className="lead" style={{maxWidth:"52rem"}}>MindReply combines intelligence, data, modern engineering, security, managed operations, workplace enablement, and training into one delivery model. Every engagement is designed to finish with something usable, measurable, and supportable.</p>
        <div className="mc-actions"><Link className="mc-primary" href="/contact">Request an assessment ↗</Link><Link className="mc-secondary" href="/proof">See the evidence</Link></div>
      </section>

      <section className="mc-section" aria-labelledby="capabilities-title">
        <div className="mc-section-head"><span>CAPABILITY SYSTEM</span><h2 id="capabilities-title">Eight connected capabilities. One accountable delivery path.</h2></div>
        <div className="mc-rail" style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
          {capabilities.map(([n,title,body]) => <article className="mc-module" key={n}><span className="num">{n}</span><h3>{title}</h3><p>{body}</p><Link href="/contact">Discuss this capability ↗</Link></article>)}
        </div>
      </section>

      <section className="mc-section" aria-labelledby="delivery-title">
        <div className="mc-section-head"><span>DELIVERY ENGINE</span><h2 id="delivery-title">Not a catalogue of promises. A path to a working system.</h2></div>
        <div className="mc-rail">
          {delivery.map(([n,title,body]) => <article className="mc-module" key={n}><span className="num">{n}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="mc-section" aria-labelledby="architecture-title">
        <div className="mc-section-head"><span>REFERENCE ARCHITECTURE</span><h2 id="architecture-title">A service layer that can be regionalised without rebuilding the core.</h2></div>
        <div className="mc-link-grid">
          {[["Intelligence", "/agents"],["Data", "/knowledge"],["Infrastructure", "/operations"],["Security", "/control"],["Evidence", "/evidence"],["Operations", "/status"]].map(([title,href]) => <Link className="mc-link-card" href={href} key={href}><span>{title}</span><b>↗</b></Link>)}
        </div>
        <p className="lead" style={{maxWidth:"52rem",marginTop:"2rem"}}>The same platform primitives can support global delivery and regional propositions: local language, sector requirements, funding intelligence, compliance needs, and partner workflows can sit above a common engineering and evidence layer.</p>
      </section>

      <section className="mc-closing"><p className="mc-kicker"><i/>PRODUCTION ASSURANCE</p><h2>Build it. Verify it. Operate it.</h2><p>Start with a focused assessment or modernization target. We turn the result into an implementation plan, working system, and evidence trail rather than leaving the engagement at strategy.</p><Link className="mc-primary" href="/contact">Start the next move ↗</Link></section>
      <footer className="mc-footer"><span>MindReply · Services</span><span>INTELLIGENCE · DATA · TECHNOLOGY · SECURITY · OPERATIONS</span><div className="mc-footer-links"><Link href="/status">System status ↗</Link><Link href="/contact">Contact ↗</Link></div></footer>
    </main>
  );
}
