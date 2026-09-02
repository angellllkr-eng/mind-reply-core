import Image from 'next/image'
import type { Game } from '@/lib/data/games'

type Props = {
  game: Pick<Game, 'image' | 'title' | 'tone' | 'theme'>
  /** Show the title lockup over the art (cards, launch sheet). */
  lockup?: boolean
  sizes?: string
  priority?: boolean
  className?: string
}

/** Real key art with a slow Ken Burns drift and a hover shine; falls back to the tone gradient while loading. */
export function GameArt({ game, lockup = false, sizes = '(max-width: 720px) 50vw, 220px', priority = false, className = '' }: Props) {
  return (
    <span className={`art-frame art-${game.tone} ${className}`} aria-hidden={!lockup}>
      <Image src={game.image} alt={lockup ? `${game.title} key art` : ''} fill sizes={sizes} priority={priority} className="art-img" draggable={false} />
      <span className="art-vignette" />
      <span className="art-shine" />
      {lockup && <span className="art-lockup">{game.title}</span>}
    </span>
  )
}
