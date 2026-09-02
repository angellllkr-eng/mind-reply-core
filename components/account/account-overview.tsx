'use client'

import Link from 'next/link'
import { ArrowDownLeft, ArrowRight, ArrowUpRight, HelpCircle, ShieldCheck, User, Wallet } from 'lucide-react'
import { games } from '@/lib/data/games'
import { nextTier, tierForPoints } from '@/lib/data/promotions'
import { money, relativeTime } from '@/lib/format'
import { actions, isExcluded, useLobbyState } from '@/lib/store'
import { GameRail } from '@/components/lobby/game-rail'

const faqs = [
  ['Is any of this real money?', 'No. Nova is a demo lobby. Balances, deposits, spins and prizes are illustrative and stored only on this device.'],
  ['How do I reset my demo account?', 'Use "Reset demo data" below. It clears your wallet, favourites, history and limits from this browser.'],
  ['Where are safer gambling tools?', 'Deposit, loss and session limits plus take-a-break are in the Limits section here and in the account drawer.'],
  ['Why can I end a break early?', 'Real operators never allow this. The demo does so you can keep exploring; the copy makes that explicit.'],
]

export function AccountOverview() {
  const s = useLobbyState()
  if (!s.hydrated) return <div className="lobby-section page"><div className="empty-state"><p>Loading account…</p></div></div>
  if (!s.user) {
    return (
      <div className="lobby-section page">
        <div className="empty-state tall">
          <User size={28} />
          <h3>Sign in to view your account.</h3>
          <p>Your demo wallet, statement, favourites and safer gambling settings live here.</p>
          <div className="hero-actions"><button className="button" onClick={() => actions.openAuth('login')}>Log in</button><button className="outline-button" onClick={() => actions.openAuth('register')}>Create demo account</button></div>
        </div>
      </div>
    )
  }
  const tier = tierForPoints(s.points)
  const next = nextTier(s.points)
  const excluded = isExcluded(s)
  const favs = s.favourites.map((id) => games.find((g) => g.id === id)).filter(Boolean) as typeof games
  const recent = s.recentlyPlayed.map((id) => games.find((g) => g.id === id)).filter(Boolean) as typeof games
  const sum = (type: string) => s.transactions.filter((t) => t.type === type).reduce((a, t) => a + t.amount, 0)

  return (
    <div className="lobby-section page stack">
      <div className="page-head">
        <div><p className="eyebrow"><User size={14} /> {tier.name} MEMBER · JOINED {new Date(s.user.joined).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p><h1>{s.user.name}</h1><p className="page-lede">{s.user.email}</p></div>
        <div className="hero-actions"><button className="button" onClick={actions.openAccount}><Wallet size={15} /> Wallet</button><button className="outline-button" onClick={actions.signOut}>Sign out</button></div>
      </div>

      <div className="stat-grid">
        <div className="stat"><span>Demo balance</span><strong>{money(s.balance, s.currency)}</strong></div>
        <div className="stat"><span>Nova points</span><strong>{s.points.toLocaleString()}</strong><small>{next ? `${(next.minPoints - s.points).toLocaleString()} to ${next.name}` : 'Top tier'}</small></div>
        <div className="stat"><span>Total deposited</span><strong>{money(sum('deposit') + sum('bonus'), s.currency)}</strong></div>
        <div className="stat"><span>Staked / won</span><strong>{money(sum('stake'), s.currency)} / {money(sum('win'), s.currency)}</strong></div>
      </div>

      {excluded && <p className="drawer-warning"><ShieldCheck size={15} /> A break is active until {new Date(s.selfExcludedUntil!).toLocaleString('en-GB')}. Play and deposits are paused.</p>}

      <GameRail eyebrow="YOUR SHORTLIST" title="Favourites" games={favs} href="/#games" hrefLabel="Browse games" />
      <GameRail eyebrow="HISTORY" title="Recently played" games={recent} href="/#games" hrefLabel="Browse games" />

      <section className="two-col">
        <div className="panel" id="transactions">
          <div className="rail-head"><div><p className="eyebrow">STATEMENT</p><h2>Transactions</h2></div><span className="result-count">{s.transactions.length} entries</span></div>
          {s.transactions.length === 0 ? <p className="drawer-sub">No activity yet. Deposit demo credits or play a demo spin.</p> : (
            <ul className="tx-list">
              {s.transactions.map((t) => (
                <li key={t.id}>
                  <span className={`tx-icon tx-${t.type}`}>{t.type === 'deposit' || t.type === 'win' || t.type === 'bonus' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}</span>
                  <div><strong>{t.note}</strong><small>{new Date(t.at).toLocaleString('en-GB')} · {relativeTime(t.at)}</small></div>
                  <b className={t.type === 'stake' || t.type === 'withdrawal' ? 'neg' : 'pos'}>{t.type === 'stake' || t.type === 'withdrawal' ? '-' : '+'}{money(t.amount, s.currency)}</b>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel" id="limits">
          <div className="rail-head"><div><p className="eyebrow">SAFER GAMBLING</p><h2>Limits & tools</h2></div></div>
          <dl className="facts">
            <div><dt>Daily deposit</dt><dd>{s.limits.dailyDeposit ? money(s.limits.dailyDeposit, s.currency) : 'No limit'}</dd></div>
            <div><dt>Weekly loss</dt><dd>{s.limits.weeklyLoss ? money(s.limits.weeklyLoss, s.currency) : 'No limit'}</dd></div>
            <div><dt>Session reminder</dt><dd>{s.limits.sessionMinutes ? `${s.limits.sessionMinutes} min` : 'Off'}</dd></div>
            <div><dt>Break</dt><dd>{excluded ? 'Active' : 'None'}</dd></div>
          </dl>
          <button className="outline-button full" onClick={actions.openAccount}>Adjust limits <ArrowRight size={15} /></button>
          <p className="drawer-sub">Limits apply instantly. In a real product, loosening a limit would require a 24-hour cooling-off period.</p>
          <div className="help-box" id="help">
            <p className="eyebrow"><HelpCircle size={13} /> HELP CENTRE</p>
            {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
          <button className="text-button danger" onClick={() => { if (window.confirm('Reset all demo data on this device?')) actions.reset() }}>Reset demo data</button>
        </div>
      </section>
      <Link href="/" className="all-link">Back to the lobby <ArrowRight size={15} /></Link>
    </div>
  )
}
