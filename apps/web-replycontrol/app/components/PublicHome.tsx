import { LocaleSwitcher } from "./LocaleSwitcher";
import { copy, type SupportedLocale } from "../lib/locales";

const AUDIT_CHECKOUT = "https://book.stripe.com/8x2aER4owd8c1TG4Ku63K00";

export function PublicHome({ locale }: { locale: SupportedLocale }) {
  const t = copy[locale];
  const cards = [
    { code: "01", href: AUDIT_CHECKOUT, external: true },
    { code: "02", href: "https://a11-k.space", external: true },
    { code: "03", href: AUDIT_CHECKOUT, external: true },
  ];

  return <main className="mc-page">
    <nav className="mc-nav" aria-label="Primary navigation">
      <a className="mc-brand" href="#top">MindReply<small>PROOFLINE</small></a>
      <div className="mc-nav-center"><a href="#estate">{t.nav.estate}</a><a href="#principles">{t.nav.discipline}</a><a href="#elysium">{t.nav.substrate}</a></div>
      <div className="mc-nav-right"><span className="mc-state"><i className="mc-dot"/>SYSTEM LIVE</span><LocaleSwitcher locale={locale} /></div>
    </nav>

    <section className="mc-hero" id="top" aria-labelledby="hero-title">
      <div>
        <p className="mc-kicker"><i/>OWNER-GOVERNED OPERATIONS</p>
        <h1 id="hero-title">Systems you can <em>answer for.</em></h1>
        <p className="lead">{t.lead}</p>
        <div className="mc-actions"><a className="mc-primary" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">{t.primaryAction} <span aria-hidden="true">↗</span></a><a className="mc-secondary" href="https://a11-k.space">{t.secondaryAction}</a></div>
      </div>
      <aside className="mc-console" aria-label="MindReply operating state">
        <div className="mc-console-top"><span>PROOFLINE / CURRENT STATE</span><b>VERIFIED PATH</b></div>
        <div className="mc-console-main">
          <span className="mc-console-label">Decision posture</span>
          <div className="mc-verdict"><strong>Human authority retained.</strong><span>READY</span></div>
          <div className="mc-lanes">
            <div className="mc-lane"><span>Intent</span><div className="mc-lane-bar"><i style={{width:"96%"}}/></div><b>COMPILED</b></div>
            <div className="mc-lane"><span>Evidence</span><div className="mc-lane-bar"><i style={{width:"91%"}}/></div><b>TRACEABLE</b></div>
            <div className="mc-lane"><span>Release</span><div className="mc-lane-bar"><i style={{width:"88%"}}/></div><b>GATED</b></div>
            <div className="mc-lane"><span>Rollback</span><div className="mc-lane-bar"><i style={{width:"100%"}}/></div><b>AVAILABLE</b></div>
          </div>
          <div className="mc-console-foot"><span>LAST REVIEW · {locale.toUpperCase()}</span><b>NO BLIND RELEASES</b></div>
        </div>
      </aside>
    </section>

    <section className="mc-section" id="estate" aria-labelledby="estate-title">
      <div className="mc-section-head"><span>{t.estate.eyebrow}</span><h2 id="estate-title">An operating estate, not a feature list.</h2></div>
      <div className="mc-rail">{t.estate.cards.map((item, index) => <article className="mc-module" key={cards[index].code}><span className="num">{cards[index].code}</span><h3>{item.title}</h3><p>{item.body}</p><a href={cards[index].href} target="_blank" rel="noreferrer">{item.action} ↗</a></article>)}</div>
    </section>

    <section className="mc-section" id="principles" aria-labelledby="principles-title">
      <div className="mc-principles"><div className="mc-section-head"><span>{t.principles.eyebrow}</span><h2 id="principles-title">Make every consequential action legible.</h2></div><div className="mc-principle-list">{t.principles.items.map(([title, body], index) => <article className="mc-principle" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div>
    </section>

    <section className="mc-section" id="elysium" aria-labelledby="elysium-title">
      <div className="mc-section-head"><span>SOVEREIGN SUBSTRATE</span><h2 id="elysium-title">Quality is a wall. Memory is a receipt.</h2></div>
      <p className="lead" style={{maxWidth:"44rem"}}>The Operator Match uses the same-origin Aurelia compiler, Lumenforge gate, and Veridex pack stages. Each stage remains reviewable and consequential actions remain human-approved.</p>
      <div className="mc-substrate"><div><code>AURELIA / POLICY</code><h3>Intent becomes policy</h3><p>Expert intent is compiled into readable, versioned rules without removing human authority.</p></div><div><code>LUMENFORGE / GATE</code><h3>Bad output meets a wall</h3><p>Bounded evaluations can block, rewrite once, or fall back before an output is released.</p></div><div><code>VERIDEX / RECEIPT</code><h3>Every step leaves evidence</h3><p>Delivery packs and signed envelopes preserve the review path and the resulting state.</p></div><div><code>CROWNLINE / COMMAND</code><h3>Ownership stays explicit</h3><p>Approval, release and rollback remain visible responsibilities rather than hidden system behavior.</p></div></div>
    </section>

    <section className="mc-closing" aria-label="Repository audit call to action"><p className="mc-kicker"><i/>REALITY DELTA</p><h2>{t.closing.title}</h2><p>{t.closing.body}</p><a className="mc-primary" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">{t.closing.action} ↗</a></section>
    <footer className="mc-footer"><span>MindReply · Proofline</span><span>People decide · Evidence leads · Releases reverse</span></footer>
  </main>;
}
