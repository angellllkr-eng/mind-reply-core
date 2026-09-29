import Link from "next/link";
import { getRegion, regions, services } from "../../services/catalog";

export function generateStaticParams() { return regions.map(({ slug }) => ({ slug })); }

const regionalFocus: Record<string, string[]> = {
  global: ["Cross-border architecture and delivery", "Shared security and evidence standards", "Distributed managed operations"],
  europe: ["Data-aware transformation", "Resilient infrastructure and applications", "Security, governance and capability transfer"],
  bulgaria: ["SME digitalisation", "Regional engineering and delivery", "Workforce capability uplift"],
  "uk-global": ["Enterprise modernisation", "Managed operations and security", "International implementation and support"],
};

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return <main className="mc-page"><section className="mc-closing"><h1>Region not found.</h1><Link className="mc-primary" href="/regions">Return to regions ↗</Link></section></main>;
  const focus = regionalFocus[slug] ?? regionalFocus.global;
  return <main className="mc-page">
    <nav className="mc-nav" aria-label="Primary navigation"><Link className="mc-brand" href="/">MindReply<small>OPERATING SYSTEM</small></Link><div className="mc-nav-center"><Link href="/platform">Platform</Link><Link href="/operations">Operations</Link><Link href="/services">Services</Link><Link href="/regions">Regions</Link><Link href="/evidence">Evidence</Link></div><div className="mc-nav-right"><span className="mc-state"><i className="mc-dot"/>REGIONAL DELIVERY</span></div></nav>
    <section className="mc-hero"><div><p className="mc-kicker"><i/>REGION / {region.name.toUpperCase()}</p><h1>{region.name}<br/><em>delivery view.</em></h1><p className="lead">{region.mode}. The same capability and evidence model is adapted to the market rather than rebuilt from scratch.</p><div className="mc-actions"><Link className="mc-primary" href="/audit">Start with an assessment ↗</Link><Link className="mc-secondary" href="/enterprise">Enterprise delivery</Link></div></div><aside className="mc-console"><div className="mc-console-top"><span>REGIONAL CONTRACT</span><b>SHARED CORE</b></div><div className="mc-console-main"><span className="mc-console-label">Operating principle</span><div className="mc-verdict"><strong>Standardise the core. Adapt the edge.</strong><span>DEFINED</span></div><p>Scope, hosting, data handling, partners, language and support can be determined during assessment and recorded as delivery requirements.</p></div></aside></section>
    <section className="mc-section"><div className="mc-section-head"><span>REGIONAL FOCUS</span><h2>Where this market-specific layer adds value.</h2></div><div className="mc-rail">{focus.map((item, i) => <article className="mc-module" key={item}><span className="num">0{i + 1}</span><h3>{item}</h3><p>Selected during discovery and translated into an explicit implementation and evidence plan.</p></article>)}</div></section>
    <section className="mc-section"><div className="mc-section-head"><span>CAPABILITIES</span><h2>Deploy the same eight capabilities through the regional operating model.</h2></div><div className="mc-link-grid">{services.map(s => <Link className="mc-link-card" key={s.slug} href={`/services/${s.slug}`}><span>{s.number} · CAPABILITY</span><b>{s.title} ↗</b></Link>)}</div></section>
    <section className="mc-section"><div className="mc-section-head"><span>CONTROL</span><h2>Regional differences become explicit delivery requirements.</h2></div><div className="mc-principle-list"><article className="mc-principle"><span>01</span><div><h3>Data & hosting</h3><p>Define data location, access, retention and hosting requirements before implementation.</p></div></article><article className="mc-principle"><span>02</span><div><h3>Security & access</h3><p>Set identity, permissions, secrets, monitoring and escalation controls appropriate to the engagement.</p></div></article><article className="mc-principle"><span>03</span><div><h3>Evidence & handoff</h3><p>Retain the artefacts needed to verify release, runtime health, security posture and outcome.</p></div></article></div></section>
    <section className="mc-closing"><p className="mc-kicker"><i/>NEXT STEP</p><h2>Establish the regional baseline first.</h2><p>The assessment determines the real scope. No regional capability is represented as live until deployment and runtime evidence exists.</p><Link className="mc-primary" href="/audit">Request an assessment ↗</Link></section>
  </main>;
}
