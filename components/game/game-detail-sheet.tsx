'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Heart, Play, ShieldAlert, X, Zap } from 'lucide-react'
import { gameBySlug, similarGames, type Game } from '@/lib/data/games'
import { providerById } from '@/lib/data/providers'
import { actions, isExcluded, useLobbyState } from '@/lib/store'
import { money } from '@/lib/format'

export function GameFacts({ game }: { game: Game }) {
  const currency = useLobbyState().currency
  const facts = [
    ['RTP', `${game.rtp}%`],
    ['Volatility', game.volatility],
    ['Min bet', money(game.minBet, currency)],
    ['Max bet', money(game.maxBet, currency)],
    [game.jackpot ? 'Jackpot' : 'Max win', game.jackpot ? money(game.jackpot, currency) : `${game.maxWin.toLocaleString()}x`],
    ['Ways / lines', game.lines.toLocaleString()],
    ['Released', game.released],
    ['Studio', providerById(game.providerId).name],
  ]
  return <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
}

export function PlayPanel({ game }: { game: Game }) {
  const s = useLobbyState()
  const [result, setResult] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const excluded = isExcluded(s)
  const favourite = s.favourites.includes(game.id)

  const play = () => {
    if (!s.user) return actions.openAuth('login')
    if (excluded) return
    setSpinning(true)
    const before = s.balance
    actions.playDemo(game.id, game.title)
    window.setTimeout(() => {
      setSpinning(false)
      setResult('spun')
      void before
    }, 700)
  }

  return (
    <div className="play-panel">
      <button className="button" onClick={play} disabled={spinning || excluded}>
        <Play size={15} fill="currentColor" /> {spinning ? 'Spinning…' : s.user ? 'Play demo spin' : 'Log in to play demo'}
      </button>
      <button className={`outline-button ${favourite ? 'is-fav' : ''}`} onClick={() => actions.toggleFavourite(game.id)} aria-pressed={favourite}><Heart size={15} fill={favourite ? 'currentColor' : 'none'} /> {favourite ? 'Favourited' : 'Favourite'}</button>
      {excluded && <p className="drawer-warning"><ShieldAlert size={14} /> Play is paused while your break is active.</p>}
      {result && s.user && <p className="drawer-notice" role="status">Demo spin recorded. Balance: {money(s.balance, s.currency)} · {s.points.toLocaleString()} points</p>}
    </div>
  )
}

export function GameDetailSheet() {
  const slug = useLobbyState().ui.detailSlug
  const game = slug ? gameBySlug(slug) : undefined
  if (!game) return null
  const provider = providerById(game.providerId)
  const similar = similarGames(game, 4)

  return (
    <div className="modal-backdrop" role="presentation" onClick={actions.closeDetail}>
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={actions.closeDetail} aria-label="Close game details"><X size={19} /></button>
        <div className={`launch-art art-${game.tone}`}><strong>{game.art}</strong><span>{game.title}</span></div>
        <div className="sheet-body">
          <p className="eyebrow"><Zap size={14} /> {game.category} · {provider.name}</p>
          <h2 id="sheet-title">{game.title}</h2>
          <p className="sheet-desc">{game.description}</p>
          <div className="chip-row">{game.tags.map((t) => <span key={t} className="chip">{t}</span>)}{game.isExclusive && <span className="chip chip-gold">Nova exclusive</span>}</div>
          <GameFacts game={game} />
          <PlayPanel game={game} />
          <div className="sheet-similar">
            <p className="drawer-label">Similar games</p>
            <div className="similar-row">{similar.map((g) => <button key={g.id} className={`similar-tile art-${g.tone}`} onClick={() => actions.openDetail(g.slug)}><strong>{g.art}</strong><span>{g.title}</span></button>)}</div>
          </div>
          <Link href={`/game/${game.slug}`} className="all-link" onClick={actions.closeDetail}>Full game page <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  )
}
