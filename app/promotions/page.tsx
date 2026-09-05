import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarClock, Gift } from 'lucide-react'
import { promotions } from '@/lib/data/promotions'
import { PromoCarousel } from '@/components/promos/promo-carousel'
import { ClaimButton } from '@/components/promos/claim-button'

export const metadata: Metadata = { title: 'Promotions', description: 'Welcome offers, jackpot drops, live cashback and weekly races. Demo credits only.' }

const groups = ['Welcome', 'Weekly', 'Slots', 'Live', 'Loyalty'] as const

export default function PromotionsPage() {
  return (
    <div className="lobby-section page stack">
      <div className="page-head">
        <div><p className="eyebrow"><Gift size={14} /> PROMOTIONS · {promotions.length} LIVE OFFERS</p><h1>Something extra, every day.</h1><p className="page-lede">Every offer below is a demo. Claiming adds demo credits or points to your account on this device. Terms are illustrative and there is no real-money value.</p></div>
      </div>
      <PromoCarousel />
      {groups.map((g) => {
        const items = promotions.filter((p) => p.category === g)
        if (!items.length) return null
        return (
          <section key={g} className="promo-group">
            <div className="rail-head"><div><p className="eyebrow">{g.toUpperCase()}</p><h2>{g === 'Welcome' ? 'For new members' : g === 'Weekly' ? 'This week' : g === 'Slots' ? 'Slots and races' : g === 'Live' ? 'Live floor offers' : 'Loyalty extras'}</h2></div></div>
            <div className="promo-grid">
              {items.map((p) => (
                <article key={p.id} id={p.slug} className="promo-card">
                  <div className={`promo-thumb art-${p.tone}`} aria-hidden="true"><strong>{p.art}</strong></div>
                  <div className="promo-card-body">
                    <p className="eyebrow">{p.title}</p>
                    <h3>{p.headline}</h3>
                    <p>{p.summary}</p>
                    <p className="promo-ends"><CalendarClock size={13} /> Ends {new Date(p.endsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <div className="promo-card-actions"><ClaimButton promo={p} /><span className="terms">{p.terms}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
      <section className="feature-strip">
        <div><p className="eyebrow">LOYALTY</p><h2>Earn on every spin.</h2><p>Nova points build automatically. See tiers, perks and your progress.</p></div>
        <Link href="/rewards" className="outline-button">Rewards <ArrowRight size={16} /></Link>
      </section>
    </div>
  )
}
