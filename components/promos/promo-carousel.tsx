'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { promotions } from '@/lib/data/promotions'

export function PromoCarousel() {
  const items = promotions.filter((p) => p.featured)
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % items.length), 6000)
    return () => window.clearInterval(t)
  }, [items.length])
  const p = items[i]
  return (
    <section className="promo-carousel" aria-roledescription="carousel" aria-label="Featured promotions">
      <div className={`promo-slide art-${p.tone}`} key={p.id}>
        <div className="promo-art" aria-hidden="true"><strong>{p.art}</strong></div>
        <div className="promo-copy">
          <p className="eyebrow">{p.category} · {p.title}</p>
          <h2>{p.headline}</h2>
          <p>{p.summary}</p>
          <div className="promo-actions">
            <Link href={`/promotions#${p.slug}`} className="button button-small">View offer <ArrowRight size={15} /></Link>
            <small>{p.terms}</small>
          </div>
        </div>
      </div>
      <div className="promo-nav">
        <button onClick={() => setI((i - 1 + items.length) % items.length)} aria-label="Previous promotion"><ChevronLeft size={16} /></button>
        <div className="promo-dots" role="tablist">{items.map((it, idx) => <button key={it.id} role="tab" aria-selected={idx === i} aria-label={it.title} className={idx === i ? 'on' : ''} onClick={() => setI(idx)} />)}</div>
        <button onClick={() => setI((i + 1) % items.length)} aria-label="Next promotion"><ChevronRight size={16} /></button>
      </div>
    </section>
  )
}
