'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Game } from '@/lib/data/games'
import { GameCard } from './game-card'

export function GameRail({ id, eyebrow, title, games, href, hrefLabel = 'See all' }: { id?: string; eyebrow: string; title: string; games: Game[]; href?: string; hrefLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  if (games.length === 0) return null
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="rail" id={id} aria-labelledby={`${title}-h`}>
      <div className="rail-head">
        <div><p className="eyebrow">{eyebrow}</p><h2 id={`${title}-h`}>{title}</h2></div>
        <div className="rail-actions">
          {href && <Link href={href} className="all-link">{hrefLabel} <ChevronRight size={16} /></Link>}
          <button onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}><ChevronLeft size={17} /></button>
          <button onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}><ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="rail-track" ref={ref}>
        {games.map((g) => <GameCard key={g.id} game={g} compact />)}
      </div>
    </section>
  )
}
