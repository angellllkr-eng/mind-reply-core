'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Radio } from 'lucide-react'
import { liveTables, liveTypes, type LiveType } from '@/lib/data/live-tables'
import { LiveTableCard } from './live-table-card'

const stakes = ['Any stake', 'Low (under 1)', 'Mid (1 – 10)', 'High (10+)']

export function LiveFloor() {
  const params = useSearchParams()
  const initial = params.get('type')
  const [type, setType] = useState<'All' | LiveType>(liveTypes.includes(initial as LiveType) ? (initial as LiveType) : 'All')
  const [stake, setStake] = useState(stakes[0])
  const [openOnly, setOpenOnly] = useState(false)

  const list = useMemo(() => liveTables.filter((t) => (type === 'All' || t.type === type) && (!openOnly || t.status === 'Open') && (stake === stakes[0] || (stake === stakes[1] ? t.minBet < 1 : stake === stakes[2] ? t.minBet >= 1 && t.minBet <= 10 : t.minBet > 10))), [type, stake, openOnly])
  const open = liveTables.filter((t) => t.status === 'Open').length

  return (
    <div className="lobby-section page">
      <div className="page-head">
        <div><p className="eyebrow"><Radio size={14} /> LIVE FLOOR · {open} TABLES OPEN</p><h1>Real dealers. Open seats.</h1><p className="page-lede">Five studios streaming around the clock. Choose a game type, pick your stake band and take a seat. Demo credits only.</p></div>
      </div>
      <div className="controls">
        <div className="category-tabs" role="tablist" aria-label="Live game types">
          {(['All', ...liveTypes] as const).map((t) => <button key={t} role="tab" aria-selected={type === t} className={type === t ? 'selected' : ''} onClick={() => setType(t)}>{t === 'All' ? 'All tables' : t}<small className="tab-count">{t === 'All' ? liveTables.length : liveTables.filter((x) => x.type === t).length}</small></button>)}
        </div>
      </div>
      <div className="toolbar">
        <div className="toolbar-group">
          <label className="select-wrap"><span>Stake</span><select value={stake} onChange={(e) => setStake(e.target.value)} aria-label="Stake band">{stakes.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="check-row inline"><input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} /> Open tables only</label>
        </div>
        <span className="result-count">{list.length} table{list.length === 1 ? '' : 's'}</span>
      </div>
      {list.length === 0 ? <div className="empty-state"><h3>No tables match.</h3><p>Loosen the stake band or include closed tables.</p></div> : <div className="live-grid four">{list.map((t) => <LiveTableCard key={t.id} table={t} />)}</div>}
    </div>
  )
}
