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

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="#top">MindReply<span>®</span></a>
      <div className="navLinks">
        <a href="#estate">{t.nav.estate}</a><a href="#principles">{t.nav.discipline}</a><a href="#elysium">{t.nav.substrate}</a><a href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">{t.nav.begin}</a>
      </div>
      <LocaleSwitcher locale={locale} />
    </nav>

    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="heroCopy">
        <p className="eyebrow">{t.eyebrow}</p><h1 id="hero-title">{t.title}</h1><p className="lead">{t.lead}</p>
        <div className="actions"><a className="button" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">{t.primaryAction}</a><a className="textLink" href="https://a11-k.space">{t.secondaryAction} <span aria-hidden="true">↗</span></a></div>
      </div>
      <aside className="signal" aria-label={t.signal.title}>
        <div className="signalHead"><span>{t.signal.title}</span><span className="live">OWNER-LED</span></div>
        <div className="signalCore"><span>{locale.toUpperCase()} · HUMAN REVIEW</span><strong>{t.signal.rule}</strong></div>
        <div className="signalRows"><div><span>Proof</span><b>{t.signal.proof}</b></div><div><span>Authority</span><b>{t.signal.authority}</b></div><div><span>Release</span><b>{t.signal.release}</b></div></div>
      </aside>
    </section>

    <section className="section" id="estate" aria-labelledby="estate-title"><div className="sectionHead"><p className="eyebrow">{t.estate.eyebrow}</p><h2 id="estate-title">{t.estate.title}</h2></div><div className="estateGrid">{t.estate.cards.map((item, index) => <article className="estateCard" key={cards[index].code}><span className="code">{cards[index].code}</span><h3>{item.title}</h3><p>{item.body}</p><a href={cards[index].href} target="_blank" rel="noreferrer">{item.action} <span aria-hidden="true">↗</span></a></article>)}</div></section>

    <section className="section principles" id="principles" aria-labelledby="principles-title"><div className="sectionHead"><p className="eyebrow">{t.principles.eyebrow}</p><h2 id="principles-title">{t.principles.title}</h2></div><div className="principleList">{t.principles.items.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>

    <section className="section" id="elysium" aria-labelledby="elysium-title"><div className="sectionHead"><p className="eyebrow">Sovereign substrate</p><h2 id="elysium-title">Elysium — quality as a wall, memory as a receipt</h2></div><p className="lead" style={{ maxWidth: "44rem" }}>The Operator Match uses the same-origin Aurelia compiler, Lumenforge gate, and Veridex pack stages. Each stage remains reviewable and any consequential action remains human-approved.</p><div className="estateGrid"><article className="estateCard"><span className="code">AURELIA</span><h3>Intent becomes policy</h3><p>Expert intent is compiled into readable, versioned rules. It does not substitute human approval.</p></article><article className="estateCard"><span className="code">LUMENFORGE</span><h3>Bad output meets a wall</h3><p>Bounded evaluations can block, rewrite once, or fall back before an output is released.</p></article><article className="estateCard"><span className="code">VERIDEX</span><h3>Every step leaves a receipt</h3><p>Delivery packs and signed envelopes provide a record of the review path.</p></article></div></section>

    <section className="closing" aria-label="Repository audit call to action"><p className="eyebrow">{t.closing.eyebrow}</p><h2>{t.closing.title}</h2><p>{t.closing.body}</p><a className="button" href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">{t.closing.action}</a></section>
    <footer><span>MindReply · Answerable operations</span><span>People decide · Evidence leads · Releases reverse</span></footer>
  </main>;
}
