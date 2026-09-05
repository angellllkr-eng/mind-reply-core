'use client'

import { Users } from 'lucide-react'
import type { LiveTable } from '@/lib/data/live-tables'
import { actions, useLobby } from '@/lib/store'
import { money } from '@/lib/format'

export function LiveTableCard({ table }: { table: LiveTable }) {
  const currency = useLobby((s) => s.currency)
  const user = useLobby((s) => s.user)
  const open = table.status === 'Open'
  return (
    <article className={`live-card art-${table.tone} ${open ? '' : 'live-closed'}`}>
      <div className="live-top">
        <span className={`live-badge ${open ? 'on' : ''}`}>{open ? <><span className="live-dot" /> LIVE</> : table.status.toUpperCase()}</span>
        <span className="live-lang">{table.language}</span>
      </div>
      <div className="live-results" aria-label="Recent results">{table.lastResults.slice(0, 6).map((r, i) => <span key={i} className={table.type === 'Roulette' ? (r === '0' ? 'res-green' : Number(r) % 2 === 0 ? 'res-black' : 'res-red') : ''}>{r}</span>)}</div>
      <div className="live-body">
        <p className="live-type">{table.type} · {table.studio}</p>
        <h3>{table.name}</h3>
        <p className="live-dealer">Dealer {table.dealer}</p>
      </div>
      <div className="live-foot">
        <span>{money(table.minBet, currency)} – {money(table.maxBet, currency, { compact: true })}</span>
        {table.seats > 0 ? <span className="live-seats"><Users size={13} /> {table.seatsOpen}/{table.seats} seats</span> : <span className="live-seats">Unlimited seats</span>}
      </div>
      <button className="live-join" disabled={!open} onClick={() => (user ? actions.openAccount() : actions.openAuth('login'))}>{open ? (user ? 'Join table (demo)' : 'Log in to join') : table.status}</button>
    </article>
  )
}
