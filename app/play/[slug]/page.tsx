import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { gameBySlug, games } from '@/lib/data/games'
import { GameLauncher } from '@/components/game/game-launcher'

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = gameBySlug((await params).slug)
  return game ? { title: `Play ${game.title} (demo)`, description: game.description } : { title: 'Game not found' }
}

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const game = gameBySlug((await params).slug)
  if (!game) notFound()
  return <GameLauncher game={game} />
}
