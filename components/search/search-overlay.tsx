'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Building2, CornerDownLeft, Search, X } from 'lucide-react'
import { byPopularity, games } from '@/lib/data/games'
import { providers } from '@/lib/data/providers'
import { actions, useLobbyState } from '@/lib/store'

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const quick = ['Megaways', 'Jackpot', 'Roulette', 'Blackjack', 'Live', 'Free spins']

export function SearchOverlay() {
  const open = useLobbyState().ui.search
  const router = useRouter()
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open ? actions.closeSearch() : actions.openSearch() }
      if (e.key === '/' && !open && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)) { e.preventDefault(); actions.openSearch() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) { setQ(''); setCursor(0); window.setTimeout(() => inputRef.current?.focus(), 30) }
  }, [open])

  const results = useMemo(() => {
    const n = norm(q.trim())
    if (!n) return { games: [], studios: [] }
    const gameHits = byPopularity(games.filter((g) => norm(g.title).includes(n) || norm(g.category).includes(n) || g.tags.some((t) => norm(t).includes(n)) || norm(providers.find((p) => p.id === g.providerId)?.name ?? '').includes(n))).slice(0, 8)
    const studioHits = providers.filter((p) => norm(p.name).includes(n)).slice(0, 3)
    return { games: gameHits, studios: studioHits }
  }, [q])

  const rows = [...results.games.map((g) => ({ kind: 'game' as const, href: `/game/${g.slug}`, slug: g.slug })), ...results.studios.map((p) => ({ kind: 'studio' as const, href: `/studio/${p.id}`, slug: p.id }))]

  const go = (i: number) => {
    const row = rows[i]
    if (!row) { if (q.trim()) { router.push(`/?q=${encodeURIComponent(q.trim())}#games`); actions.closeSearch() } return }
    if (row.kind === 'game') actions.openDetail(row.slug)
    else router.push(row.href)
    actions.closeSearch()
  }

  if (!open) return null

  return (
    <div className="modal-backdrop search-backdrop" role="presentation" onClick={actions.closeSearch}>
      <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search games and studios" onClick={(e) => e.stopPropagation()}>
        <div className="search-input">
          <Search size={18} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setCursor(0) }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(rows.length - 1, c + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)) }
              if (e.key === 'Enter') go(cursor)
            }}
            placeholder="Search games, studios, features…"
            aria-label="Search"
          />
          <button className="icon-button" onClick={actions.closeSearch} aria-label="Close search"><X size={18} /></button>
        </div>
        {!q.trim() ? (
          <div className="search-empty">
            <p className="drawer-label">Try</p>
            <div className="chip-row" style={{ margin: 0 }}>{quick.map((k) => <button key={k} className="chip" onClick={() => setQ(k)}>{k}</button>)}</div>
            <p className="drawer-sub">Press <kbd>↑</kbd> <kbd>↓</kbd> to move, <kbd>Enter</kbd> to open, <kbd>Esc</kbd> to close.</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="search-empty"><p className="drawer-sub">No matches for &ldquo;{q}&rdquo;. Press Enter to search the full grid.</p></div>
        ) : (
          <ul className="search-results" role="listbox">
            {results.games.map((g, i) => (
              <li key={g.id} role="option" aria-selected={cursor === i} className={cursor === i ? 'selected' : ''} onMouseEnter={() => setCursor(i)}>
                <button onClick={() => go(i)}>
                  <span className={`similar-tile art-${g.tone}`}><strong>{g.art}</strong></span>
                  <span className="search-text"><strong>{g.title}</strong><small>{g.category} · {providers.find((p) => p.id === g.providerId)?.name} · RTP {g.rtp}%</small></span>
                  {cursor === i && <CornerDownLeft size={14} />}
                </button>
              </li>
            ))}
            {results.studios.map((p, k) => {
              const i = results.games.length + k
              return (
                <li key={p.id} role="option" aria-selected={cursor === i} className={cursor === i ? 'selected' : ''} onMouseEnter={() => setCursor(i)}>
                  <Link href={`/studio/${p.id}`} onClick={actions.closeSearch}>
                    <span className="similar-tile studio-tile"><Building2 size={18} /></span>
                    <span className="search-text"><strong>{p.name}</strong><small>Studio · {games.filter((g) => g.providerId === p.id).length} games</small></span>
                    <ArrowRight size={14} />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
        {q.trim() && <button className="search-all" onClick={() => go(-1)}>See all results for &ldquo;{q}&rdquo; in the grid <ArrowRight size={14} /></button>}
      </section>
    </div>
  )
}
