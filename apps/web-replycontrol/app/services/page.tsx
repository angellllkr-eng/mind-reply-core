const services = [
  {
    number: "01",
    title: "Innovation & Intelligence",
    body: "Turn complex signals into practical decisions with predictive insight, intelligent workflows, and systems that help teams act with confidence.",
    outcomes: ["Decision intelligence", "Workflow automation", "Predictive insight"],
  },
  {
    number: "02",
    title: "Data & Analytics",
    body: "Create a dependable data foundation for measurement, reporting, forecasting, and operational visibility—from source systems to decision-ready information.",
    outcomes: ["Data architecture", "Analytics foundations", "Executive visibility"],
  },
  {
    number: "03",
    title: "IT Infrastructure Modernisation",
    body: "Modernise infrastructure around resilience, scalability, security, and cost control across cloud, hybrid, and connected operating environments.",
    outcomes: ["Cloud transformation", "Resilience engineering", "Infrastructure optimisation"],
  },
  {
    number: "04",
    title: "Application Modernisation & Development",
    body: "Replace brittle legacy paths or build new cloud-native applications with cleaner architecture, stronger delivery controls, and better user experiences.",
    outcomes: ["Legacy modernisation", "Cloud-native development", "Product engineering"],
  },
  {
    number: "05",
    title: "Security",
    body: "Reduce exposure with practical security architecture, proactive controls, threat-aware operations, and zero-trust principles built into delivery.",
    outcomes: ["Security architecture", "Threat readiness", "Zero-trust controls"],
  },
  {
    number: "06",
    title: "Managed Services",
    body: "Keep critical systems monitored, maintained, and continuously improved so internal teams can focus on customers, products, and growth.",
    outcomes: ["24/7-ready monitoring", "Operational optimisation", "Release assurance"],
  },
  {
    number: "07",
    title: "Digital Workplace",
    body: "Connect people, applications, and information through secure, collaborative digital work environments designed for productive teams anywhere.",
    outcomes: ["Workplace architecture", "Collaboration", "Secure access"],
  },
  {
    number: "08",
    title: "Training",
    body: "Build practical capability around the systems you deploy, with role-based enablement that helps people adopt technology and use it well.",
    outcomes: ["Role-based enablement", "Technical training", "Adoption programmes"],
  },
];

export const metadata = {
  title: "Services | MindReply",
  description: "Integrated intelligence, data, technology, security, operations, workplace and training services.",
};

export default function ServicesPage() {
  return (
    <main className="mc-page">
      <nav className="mc-nav" aria-label="Primary navigation">
        <a className="mc-brand" href="/">MindReply<small>OPERATING SYSTEM</small></a>
        <div className="mc-nav-center">
          <a href="/platform">Platform</a><a href="/operations">Operations</a><a href="/services">Services</a><a href="/evidence">Evidence</a>
        </div>
        <div className="mc-nav-right"><span className="mc-state"><i className="mc-dot"/>SYSTEM LIVE</span></div>
      </nav>

      <section className="mc-hero" aria-labelledby="services-title">
        <div>
          <p className="mc-kicker"><i/>CAPABILITIES / GLOBAL DELIVERY</p>
          <h1 id="services-title">Technology that moves from <em>intelligence to operation.</em></h1>
          <p className="lead">One connected delivery model across intelligence, data, infrastructure, applications, security, operations, workplace and people.</p>
          <div className="mc-actions"><a className="mc-primary" href="/contact">Discuss a requirement <span aria-hidden="true">↗</span></a><a className="mc-secondary" href="/audit">Request an assessment</a></div>
        </div>
        <aside className="mc-console" aria-label="Delivery model">
          <div className="mc-console-top"><span>DELIVERY MODEL</span><b>END TO END</b></div>
          <div className="mc-console-main"><span className="mc-console-label">From challenge to measurable outcome</span><div className="mc-verdict"><strong>Assess → Build → Operate.</strong><span>READY</span></div><p>Every engagement can begin with a focused assessment and expand into implementation, managed operation, and capability transfer.</p></div>
        </aside>
      </section>

      <section className="mc-section" aria-labelledby="capabilities-title">
        <div className="mc-section-head"><span>CORE CAPABILITIES</span><h2 id="capabilities-title">Eight connected capabilities. One accountable delivery path.</h2></div>
        <div className="mc-rail">
          {services.map((service) => (
            <article className="mc-module" key={service.number}>
              <span className="num">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <ul>{service.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mc-section" aria-labelledby="model-title">
        <div className="mc-section-head"><span>HOW WE ENGAGE</span><h2 id="model-title">Start where the risk or opportunity is highest.</h2></div>
        <div className="mc-link-grid">
          <a className="mc-link-card" href="/audit"><span>01 · Assess</span><b>Find the highest-value gaps ↗</b></a>
          <a className="mc-link-card" href="/platform"><span>02 · Build</span><b>Implement the required capability ↗</b></a>
          <a className="mc-link-card" href="/operations"><span>03 · Operate</span><b>Monitor, improve and assure ↗</b></a>
          <a className="mc-link-card" href="/contact"><span>04 · Enable</span><b>Transfer capability to your team ↗</b></a>
        </div>
      </section>

      <section className="mc-closing"><p className="mc-kicker"><i/>REALITY DELTA</p><h2>Move from a technology ambition to a system that can prove its value.</h2><p>We connect strategy, engineering and operations so the outcome is measurable in the systems people actually use.</p><a className="mc-primary" href="/contact">Start the conversation ↗</a></section>
      <footer className="mc-footer"><span>MindReply</span><span>INTELLIGENCE · TECHNOLOGY · OPERATIONS</span><div className="mc-footer-links"><a href="/status">System status ↗</a><a href="/contact">Contact ↗</a></div></footer>
    </main>
  );
}
