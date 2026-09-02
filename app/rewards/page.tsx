import type { Metadata } from 'next'
import { Trophy } from 'lucide-react'
import { LoyaltyTiers } from '@/components/promos/loyalty-tiers'

export const metadata: Metadata = { title: 'Rewards', description: 'Nova loyalty tiers: Spark, Glow, Blaze and Nova. Track your progress and perks.' }

export default function RewardsPage() {
  return (
    <div className="lobby-section page stack">
      <div className="page-head">
        <div><p className="eyebrow"><Trophy size={14} /> NOVA REWARDS</p><h1>Four tiers. Real perks.</h1><p className="page-lede">Every demo spin earns Nova points: 10 per credit staked plus 5 for playing. Points never expire in this demo. Tiers unlock automatically.</p></div>
      </div>
      <LoyaltyTiers />
    </div>
  )
}
