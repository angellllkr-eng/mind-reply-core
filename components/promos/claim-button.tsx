'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Promotion } from '@/lib/data/promotions'
import { actions, useLobby } from '@/lib/store'

export function ClaimButton({ promo }: { promo: Promotion }) {
  const user = useLobby((s) => s.user)
  const [claimed, setClaimed] = useState(false)
  const claim = () => {
    if (!user) return actions.openAuth('register')
    actions.deposit(promo.category === 'Welcome' ? 25 : 10)
    setClaimed(true)
  }
  return (
    <button className={`button button-small ${claimed ? 'claimed' : ''}`} onClick={claim} disabled={claimed}>
      {claimed ? <><Check size={14} /> Claimed (demo)</> : user ? 'Claim demo offer' : 'Join to claim'}
    </button>
  )
}
