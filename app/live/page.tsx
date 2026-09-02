import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LiveFloor } from '@/components/live/live-floor'

export const metadata: Metadata = { title: 'Live floor', description: 'Roulette, blackjack, baccarat, poker and game shows with live dealers. Demo only.' }

export default function LivePage() {
  return <Suspense fallback={null}><LiveFloor /></Suspense>
}
