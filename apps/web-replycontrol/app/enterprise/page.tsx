import Link from "next/link";
import { services } from "../services/catalog";

export const metadata = { title: "Enterprise Delivery | MindReply", description: "Innovation, data, modernisation, security, managed services, digital workplace and training through one accountable delivery path." };

const stages = [
  ["01", "Assess", "Establish the baseline, highest-value gap, constraints and evidence requirements."],
  ["02", "Design", "Translate the requirement into an architecture, delivery scope and measurable outcome."],
  ["03", "Build", "Implement the selected capability with testing, security controls and release discipline."],
  ["04", "Operate", "Monitor, maintain and continuously improve the live capability."],
  ["05", "Prove", "Retain deployment, runtime, security and outcome evidence for review."],
];

export default function EnterprisePage() {
  return <main className="mc-page">
    <nav className="mc-nav" aria-label="Primary navigation"><Link className="mc-brand" href="/">MindReply<small>OPERATING SYSTEM</small></Link><div className="mc-nav-center"><Link href="/platform">Platform</Link><Link href="/operations">Operations</Link><Link href="/services">Services</Link><Link href="/regions">Regions</Link><Link href="/evidence">Evidence</Link></div><div className="mc-nav-right"><span className="mc-state"><i className="mc-dot"/>ENTERPRISE DELIVERY</span></div></nav>
    <section className="mc-hero"><div><p className="mc-kicker"><i/>INNOVATION & INTELLIGENCE / ENTERPRISE</p><h1>From technology ambition to <em>working infrastructure.</em></h1><p className="lead">Innovation, data, modernisation, security and operations connected through one accountable delivery path — with evidence at every stage.</p><div className="mc-actions"><Link className="mc-primary" href="/audit">Start with an assessment ↗</Link><Link className="mc-secondary" href="/contact">Discuss a requirement</Link></div></div><aside className="mc-console"><div className="mc-console-top"><span>DELIVERY CONTRACT</span><b>END TO END</b></div><div className="mc-console-main"><span className="mc-console-label">Commercial entry</span><div className="mc-verdict"><strong>Assess → Build → Operate.</strong><span>PROOF REQUIRED</span></div><p>Begin with a bounded assessment. Expand only when scope, ownership, security and implementation evidence are clear.</p></div></aside></section>
    <section className="mc-section" aria-labelledby="capabilities-title"><div className="mc-section-head"><span>CAPABILITIES</span><h2 id="capabilities-title">The full technology lifecycle, available as one engagement or connected workstreams.</h2></div><div className="mc-rail">{services.map(s => <Link className="mc-module" key={s.slug} href={`/services/${s.slug}`}><span className="num">{s.number}</span><h3>{s.title}</h3><p>{s.promise}</p><ul>{s.outcomes.map(o => <li key={o}>{o}</li>)}</ul></Link>)}</div></section>
    <section className="mc-section" aria-labelledby="stages-title"><div className="mc-section-head"><span>DELIVERY SYSTEM</span><h2 id="stages-title">A controlled path from requirement to verified operation.</h2></div><div className="mc-principle-list">{stages.map(([n,t,d]) => <article className="mc-principle" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>
    <section className="mc-section" aria-labelledby="regional-title"><div className="mc-section-head"><span>REGIONAL SCALE</span><h2 id="regional-title">Global standards. Regional execution.</h2></div><div className="mc-link-grid"><Link className="mc-link-card" href="/regions/europe"><span>EUROPE</span><b>Transformation, resilience and data-aware delivery ↗</b></Link><Link className="mc-link-card" href="/regions/bulgaria"><span>BULGARIA</span><b>Regional delivery base and SME digitalisation ↗</b></Link><Link className="mc-link-card" href="/regions/uk-global"><span>UK & GLOBAL</span><b>Enterprise modernisation and international delivery ↗</b></Link><Link className="mc-link-card" href="/regions/global"><span>GLOBAL</span><b>Cross-border delivery with shared standards ↗</b></Link></div></section>
    <section className="mc-closing"><p className="mc-kicker"><i/>NEXT STEP</p><h2>Choose the highest-value starting point.</h2><p>We establish the baseline first, then connect implementation, managed operation, security and capability transfer around the outcome.</p><Link className="mc-primary" href="/audit">Request an assessment ↗</Link></section>
  </main>;
}
