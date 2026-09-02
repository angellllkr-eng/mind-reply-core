import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin } from 'lucide-react'
import { providers } from '@/lib/data/providers'
import { byNewest, byPopularity, games } from '@/lib/data/games'
import { GameRail } from '@/components/lobby/game-rail'
import { GameCard } from '@/components/lobby/game-card'

export function generateStaticParams() {
  return providers.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = providers.find((x) => x.id === (await params).id)
  return p ? { title: `${p.name} games`, description: `All ${p.name} titles in the Nova lobby.` } : { title: 'Studio not found' }
}

export default async function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = providers.find((x) => x.id === id)
  if (!p) notFound()
  const catalogue = games.filter((g) => g.providerId === p.id)
  const categories = Array.from(new Set(catalogue.map((g) => g.category)))
  const avgRtp = (catalogue.reduce((a, g) => a + g.rtp, 0) / catalogue.length).toFixed(2)
  const newest = byNewest(catalogue).slice(0, 10)
  const popular = byPopularity(catalogue)

  return (
    <div className="lobby-section page stack">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Lobby</Link><ChevronRight size={13} /><Link href="/studios">Studios</Link><ChevronRight size={13} /><span aria-current="page">{p.name}</span></nav>
      <section className="studio-hero">
        <div className="studio-mark large" aria-hidden="true">{p.name.split(/\s|&/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}</div>
        <div>
          <p className="eyebrow">{p.tier.toUpperCase()} PARTNER</p>
          <h1>{p.name}</h1>
          <p className="page-lede"><MapPin size={13} /> {p.hq} · founded {p.founded} · {catalogue.length} games in the lobby across {categories.join(', ').toLowerCase()}.</p>
          <div className="chip-row">{categories.map((c) => <Link key={c} href={`/?cat=${encodeURIComponent(c)}#games`} className="chip">{c}</Link>)}</div>
        </div>
        <dl className="facts studio-facts">
          <div><dt>Games</dt><dd>{catalogue.length}</dd></div>
          <div><dt>Avg RTP</dt><dd>{avgRtp}%</dd></div>
          <div><dt>Jackpots</dt><dd>{catalogue.filter((g) => g.jackpot).length}</dd></div>
          <div><dt>Exclusives</dt><dd>{catalogue.filter((g) => g.isExclusive).length}</dd></div>
        </dl>
      </section>
      {newest.length > 3 && <GameRail eyebrow="LATEST" title={`New from ${p.name}`} games={newest} />}
      <section>
        <div className="rail-head"><div><p className="eyebrow">FULL CATALOGUE</p><h2>All {p.name} games</h2></div><span className="result-count">{catalogue.length} games · most popular first</span></div>
        <div className="grid">{popular.map((g) => <GameCard key={g.id} game={g} />)}</div>
      </section>
    </div>
  )
}
