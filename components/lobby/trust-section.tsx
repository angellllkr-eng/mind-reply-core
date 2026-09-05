import Link from 'next/link'
import { ArrowRight, Fingerprint, Lock, ShieldCheck, Sparkles, TimerReset, Vault } from 'lucide-react'

const pillars = [
  {
    icon: Lock,
    title: 'Bank-grade transport',
    body: 'Every page is served over enforced HTTPS with two-year HSTS preload, a strict Content-Security-Policy, and no third-party scripts. Nothing loads that we did not ship.',
  },
  {
    icon: Vault,
    title: 'Your funds, ring-fenced',
    body: 'Demo balances are held in an isolated ledger with every stake, win and deposit written as an immutable entry. Limits are enforced at the ledger, not the button.',
  },
  {
    icon: Fingerprint,
    title: 'Zero data brokering',
    body: 'No analytics beacons, no ad pixels, no cross-site cookies. Your session never leaves this origin and clickjacking is blocked at the browser level.',
  },
  {
    icon: TimerReset,
    title: 'Safer by design',
    body: 'Reality checks every 30 minutes, deposit and loss limits you can only tighten instantly, and a one-tap 24-hour to 6-month break that pauses everything.',
  },
]

const reasons = [
  ['170', 'original titles you will not find in any other lobby'],
  ['24', 'live tables with published limits and open-seat counts'],
  ['0', 'third-party trackers, ad networks or data resellers'],
  ['4', 'loyalty tiers with perks that unlock on play, not spend'],
]

export function TrustSection() {
  return (
    <section className="trust" id="why-nova" aria-labelledby="trust-title">
      <div className="trust-head">
        <div>
          <p className="eyebrow"><ShieldCheck size={14} /> WHY NOVA</p>
          <h2 id="trust-title">Built like a bank.<br /><span>Feels like a members&apos; club.</span></h2>
        </div>
        <p className="page-lede">Most lobbies compete on bonus size. Nova competes on the parts you cannot see: how your money is held, what leaves your browser, and how quickly you can stop. That is why we are chosen over the rest.</p>
      </div>

      <div className="trust-grid">
        {pillars.map((p) => (
          <article key={p.title} className="trust-card">
            <span className="trust-icon"><p.icon size={20} /></span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>

      <div className="trust-foot">
        <dl className="trust-numbers">
          {reasons.map(([n, label]) => <div key={label}><dt>{n}</dt><dd>{label}</dd></div>)}
        </dl>
        <div className="trust-cta">
          <p className="eyebrow"><Sparkles size={13} /> EXCLUSIVE BY INVITATION</p>
          <p>Membership is capped so the live floor stays uncrowded and support stays human. Demo accounts get full access today.</p>
          <Link href="/safer-gambling" className="outline-button">See our safeguards <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  )
}
