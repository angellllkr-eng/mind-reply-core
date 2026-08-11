const AUDIT_CHECKOUT = "https://book.stripe.com/8x2aER4owd8c1TG4Ku63K00";

const estate = [
  {
    code: "01",
    title: "Crownwork",
    body: "Operating circuits for teams who need measurable value without handing over the last word. Knots become clearings. People stay in command.",
    action: "Map the first knot",
    href: AUDIT_CHECKOUT,
  },
  {
    code: "02",
    title: "A11-K",
    body: "A public estate of local-first rooms: brief the work, see the route, forge a reversible release, frame the truth without theatre.",
    action: "Enter the estate",
    href: "https://a11-k.space",
  },
  {
    code: "03",
    title: "Repository Clarity",
    body: "Seven days. Read-only. Your GitHub and Python estate sorted into exposure, drag, and paths worth automating—with named stop rules.",
    action: "Book the €3,000 audit",
    href: AUDIT_CHECKOUT,
  },
];

const principles = [
  [
    "Proof before permission",
    "Authority widens only after performance is accepted. It is never assumed from a demo or a slide.",
  ],
  [
    "People keep the last word",
    "Every consequential action has a named hand and a stop rule. Machines wait; people decide.",
  ],
  [
    "Private machinery stays private",
    "Public surfaces show value and boundary—not credentials, not internal levers, not the room where the switches live.",
  ],
];

export default function HomePage() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top">
          MindReply<span>®</span>
        </a>
        <div className="navLinks">
          <a href="#estate">Estate</a>
          <a href="#principles">Discipline</a>
          <a href="#elysium">Substrate</a>
          <a href={AUDIT_CHECKOUT} target="_blank" rel="noreferrer">
            Begin
          </a>
        </div>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="heroCopy">
          <p className="eyebrow">Answerable systems · owner-led</p>
          <h1 id="hero-title">
            Make the work answerable to the people who own it.
          </h1>
          <p className="lead">
            MindReply turns costly operational knots into calm, measurable
            circuits. Judgment stays human. Every important action carries a
            named hand. Every result leaves a proof trail someone can reopen
            months later without guessing.
          </p>
          <div className="actions">
            <a
              className="button"
              href={AUDIT_CHECKOUT}
              target="_blank"
              rel="noreferrer"
            >
              Start with repository clarity
            </a>
            <a className="textLink" href="https://a11-k.space">
              Walk the A11-K estate <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <aside className="signal" aria-label="Operating signal">
          <div className="signalHead">
            <span>Signal window</span>
            <span className="live">OWNER-LED</span>
          </div>
          <div className="signalCore">
            <span>One operating rule</span>
            <strong>Responsibility follows evidence.</strong>
          </div>
          <div className="signalRows">
            <div>
              <span>Proof</span>
              <b>Visible</b>
            </div>
            <div>
              <span>Authority</span>
              <b>Named</b>
            </div>
            <div>
              <span>Release</span>
              <b>Reversible</b>
            </div>
          </div>
        </aside>
      </section>

      <section className="section" id="estate" aria-labelledby="estate-title">
        <div className="sectionHead">
          <p className="eyebrow">The estate</p>
          <h2 id="estate-title">Different rooms. One discipline.</h2>
        </div>
        <div className="estateGrid">
          {estate.map((item) => (
            <article className="estateCard" key={item.code}>
              <span className="code">{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.action} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section principles"
        id="principles"
        aria-labelledby="principles-title"
      >
        <div className="sectionHead">
          <p className="eyebrow">Operating discipline</p>
          <h2 id="principles-title">Quiet systems. Visible command.</h2>
        </div>
        <div className="principleList">
          {principles.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="elysium" aria-labelledby="elysium-title">
        <div className="sectionHead">
          <p className="eyebrow">Sovereign substrate</p>
          <h2 id="elysium-title">Elysium — quality as a wall, memory as a receipt</h2>
        </div>
        <p className="lead" style={{ maxWidth: "44rem" }}>
          Not another dashboard of scores. A closed loop where expert intent
          becomes policy, weak output meets a barrier before a client ever sees
          it, and every consequential step leaves a cryptographic receipt.
        </p>
        <div className="estateGrid">
          <article className="estateCard">
            <span className="code">AURELIA</span>
            <h3>Intent becomes policy</h3>
            <p>
              Domain experts speak in the language of the work. Aurelia compiles
              that into versioned rules people can still read tomorrow.
            </p>
          </article>
          <article className="estateCard">
            <span className="code">LUMENFORGE</span>
            <h3>Bad output meets a wall</h3>
            <p>
              Contracts run at the edge. Block, rewrite once, or fall back—before
              the message leaves the building.
            </p>
          </article>
          <article className="estateCard">
            <span className="code">VERIDEX</span>
            <h3>Every step leaves a receipt</h3>
            <p>
              Immutable envelopes. SHA-256. Signed .epack trails so a decision
              from three months ago can be proven, not reconstructed.
            </p>
          </article>
        </div>
      </section>

      <section className="closing" aria-label="Repository audit call to action">
        <p className="eyebrow">A clear first passage</p>
        <h2>Start with what already exists.</h2>
        <p>
          One bounded, read-only review of the repository estate. No merges. No
          deployments. No billing changes. No external messages without explicit
          approval. Seven days. Evidence you can hold.
        </p>
        <a
          className="button"
          href={AUDIT_CHECKOUT}
          target="_blank"
          rel="noreferrer"
        >
          Book the seven-day audit — €3,000
        </a>
      </section>

      <footer>
        <span>MindReply · Answerable operations</span>
        <span>People decide · Evidence leads · Releases reverse</span>
      </footer>
    </main>
  );
}
