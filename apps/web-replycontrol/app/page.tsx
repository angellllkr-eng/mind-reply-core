const AUDIT_CHECKOUT = "https://book.stripe.com/8x2aER4owd8c1TG4Ku63K00";

const estate = [
  { code: "01", title: "Crownwork", body: "Proof-bearing operating circuits for teams that need measurable value without surrendering human command.", action: "Map the first knot", href: AUDIT_CHECKOUT },
  { code: "02", title: "A11-K", body: "A public estate of local-first tools for objective framing, transparent routing, release control, and narrative clarity.", action: "Enter A11-K", href: "https://a11-k.space" },
  { code: "03", title: "Repository Clarity", body: "A seven-day GitHub and Python audit separating security exposure, delivery drag, and high-value automation paths.", action: "Book the €3,000 audit", href: AUDIT_CHECKOUT },
];

const principles = [
  ["Proof before permission", "Wider authority follows accepted performance; it is never assumed."],
  ["Human command remains visible", "Every consequential action has a named owner and a clear stop rule."],
  ["Private machinery stays private", "Public surfaces reveal the value and boundary—not credentials or internal control logic."],
];

export default function HomePage() {
  return <main>
    <nav className="nav" aria-label="Primary navigation"><a className="brand" href="#top">MindReply<span>®</span></a><div className="navLinks"><a href="#estate">Estate</a><a href="#principles">Principles</a><a href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">Start</a></div></nav>
    <section className="hero" id="top" aria-labelledby="hero-title"><div className="heroCopy"><p className="eyebrow">Proof-bearing intelligence systems</p><h1 id="hero-title">Make intelligence answerable to the work.</h1><p className="lead">MindReply turns costly operational knots into calm, measurable systems. People retain judgment. Every important action carries an authority line. Every result leaves a proof trail.</p><div className="actions"><a className="button" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">Begin with repository clarity</a><a className="textLink" href="https://a11-k.space">Explore A11-K <span aria-hidden="true">↗</span></a></div></div><aside className="signal" aria-label="MindReply operating principle"><div className="signalHead"><span>Signal window</span><span className="live">OWNER-LED</span></div><div className="signalCore"><span>One operating rule</span><strong>Responsibility follows evidence.</strong></div><div className="signalRows"><div><span>Proof</span><b>Visible</b></div><div><span>Authority</span><b>Named</b></div><div><span>Release</span><b>Reversible</b></div></div></aside></section>
    <section className="section" id="estate" aria-labelledby="estate-title"><div className="sectionHead"><p className="eyebrow">The estate</p><h2 id="estate-title">Different surfaces. One discipline.</h2></div><div className="estateGrid">{estate.map(item => <article className="estateCard" key={item.code}><span className="code">{item.code}</span><h3>{item.title}</h3><p>{item.body}</p><a href={item.href} target="_blank" rel="noreferrer">{item.action} <span aria-hidden="true">↗</span></a></article>)}</div></section>
    <section className="section principles" id="principles" aria-labelledby="principles-title"><div className="sectionHead"><p className="eyebrow">Operating discipline</p><h2 id="principles-title">Quiet systems. Visible command.</h2></div><div className="principleList">{principles.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
    <section className="closing" aria-label="Repository audit call to action"><p className="eyebrow">A clear first passage</p><h2>Start with what already exists.</h2><p>One bounded, read-only review of the repository estate. No merges, deployments, billing changes, or external communication without explicit approval.</p><a className="button" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">Book the seven-day audit — €3,000</a></section>
    <footer><span>MindReply · Proof-bearing operations</span><span>Human command · Evidence · Reversibility</span></footer>
  </main>;
}
