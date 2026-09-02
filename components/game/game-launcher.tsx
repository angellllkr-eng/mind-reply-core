'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Clock, Heart, Info, Minus, Plus, Play, ShieldAlert, Volume2, VolumeX, Wallet, X } from 'lucide-react'
import type { Game } from '@/lib/data/games'
import { providerById } from '@/lib/data/providers'
import { actions, isExcluded, useLobbyState } from '@/lib/store'
import { money } from '@/lib/format'

const stakes = [0.2, 0.5, 1, 2, 5, 10, 20]
const symbols = ['7', 'A', 'K', 'Q', 'J', '\u2660', '\u2665', '\u2666', '\u2663', '\u2605']

type Reel = { symbol: string; spinning: boolean }

function useElapsed(startIso: string | null) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])
  if (!startIso) return 0
  return Math.max(0, Math.floor((now - new Date(startIso).getTime()) / 1000))
}

const fmtClock = (secs: number) => `${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`

export function GameLauncher({ game }: { game: Game }) {
  const s = useLobbyState()
  const provider = providerById(game.providerId)
  const excluded = isExcluded(s)
  const favourite = s.favourites.includes(game.id)
  const [stake, setStake] = useState(1)
  const [reels, setReels] = useState<Reel[]>([{ symbol: '7', spinning: false }, { symbol: '7', spinning: false }, { symbol: '7', spinning: false }])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string>('Place a stake and spin. Demo credits only.')
  const [flash, setFlash] = useState<'win' | 'lose' | null>(null)
  const [muted, setMuted] = useState(true)
  const [session, setSession] = useState({ spins: 0, staked: 0, won: 0 })
  const [reality, setReality] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const lastCheck = useRef(0)
  const elapsed = useElapsed(s.sessionStartedAt)
  const reminderMin = s.limits.sessionMinutes ?? 60

  useEffect(() => { actions.startSession() }, [])

  useEffect(() => {
    const due = Math.floor(elapsed / (reminderMin * 60))
    if (due > 0 && due > lastCheck.current) {
      lastCheck.current = due
      setReality(true)
    }
  }, [elapsed, reminderMin])

  const spin = () => {
    if (busy || excluded || reality) return
    if (!s.user) return actions.openAuth('login')
    const out = actions.playDemo(game.id, game.title, stake, game.volatility)
    if (!out.ok) {
      setMessage(out.reason)
      return
    }
    setBusy(true)
    setFlash(null)
    setReels((r) => r.map((x) => ({ ...x, spinning: true })))
    const final = out.win > 0
      ? (() => { const sym = symbols[Math.floor(Math.random() * 5)]; return [sym, sym, out.multiplier >= 5 ? sym : symbols[Math.floor(Math.random() * symbols.length)]] })()
      : [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]]
    if (out.win === 0 && final[0] === final[1] && final[1] === final[2]) final[2] = symbols[(symbols.indexOf(final[2]) + 1) % symbols.length]
    ;[0, 1, 2].forEach((i) => {
      window.setTimeout(() => {
        setReels((r) => r.map((x, idx) => (idx === i ? { symbol: final[i], spinning: false } : x)))
        if (i === 2) {
          setBusy(false)
          setSession((st) => ({ spins: st.spins + 1, staked: st.staked + out.stake, won: st.won + out.win }))
          if (out.win > 0) {
            setFlash('win')
            setMessage(`${out.multiplier >= 10 ? 'Big win!' : 'Win!'} ${money(out.win, s.currency)} \u00b7 ${out.multiplier}x your stake`)
          } else {
            setFlash('lose')
            setMessage('No win. Try again or take a break.')
          }
        }
      }, 450 + i * 350)
    })
  }

  const net = session.won - session.staked

  return (
    <div className={`launcher ${flash ? `flash-${flash}` : ''}`}>
      <div className="launcher-bar">
        <Link href={`/game/${game.slug}`} className="launcher-back"><ArrowLeft size={16} /> <span>Exit game</span></Link>
        <div className="launcher-title">
          <strong>{game.title}</strong>
          <span>{provider.name} · RTP {game.rtp}% · {game.volatility} volatility</span>
        </div>
        <div className="launcher-meta">
          <span className="launcher-clock" title="Session time"><Clock size={13} /> {fmtClock(elapsed)}</span>
          <button className="balance-pill balance-button" onClick={actions.openAccount} aria-label="Open wallet"><Wallet size={14} /><span className="balance-amount">{money(s.balance, s.currency)}</span></button>
          <button className="icon-button" onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          <button className="icon-button" onClick={() => setShowInfo(true)} aria-label="Game information"><Info size={16} /></button>
        </div>
      </div>

      <div className={`launcher-stage art-${game.tone}`}>
        <Image src={game.image} alt="" fill sizes="100vw" priority className="stage-backdrop" draggable={false} />
        <div className="reels" aria-live="polite" aria-label="Reels">
          {reels.map((r, i) => (
            <div key={i} className={`reel ${r.spinning ? 'spinning' : ''}`}>
              <div className="reel-strip">{r.spinning ? symbols.map((sym, k) => <span key={k}>{sym}</span>) : <span className="reel-final">{r.symbol}</span>}</div>
            </div>
          ))}
        </div>
        <p className={`launcher-message ${flash ?? ''}`} role="status">{message}</p>
        <div className="stage-note">Demo stage · outcomes are illustrative · not real money</div>
      </div>

      <div className="launcher-controls">
        <div className="stake-control">
          <span className="drawer-label">Stake</span>
          <div className="amount-row">
            <button onClick={() => setStake(stakes[Math.max(0, stakes.indexOf(stake) - 1)])} aria-label="Lower stake" disabled={busy}><Minus size={14} /></button>
            <strong>{money(stake, s.currency)}</strong>
            <button onClick={() => setStake(stakes[Math.min(stakes.length - 1, stakes.indexOf(stake) + 1)])} aria-label="Raise stake" disabled={busy}><Plus size={14} /></button>
          </div>
          <div className="quick-amounts">{stakes.slice(0, 5).map((v) => <button key={v} className={stake === v ? 'selected' : ''} onClick={() => setStake(v)} disabled={busy}>{money(v, s.currency)}</button>)}</div>
        </div>

        <div className="spin-control">
          <button className="spin-button" onClick={spin} disabled={busy || excluded || reality || !s.user}>
            <Play size={22} fill="currentColor" />
            <span>{busy ? 'Spinning' : !s.user ? 'Log in to play' : excluded ? 'Break active' : 'Spin'}</span>
          </button>
          <button className={`outline-button ${favourite ? 'is-fav' : ''}`} onClick={() => actions.toggleFavourite(game.id)} aria-pressed={favourite}><Heart size={15} fill={favourite ? 'currentColor' : 'none'} /></button>
        </div>

        <dl className="session-stats" aria-label="This session">
          <div><dt>Spins</dt><dd>{session.spins}</dd></div>
          <div><dt>Staked</dt><dd>{money(session.staked, s.currency)}</dd></div>
          <div><dt>Won</dt><dd>{money(session.won, s.currency)}</dd></div>
          <div><dt>Net</dt><dd className={net < 0 ? 'neg' : net > 0 ? 'pos' : ''}>{net < 0 ? '-' : net > 0 ? '+' : ''}{money(Math.abs(net), s.currency)}</dd></div>
        </dl>
      </div>

      {excluded && <p className="drawer-warning launcher-warning"><ShieldAlert size={15} /> Play is paused while your break is active. <Link href="/safer-gambling">Safer gambling tools</Link></p>}

      {reality && (
        <div className="modal-backdrop" role="presentation">
          <section className="modal reality" role="dialog" aria-modal="true" aria-labelledby="reality-title">
            <p className="eyebrow"><Clock size={14} /> Reality check</p>
            <h2 id="reality-title">You&apos;ve been playing for {Math.round(elapsed / 60)} minutes</h2>
            <dl className="facts">
              <div><dt>Spins</dt><dd>{session.spins}</dd></div>
              <div><dt>Staked</dt><dd>{money(session.staked, s.currency)}</dd></div>
              <div><dt>Won</dt><dd>{money(session.won, s.currency)}</dd></div>
              <div><dt>Net</dt><dd>{net < 0 ? '-' : '+'}{money(Math.abs(net), s.currency)}</dd></div>
            </dl>
            <p className="sheet-desc">This reminder appears every {reminderMin} minutes. You can change the interval or set limits from your account.</p>
            <div className="hero-actions">
              <button className="button" onClick={() => setReality(false)}>Continue playing</button>
              <Link href="/" className="outline-button" onClick={actions.endSession}>Stop and return to lobby</Link>
            </div>
          </section>
        </div>
      )}

      {showInfo && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowInfo(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="info-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowInfo(false)} aria-label="Close"><X size={19} /></button>
            <p className="eyebrow">Game information</p>
            <h2 id="info-title">{game.title}</h2>
            <p className="sheet-desc">{game.description}</p>
            <dl className="facts">
              <div><dt>RTP</dt><dd>{game.rtp}%</dd></div>
              <div><dt>Volatility</dt><dd>{game.volatility}</dd></div>
              <div><dt>Min / max</dt><dd>{money(game.minBet, s.currency)} – {money(game.maxBet, s.currency)}</dd></div>
              <div><dt>{game.jackpot ? 'Jackpot' : 'Max win'}</dt><dd>{game.jackpot ? money(game.jackpot, s.currency) : `${game.maxWin.toLocaleString()}x`}</dd></div>
            </dl>
            <p className="sheet-desc">Three matching symbols illustrate a win; the payout shown is generated from a volatility profile, not a real game engine.</p>
          </section>
        </div>
      )}
    </div>
  )
}
