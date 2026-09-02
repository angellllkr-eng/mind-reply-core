'use client'

import { useEffect, useMemo, useState } from 'react'
import { Trophy } from 'lucide-react'
import { byPopularity, games } from '@/lib/data/games'
import { actions, useLobby } from '@/lib/store'
import { money } from '@/lib/format'
import { GameArt } from '@/components/game/game-art'

const handles = ['Ell***', 'Jam***', 'Pri***', 'Tom***', 'Ais***', 'Mo***', 'Kat***', 'Dan***', 'Sof***', 'Ben***', 'Nia***', 'Owe***']
const towns = ['Leeds', 'Cardiff', 'Glasgow', 'Bristol', 'Belfast', 'Norwich', 'Sheffield', 'Brighton', 'Derby', 'Dundee', 'Swansea', 'Exeter']

type Win = { id: number; handle: string; town: string; game: (typeof games)[number]; amount: number; secondsAgo: number }

function seeded(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

function generate(count: number, seed: number): Win[] {
  const r = seeded(seed)
  const pool = byPopularity(games).slice(0, 60)
  return Array.from({ length: count }, (_, i) => {
    const game = pool[Math.floor(r() * pool.length)]
    const big = r() < 0.12
    const amount = Math.round((big ? 400 + r() * 4600 : 6 + r() * 180) * 100) / 100
    return { id: seed + i, handle: handles[Math.floor(r() * handles.length)], town: towns[Math.floor(r() * towns.length)], game, amount, secondsAgo: Math.floor(10 + r() * 600) }
  })
}

export function WinnersTicker() {
  const currency = useLobby((s) => s.currency)
  const [tick, setTick] = useState(0)
  const wins = useMemo(() => generate(14, 902 + tick), [tick])

  useEffect(() => {
    const t = window.setInterval(() => setTick((x) => x + 1), 24000)
    return () => window.clearInterval(t)
  }, [])

  const items = [...wins, ...wins]

  return (
    <div className="ticker" aria-label="Recent demo wins (illustrative)">
      <div className="ticker-label"><Trophy size={13} /> Recent wins</div>
      <div className="ticker-viewport">
        <ul className="ticker-track" style={{ animationDuration: `${wins.length * 4.5}s` }}>
          {items.map((w, i) => (
            <li key={`${w.id}-${i}`}>
              <button onClick={() => actions.openDetail(w.game.slug)}>
                <span className="ticker-art has-image"><GameArt game={w.game} sizes="24px" /></span>
                <span className="ticker-text"><strong>{w.handle}</strong> from {w.town} won <b>{money(w.amount, currency)}</b> on {w.game.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <span className="ticker-note">Demo feed</span>
    </div>
  )
}
