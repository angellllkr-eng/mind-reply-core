import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Zap } from 'lucide-react'
import { gameBySlug, games, similarGames } from '@/lib/data/games'
import { providerById } from '@/lib/data/providers'
import { GameFacts, PlayPanel } from '@/components/game/game-detail-sheet'
import { GameArt } from '@/components/game/game-art'
import { GameRail } from '@/components/lobby/game-rail'

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = gameBySlug((await params).slug)
  return game ? { title: game.title, description: game.description } : { title: 'Game not found' }
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const game = gameBySlug(slug)
  if (!game) notFound()
  const provider = providerById(game.providerId)
  const similar = similarGames(game, 10)
  const more = games.filter((g) => g.providerId === game.providerId && g.id !== game.id).slice(0, 10)

  return (
    <div className="lobby-section page stack">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Lobby</Link><ChevronRight size={13} /><Link href={`/?cat=${encodeURIComponent(game.category)}#games`}>{game.category}</Link><ChevronRight size={13} /><span aria-current="page">{game.title}</span></nav>
      <section className="game-page">
        <div className="game-stage has-image">
          <GameArt game={game} lockup sizes="(max-width: 1024px) 100vw, 60vw" priority />
          <div className="stage-note">Demo stage · no real-money play</div>
        </div>
        <div className="game-page-side">
          <p className="eyebrow"><Zap size={14} /> {game.category} · {provider.name}</p>
          <h1>{game.title}</h1>
          <p className="sheet-desc">{game.description}</p>
          <div className="chip-row">{game.tags.map((t) => <span key={t} className="chip">{t}</span>)}{game.isExclusive && <span className="chip chip-gold">Nova exclusive</span>}{game.isNew && <span className="chip chip-gold">New</span>}</div>
          <PlayPanel game={game} />
          <GameFacts game={game} />
          <div className="studio-box">
            <p className="drawer-label">About the studio</p>
            <strong>{provider.name}</strong>
            <p className="drawer-sub">{provider.tier} partner · founded {provider.founded} · {provider.hq}. {games.filter((g) => g.providerId === provider.id).length} games in the Nova lobby.</p>
            <Link href={`/studio/${provider.id}`} className="drawer-link">All {provider.name} games</Link>
          </div>
        </div>
      </section>
      <GameRail eyebrow="YOU MIGHT ALSO LIKE" title="Similar games" games={similar} />
      <GameRail eyebrow={`MORE FROM ${provider.name.toUpperCase()}`} title="From the same studio" games={more} />
    </div>
  )
}
