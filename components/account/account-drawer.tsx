'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Coins, Gift, LogOut, Minus, Plus, ShieldAlert, X } from 'lucide-react'
import { actions, isExcluded, useLobbyState } from '@/lib/store'
import { money, relativeTime } from '@/lib/format'
import { nextTier, tierForPoints } from '@/lib/data/promotions'

const quick = [10, 25, 50, 100]

export function AccountDrawer() {
  const s = useLobbyState()
  const [tab, setTab] = useState<'wallet' | 'history' | 'limits'>('wallet')
  const [amount, setAmount] = useState(25)
  const [notice, setNotice] = useState('')
  if (!s.ui.accountDrawer || !s.user) return null
  const tier = tierForPoints(s.points)
  const next = nextTier(s.points)
  const excluded = isExcluded(s)
  const todayDeposits = s.transactions.filter((t) => t.type === 'deposit' && Date.now() - new Date(t.at).getTime() < 86400000).reduce((a, t) => a + t.amount, 0)

  const deposit = () => {
    const res = actions.deposit(amount)
    if (!res.ok) return setNotice(res.reason ?? 'Deposit declined.')
    setNotice(`${money(amount, s.currency)} demo credits added.${s.limits.dailyDeposit !== null ? ` ${money(Math.max(0, s.limits.dailyDeposit - todayDeposits - amount), s.currency)} of today's limit remaining.` : ''}`)
  }

  return (
    <div className="drawer-backdrop" role="presentation" onClick={actions.closeAccount}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">{tier.name} member</p>
            <h2 id="drawer-title">{s.user.name}</h2>
            <p className="drawer-sub">{s.user.email}</p>
          </div>
          <button className="modal-close" onClick={actions.closeAccount} aria-label="Close account"><X size={19} /></button>
        </div>
        <div className="drawer-balance">
          <span>Demo balance</span>
          <strong>{money(s.balance, s.currency)}</strong>
          <small>{s.points.toLocaleString()} Nova points{next ? ` · ${(next.minPoints - s.points).toLocaleString()} to ${next.name}` : ' · Top tier'}</small>
        </div>
        {excluded && <p className="drawer-warning"><ShieldAlert size={15} /> Break active until {new Date(s.selfExcludedUntil!).toLocaleDateString('en-GB')}. Play and deposits are paused.</p>}
        <div className="drawer-tabs" role="tablist">
          {(['wallet', 'history', 'limits'] as const).map((t) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'selected' : ''} onClick={() => setTab(t)}>{t === 'wallet' ? 'Wallet' : t === 'history' ? 'History' : 'Limits'}</button>)}
        </div>

        {tab === 'wallet' && (
          <div className="drawer-body">
            <p className="drawer-label">Add demo credits</p>
            <div className="amount-row">
              <button onClick={() => setAmount(Math.max(5, amount - 5))} aria-label="Decrease amount"><Minus size={14} /></button>
              <strong>{money(amount, s.currency)}</strong>
              <button onClick={() => setAmount(amount + 5)} aria-label="Increase amount"><Plus size={14} /></button>
            </div>
            <div className="quick-amounts">{quick.map((q) => <button key={q} className={amount === q ? 'selected' : ''} onClick={() => setAmount(q)}>{money(q, s.currency)}</button>)}</div>
            <button className="button modal-submit" onClick={deposit} disabled={excluded}><Coins size={16} /> Deposit demo credits</button>
            <button className="outline-button full" onClick={() => { actions.withdraw(Math.min(amount, s.balance)); setNotice('Demo withdrawal recorded.') }} disabled={s.balance <= 0 || excluded}>Withdraw {money(Math.min(amount, s.balance), s.currency)}</button>
            {notice && <p className="drawer-notice" role="status">{notice}</p>}
            <Link href="/rewards" className="drawer-link" onClick={actions.closeAccount}><Gift size={15} /> View rewards and tier perks</Link>
          </div>
        )}

        {tab === 'history' && (
          <div className="drawer-body">
            {s.transactions.length === 0 ? <p className="drawer-sub">No demo activity yet.</p> : (
              <ul className="tx-list">
                {s.transactions.slice(0, 30).map((t) => (
                  <li key={t.id}>
                    <span className={`tx-icon tx-${t.type}`}>{t.type === 'deposit' || t.type === 'win' || t.type === 'bonus' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}</span>
                    <div><strong>{t.note}</strong><small>{relativeTime(t.at)}</small></div>
                    <b className={t.type === 'stake' || t.type === 'withdrawal' ? 'neg' : 'pos'}>{t.type === 'stake' || t.type === 'withdrawal' ? '-' : '+'}{money(t.amount, s.currency)}</b>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/account#transactions" className="drawer-link" onClick={actions.closeAccount}>Full statement</Link>
          </div>
        )}

        {tab === 'limits' && (
          <div className="drawer-body">
            <p className="drawer-label">Safer gambling tools</p>
            <label className="limit-row"><span>Daily deposit limit</span><select value={s.limits.dailyDeposit ?? ''} onChange={(e) => actions.setLimits({ dailyDeposit: e.target.value ? Number(e.target.value) : null })}><option value="">No limit</option><option value="20">{money(20, s.currency)}</option><option value="50">{money(50, s.currency)}</option><option value="100">{money(100, s.currency)}</option><option value="250">{money(250, s.currency)}</option></select></label>
            <label className="limit-row"><span>Weekly loss limit</span><select value={s.limits.weeklyLoss ?? ''} onChange={(e) => actions.setLimits({ weeklyLoss: e.target.value ? Number(e.target.value) : null })}><option value="">No limit</option><option value="25">{money(25, s.currency)}</option><option value="100">{money(100, s.currency)}</option><option value="250">{money(250, s.currency)}</option></select></label>
            <label className="limit-row"><span>Session reminder</span><select value={s.limits.sessionMinutes ?? ''} onChange={(e) => actions.setLimits({ sessionMinutes: e.target.value ? Number(e.target.value) : null })}><option value="">Off</option><option value="30">30 min</option><option value="60">60 min</option><option value="120">2 hours</option></select></label>
            <p className="drawer-label">Take a break</p>
            <div className="quick-amounts">{[1, 7, 30].map((d) => <button key={d} onClick={() => actions.selfExclude(d)}>{d === 1 ? '24 hours' : `${d} days`}</button>)}</div>
            {excluded && <button className="outline-button full" onClick={actions.clearSelfExclusion}>End break (demo only)</button>}
            <p className="drawer-sub">Real operators cannot lift a self-exclusion early. This demo allows it so you can keep exploring.</p>
          </div>
        )}

        <div className="drawer-foot">
          <Link href="/account" className="outline-button" onClick={actions.closeAccount}>Account overview</Link>
          <button className="text-button" onClick={actions.signOut}><LogOut size={15} /> Sign out</button>
        </div>
      </aside>
    </div>
  )
}
