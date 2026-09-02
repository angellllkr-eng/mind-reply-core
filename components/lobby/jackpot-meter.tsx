'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import { money } from '@/lib/format'
import { useLobby } from '@/lib/store'

export function JackpotMeter({ total, count }: { total: number; count: number }) {
  const currency = useLobby((s) => s.currency)
  const [value, setValue] = useState(total)
  useEffect(() => {
    const t = window.setInterval(() => setValue((v) => v + Math.random() * 3.7), 1400)
    return () => window.clearInterval(t)
  }, [])
  return (
    <section className="feature-strip meter" id="jackpot-meter">
      <div className="feature-icon"><Trophy size={23} /></div>
      <div>
        <p className="eyebrow">NOVA JACKPOT NETWORK · {count} PROGRESSIVES</p>
        <h2>One shared dream. <span aria-live="off">{money(value, currency)}</span></h2>
        <p>Every eligible demo spin adds to the network meter. The daily drop must fall before midnight.</p>
      </div>
      <Link href="/?cat=Jackpots#games" className="outline-button">See jackpot games <ArrowRight size={16} /></Link>
    </section>
  )
}
