'use client'

import { games } from '@/lib/data/games'
import { useLobbyState } from '@/lib/store'
import { GameRail } from './game-rail'

export function PersonalRails() {
  const s = useLobbyState()
  if (!s.hydrated) return null
  const recent = s.recentlyPlayed.map((id) => games.find((g) => g.id === id)).filter(Boolean) as typeof games
  const favs = s.favourites.map((id) => games.find((g) => g.id === id)).filter(Boolean) as typeof games
  return (
    <>
      <GameRail eyebrow="PICK UP WHERE YOU LEFT OFF" title="Recently played" games={recent} href="/account" hrefLabel="Account" />
      <GameRail eyebrow="YOUR SHORTLIST" title="Favourites" games={favs} href="/account" hrefLabel="Account" />
    </>
  )
}
