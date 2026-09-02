'use client'

import { Heart, Info, Play } from 'lucide-react'
import { GameArt } from '@/components/game/game-art'
import type { Game } from '@/lib/data/games'
import { providerById } from '@/lib/data/providers'
import { actions, useLobby } from '@/lib/store'
import { money } from '@/lib/format'

export function GameCard({ game, compact = false }: { game: Game; compact?: boolean }) {
  const favourite = useLobby((s) => s.favourites.includes(game.id))
  const currency = useLobby((s) => s.currency)
  const provider = providerById(game.providerId)
  const tag = game.jackpot ? 'JACKPOT' : game.isExclusive ? 'EXCLUSIVE' : game.isNew ? 'NEW' : game.popularity > 85 ? 'HOT' : null

  return (
    <article className={`game-card ${compact ? 'compact' : ''}`}>
      <button className={`favorite ${favourite ? 'favorited' : ''}`} onClick={() => actions.toggleFavourite(game.id)} aria-label={`${favourite ? 'Remove' : 'Add'} ${game.title} ${favourite ? 'from' : 'to'} favourites`} aria-pressed={favourite}>
        <Heart size={15} fill={favourite ? 'currentColor' : 'none'} />
      </button>
      <button className="game-art has-image" onClick={() => actions.openDetail(game.slug)} aria-label={`Open ${game.title}`}>
        <GameArt game={game} />
        <span className="play-hover"><Play size={18} fill="currentColor" /></span>
        {tag && <span className={`game-tag tag-${tag.toLowerCase()}`}>{tag}</span>}
        {game.jackpot && <span className="game-jackpot">{money(game.jackpot, currency)}</span>}
      </button>
      <div className="game-meta">
        <div><h3>{game.title}</h3><p>{provider.name}{!compact && <> · RTP {game.rtp}%</>}</p></div>
        <button className="game-info" onClick={() => actions.openDetail(game.slug)} aria-label={`Game info for ${game.title}`}><Info size={16} /></button>
      </div>
    </article>
  )
}
