import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, PauseCircle, ShieldCheck, Wallet } from 'lucide-react'
import { SaferTools } from '@/components/account/safer-tools'

export const metadata: Metadata = { title: 'Safer gambling', description: 'Deposit, loss and session limits, breaks, and a quick self-check.' }

const principles = [
  { icon: Wallet, title: 'Decide the money first', body: 'Set a deposit limit before you play. It applies immediately and can only be raised after a 24-hour cooling-off period.' },
  { icon: Clock, title: 'Watch the clock', body: 'Reality checks interrupt play with a clear summary of time, stakes and wins so decisions stay deliberate.' },
  { icon: PauseCircle, title: 'Breaks are one tap', body: 'Pause your account for 24 hours to six months. While paused, play and deposits are locked everywhere.' },
  { icon: ShieldCheck, title: 'Never chase', body: 'Losses are the cost of play, not a debt to recover. Loss limits cap how much a week can cost.' },
]

export default function SaferGamblingPage() {
  return (
    <div className="lobby-section page stack">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Lobby</Link><ChevronRight size={13} /><span aria-current="page">Safer gambling</span></nav>
      <div className="page-head">
        <div>
          <p className="eyebrow">18+ · WHEN THE FUN STOPS, STOP</p>
          <h1>Play on your terms.</h1>
          <p className="page-lede">Nova&apos;s safer gambling tools are built into every screen. Set them once and they follow you across the lobby, live floor and every game.</p>
        </div>
        <Link href="/help" className="outline-button">Help centre</Link>
      </div>
      <div className="principle-grid">
        {principles.map((p) => <div key={p.title} className="principle"><p.icon size={20} /><h3>{p.title}</h3><p>{p.body}</p></div>)}
      </div>
      <SaferTools />
      <section className="panel support">
        <div className="rail-head"><div><p className="eyebrow">SUPPORT</p><h2>If you need to talk to someone</h2></div></div>
        <p className="drawer-sub">In a real product this section lists national gambling-support helplines, live chat and self-exclusion schemes with verified links. Nova is a demo, so no external organisations are named or linked here. If gambling is affecting you, please contact a recognised support service in your country.</p>
      </section>
    </div>
  )
}
