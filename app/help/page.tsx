import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, CreditCard, Gamepad2, LifeBuoy, ShieldCheck, UserRound } from 'lucide-react'

export const metadata: Metadata = { title: 'Help centre', description: 'Answers about accounts, demo credits, games and safer gambling.' }

const topics = [
  {
    icon: UserRound, title: 'Account', items: [
      ['How do I create an account?', 'Choose Join in the header. Nova is a demo, so no ID checks run and a welcome credit of 250 is added instantly. Real operators verify age and identity before play.'],
      ['I forgot my password.', 'Demo accounts are stored only in this browser. Signing in again with the same email restores your balance, favourites and history.'],
      ['How do I close my account?', 'Open Account overview and choose Reset demo data. This clears everything stored locally.'],
    ],
  },
  {
    icon: CreditCard, title: 'Wallet and demo credits', items: [
      ['Are these real funds?', 'No. Every balance, deposit, stake and win is illustrative. Nothing is charged and nothing can be withdrawn.'],
      ['Why was my deposit declined?', 'Deposits are refused while a break is active or when they would exceed your daily deposit limit. Both are shown in the wallet drawer.'],
      ['What are Nova points?', 'Points accrue with every demo spin and move you through the four loyalty tiers. See Rewards for tier perks.'],
    ],
  },
  {
    icon: Gamepad2, title: 'Games', items: [
      ['What does RTP mean?', 'Return to Player: the long-run share of stakes a game is designed to return. A 96% RTP game returns 96 for every 100 staked over millions of spins, not per session.'],
      ['What is volatility?', 'How swingy a game is. Low volatility pays small and often; very high volatility pays rarely but large. Nova demos use volatility to shape hit rate.'],
      ['Why did a spin not register?', 'A spin is refused when your demo balance is empty, a break is active or the stake would exceed a weekly loss limit. The launcher explains which.'],
    ],
  },
  {
    icon: ShieldCheck, title: 'Safer gambling', items: [
      ['How quickly do limits apply?', 'Immediately. Loosening a limit would wait 24 hours on a real operator; the demo applies changes at once.'],
      ['What is a reality check?', 'A periodic interruption during play showing time spent, total staked and won. Set the interval on the Safer gambling page.'],
      ['Can I lift a break early?', 'Real operators cannot. This demo lets you so you can keep exploring, and labels the button accordingly.'],
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="lobby-section page stack">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Lobby</Link><ChevronRight size={13} /><span aria-current="page">Help centre</span></nav>
      <div className="page-head">
        <div>
          <p className="eyebrow"><LifeBuoy size={14} /> HELP CENTRE</p>
          <h1>How can we help?</h1>
          <p className="page-lede">Short answers to the questions players ask most. For limits and breaks, go straight to <Link href="/safer-gambling" className="drawer-link">Safer gambling</Link>.</p>
        </div>
      </div>
      <div className="help-grid">
        {topics.map((t) => (
          <section key={t.title} className="panel help-topic" id={t.title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="rail-head"><div><p className="eyebrow"><t.icon size={14} /> {t.title.toUpperCase()}</p></div></div>
            <div className="help-box" style={{ border: 0, paddingTop: 0 }}>
              {t.items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </section>
        ))}
      </div>
      <section className="panel">
        <div className="rail-head"><div><p className="eyebrow">STILL STUCK?</p><h2>Contact (demo)</h2></div></div>
        <p className="drawer-sub">A real help centre offers 24/7 live chat and email with published response times. In this demo, contact channels are not connected.</p>
        <div className="hero-actions"><span className="outline-button" aria-disabled="true">Live chat unavailable in demo</span><Link href="/account" className="text-button">Account overview</Link></div>
      </section>
    </div>
  )
}
