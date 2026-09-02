'use client'

import Link from 'next/link'
import { ArrowRight, Check, Lock } from 'lucide-react'
import { nextTier, tierForPoints, tiers } from '@/lib/data/promotions'
import { actions, useLobbyState } from '@/lib/store'

export function LoyaltyTiers() {
  const s = useLobbyState()
  const current = tierForPoints(s.points)
  const next = nextTier(s.points)
  const pct = next ? Math.min(100, Math.round(((s.points - current.minPoints) / (next.minPoints - current.minPoints)) * 100)) : 100

  return (
    <>
      <section className="progress-card">
        <div className="progress-head">
          <div>
            <p className="eyebrow">{s.user ? `${s.user.name} · ${current.name}` : 'Not signed in'}</p>
            <h2>{s.user ? `${s.points.toLocaleString()} Nova points` : 'Sign in to start earning'}</h2>
            <p className="drawer-sub">{s.user ? (next ? `${(next.minPoints - s.points).toLocaleString()} more points to reach ${next.name}.` : 'You are at the top tier.') : 'Your demo account tracks points, favourites and history on this device.'}</p>
          </div>
          {s.user ? <Link href="/#games" className="button button-small">Play to earn <ArrowRight size={14} /></Link> : <button className="button button-small" onClick={() => actions.openAuth('register')}>Create demo account <ArrowRight size={14} /></button>}
        </div>
        <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress to next tier"><span style={{ width: `${s.user ? pct : 0}%` }} /></div>
        <div className="progress-marks">{tiers.map((t) => <span key={t.name} className={s.points >= t.minPoints && s.user ? 'reached' : ''}>{t.name}<small>{t.minPoints.toLocaleString()}</small></span>)}</div>
      </section>

      <div className="tier-grid">
        {tiers.map((t) => {
          const reached = !!s.user && s.points >= t.minPoints
          return (
            <article key={t.name} className={`tier-card ${reached ? 'reached' : ''} ${current.name === t.name && s.user ? 'current' : ''}`} style={{ ['--tier' as string]: t.tone }}>
              <div className="tier-top"><span className="tier-dot" /><p className="eyebrow">{t.minPoints === 0 ? 'Starting tier' : `${t.minPoints.toLocaleString()} points`}</p>{reached ? <Check size={16} /> : <Lock size={15} />}</div>
              <h3>{t.name}</h3>
              <ul>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
              {current.name === t.name && s.user && <span className="tier-current">Your tier</span>}
            </article>
          )
        })}
      </div>

      <section className="feature-strip">
        <div><p className="eyebrow">HOW POINTS WORK</p><h2>Simple maths.</h2><p>10 points per demo credit staked, plus 5 points for every spin. Double points on the Reel of the Week. Cashback and drops are credited as demo credits.</p></div>
        <Link href="/promotions" className="outline-button">Current promotions <ArrowRight size={16} /></Link>
      </section>
    </>
  )
}
