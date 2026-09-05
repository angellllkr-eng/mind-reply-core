import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { providers, type ProviderTier } from '@/lib/data/providers'
import { games } from '@/lib/data/games'

export const metadata: Metadata = { title: 'Game studios', description: 'Every studio in the Nova lobby, from premium partners to boutique teams.' }

const tiers: ProviderTier[] = ['Premium', 'Studio', 'Boutique']
const blurb: Record<ProviderTier, string> = {
  Premium: 'Large catalogues, live-dealer floors and the biggest jackpot networks.',
  Studio: 'Mid-size teams shipping a steady cadence of slots and Megaways.',
  Boutique: 'Small, opinionated studios — fewer titles, distinctive mechanics.',
}

export default function StudiosPage() {
  return (
    <div className="lobby-section page stack">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Lobby</Link><ChevronRight size={13} /><span aria-current="page">Studios</span></nav>
      <div className="page-head">
        <div>
          <p className="eyebrow">{providers.length} STUDIOS · {games.length} GAMES</p>
          <h1>Who makes the games.</h1>
          <p className="page-lede">Browse the lobby by the people behind it. Every studio here is original to Nova; catalogue sizes, founding years and locations are illustrative.</p>
        </div>
      </div>
      {tiers.map((tier) => {
        const list = providers.filter((p) => p.tier === tier)
        return (
          <section key={tier} className="studio-tier">
            <div className="rail-head">
              <div><p className="eyebrow">{tier.toUpperCase()} · {list.length}</p><h2>{tier === 'Premium' ? 'Premium partners' : tier === 'Studio' ? 'Studios' : 'Boutique'}</h2></div>
              <p className="page-lede" style={{ margin: 0, maxWidth: 360 }}>{blurb[tier]}</p>
            </div>
            <div className="studio-grid">
              {list.map((p) => {
                const catalogue = games.filter((g) => g.providerId === p.id)
                const top = [...catalogue].sort((a, b) => b.popularity - a.popularity).slice(0, 3)
                const avgRtp = catalogue.length ? (catalogue.reduce((a, g) => a + g.rtp, 0) / catalogue.length).toFixed(1) : '—'
                return (
                  <Link key={p.id} href={`/studio/${p.id}`} className="studio-card">
                    <div className="studio-mark" aria-hidden="true">{p.name.split(/\s|&/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}</div>
                    <div className="studio-card-body">
                      <h3>{p.name}</h3>
                      <p>{p.hq} · est. {p.founded}</p>
                      <dl className="studio-stats"><div><dt>Games</dt><dd>{catalogue.length}</dd></div><div><dt>Avg RTP</dt><dd>{avgRtp}%</dd></div><div><dt>Jackpots</dt><dd>{catalogue.filter((g) => g.jackpot).length}</dd></div></dl>
                      <div className="studio-top">{top.map((g) => <span key={g.id} className={`similar-tile art-${g.tone}`}><strong>{g.art}</strong></span>)}</div>
                    </div>
                    <span className="studio-go"><ArrowRight size={16} /></span>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
