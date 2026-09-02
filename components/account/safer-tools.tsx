'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, PauseCircle, ShieldCheck, Wallet } from 'lucide-react'
import { actions, depositedToday, isExcluded, netLossThisWeek, useLobbyState } from '@/lib/store'
import { money } from '@/lib/format'

const questions = [
  'Have you spent more time or money playing than you meant to this week?',
  'Do you play to recover losses or to change your mood?',
  'Has playing affected your sleep, work or relationships?',
  'Have you hidden how much you play from people close to you?',
]

export function SaferTools() {
  const s = useLobbyState()
  const [answers, setAnswers] = useState<boolean[]>([])
  const excluded = isExcluded(s)
  const yes = answers.filter(Boolean).length
  const today = depositedToday(s)
  const weekLoss = netLossThisWeek(s)

  if (!s.user) {
    return (
      <div className="panel">
        <p className="drawer-label">Your tools</p>
        <p className="drawer-sub">Log in to set deposit, loss and session limits or take a break. Limits apply instantly; loosening one waits 24 hours.</p>
        <div className="hero-actions"><button className="button" onClick={() => actions.openAuth('login')}>Log in</button><button className="outline-button" onClick={() => actions.openAuth('register')}>Create demo account</button></div>
      </div>
    )
  }

  return (
    <div className="two-col">
      <div className="panel">
        <div className="rail-head"><div><p className="eyebrow">ACTIVE NOW</p><h2>Your limits</h2></div></div>
        <div className="limit-cards">
          <div className="limit-card">
            <span><Wallet size={15} /> Daily deposit</span>
            <strong>{s.limits.dailyDeposit === null ? 'No limit' : money(s.limits.dailyDeposit, s.currency)}</strong>
            <small>{money(today, s.currency)} deposited in the last 24 h</small>
            {s.limits.dailyDeposit !== null && <div className="progress-track small"><span style={{ width: `${Math.min(100, (today / s.limits.dailyDeposit) * 100)}%` }} /></div>}
            <select value={s.limits.dailyDeposit ?? ''} onChange={(e) => actions.setLimits({ dailyDeposit: e.target.value ? Number(e.target.value) : null })} aria-label="Daily deposit limit"><option value="">No limit</option>{[20, 50, 100, 250, 500].map((v) => <option key={v} value={v}>{money(v, s.currency)}</option>)}</select>
          </div>
          <div className="limit-card">
            <span><ShieldCheck size={15} /> Weekly net loss</span>
            <strong>{s.limits.weeklyLoss === null ? 'No limit' : money(s.limits.weeklyLoss, s.currency)}</strong>
            <small>{money(weekLoss, s.currency)} net loss in the last 7 days</small>
            {s.limits.weeklyLoss !== null && <div className="progress-track small"><span style={{ width: `${Math.min(100, (weekLoss / s.limits.weeklyLoss) * 100)}%` }} /></div>}
            <select value={s.limits.weeklyLoss ?? ''} onChange={(e) => actions.setLimits({ weeklyLoss: e.target.value ? Number(e.target.value) : null })} aria-label="Weekly loss limit"><option value="">No limit</option>{[25, 50, 100, 250].map((v) => <option key={v} value={v}>{money(v, s.currency)}</option>)}</select>
          </div>
          <div className="limit-card">
            <span><Clock size={15} /> Reality check</span>
            <strong>Every {s.limits.sessionMinutes ?? 60} min</strong>
            <small>A summary of time, stakes and wins interrupts play.</small>
            <select value={s.limits.sessionMinutes ?? ''} onChange={(e) => actions.setLimits({ sessionMinutes: e.target.value ? Number(e.target.value) : null })} aria-label="Reality check interval"><option value="">Default (60 min)</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option><option value="120">2 hours</option></select>
          </div>
          <div className={`limit-card ${excluded ? 'active' : ''}`}>
            <span><PauseCircle size={15} /> Take a break</span>
            <strong>{excluded ? `Until ${new Date(s.selfExcludedUntil!).toLocaleDateString('en-GB')}` : 'Not active'}</strong>
            <small>Locks play and deposits immediately.</small>
            <div className="quick-amounts">{[1, 7, 30, 180].map((d) => <button key={d} onClick={() => actions.selfExclude(d)}>{d === 1 ? '24 h' : d === 180 ? '6 months' : `${d} days`}</button>)}</div>
            {excluded && <button className="text-button danger" onClick={actions.clearSelfExclusion}>End break (demo only)</button>}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="rail-head"><div><p className="eyebrow">SELF-ASSESSMENT</p><h2>Quick check-in</h2></div></div>
        <ol className="checkin">
          {questions.map((q, i) => (
            <li key={q}>
              <p>{q}</p>
              <div className="quick-amounts">
                <button className={answers[i] === false ? 'selected' : ''} onClick={() => setAnswers((a) => { const n = [...a]; n[i] = false; return n })}>No</button>
                <button className={answers[i] === true ? 'selected' : ''} onClick={() => setAnswers((a) => { const n = [...a]; n[i] = true; return n })}>Yes</button>
              </div>
            </li>
          ))}
        </ol>
        {answers.filter((a) => a !== undefined).length === questions.length && (
          <p className={yes >= 2 ? 'drawer-warning' : 'drawer-notice'} role="status">
            {yes >= 2 ? <>You answered yes to {yes} questions. Consider setting a deposit limit or taking a break, and talk to a gambling-support service if play is affecting you.</> : <><CheckCircle2 size={14} /> Nothing here stands out. Keep an eye on time and money, and revisit this check-in now and then.</>}
          </p>
        )}
      </div>
    </div>
  )
}
