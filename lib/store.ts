'use client'

import { useSyncExternalStore } from 'react'
import type { Currency } from './format'

export type Transaction = { id: string; type: 'deposit' | 'withdrawal' | 'stake' | 'win' | 'bonus'; amount: number; note: string; at: string }
export type Limits = { dailyDeposit: number | null; weeklyLoss: number | null; sessionMinutes: number | null }
export type DemoUser = { name: string; email: string; joined: string }

export type LobbyState = {
  hydrated: boolean
  user: DemoUser | null
  currency: Currency
  balance: number
  points: number
  favourites: string[]
  recentlyPlayed: string[]
  transactions: Transaction[]
  limits: Limits
  selfExcludedUntil: string | null
  sessionStartedAt: string | null
  ui: { authModal: 'login' | 'register' | null; accountDrawer: boolean; detailSlug: string | null; search: boolean }
}

const KEY = 'nova-lobby-v1'

const initial: LobbyState = {
  hydrated: false,
  user: null,
  currency: 'GBP',
  balance: 0,
  points: 0,
  favourites: [],
  recentlyPlayed: [],
  transactions: [],
  limits: { dailyDeposit: null, weeklyLoss: null, sessionMinutes: null },
  selfExcludedUntil: null,
  sessionStartedAt: null,
  ui: { authModal: null, accountDrawer: false, detailSlug: null, search: false },
}

let state: LobbyState = initial
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function persist() {
  if (typeof window === 'undefined') return
  const { ui: _ui, hydrated: _h, ...rest } = state
  window.localStorage.setItem(KEY, JSON.stringify(rest))
}

function set(patch: Partial<LobbyState> | ((s: LobbyState) => Partial<LobbyState>)) {
  const next = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...next }
  persist()
  emit()
}

function hydrate() {
  if (state.hydrated || typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(KEY)
    const saved = raw ? (JSON.parse(raw) as Partial<LobbyState>) : {}
    state = { ...initial, ...saved, ui: initial.ui, hydrated: true }
  } catch {
    state = { ...initial, hydrated: true }
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!state.hydrated) queueMicrotask(hydrate)
  return () => listeners.delete(listener)
}

const id = () => Math.random().toString(36).slice(2, 10)
const now = () => new Date().toISOString()
const round = (n: number) => Math.round(n * 100) / 100
const DAY = 86400000

export const isExcluded = (s: LobbyState) => !!s.selfExcludedUntil && new Date(s.selfExcludedUntil).getTime() > Date.now()
export const depositedToday = (s: LobbyState) => s.transactions.filter((t) => t.type === 'deposit' && Date.now() - new Date(t.at).getTime() < DAY).reduce((a, t) => a + t.amount, 0)
export const netLossThisWeek = (s: LobbyState) => {
  const recent = s.transactions.filter((t) => Date.now() - new Date(t.at).getTime() < 7 * DAY)
  const staked = recent.filter((t) => t.type === 'stake').reduce((a, t) => a + t.amount, 0)
  const won = recent.filter((t) => t.type === 'win').reduce((a, t) => a + t.amount, 0)
  return round(Math.max(0, staked - won))
}
export type PlayOutcome = { ok: true; stake: number; win: number; multiplier: number } | { ok: false; reason: string }

export const actions = {
  setCurrency: (currency: Currency) => set({ currency }),
  openAuth: (mode: 'login' | 'register') => set((s) => ({ ui: { ...s.ui, authModal: mode, accountDrawer: false } })),
  closeAuth: () => set((s) => ({ ui: { ...s.ui, authModal: null } })),
  openAccount: () => set((s) => (s.user ? { ui: { ...s.ui, accountDrawer: true } } : { ui: { ...s.ui, authModal: 'login' } })),
  closeAccount: () => set((s) => ({ ui: { ...s.ui, accountDrawer: false } })),
  openDetail: (slug: string) => set((s) => ({ ui: { ...s.ui, detailSlug: slug } })),
  closeDetail: () => set((s) => ({ ui: { ...s.ui, detailSlug: null } })),
  openSearch: () => set((s) => ({ ui: { ...s.ui, search: true } })),
  closeSearch: () => set((s) => ({ ui: { ...s.ui, search: false } })),
  signIn: (name: string, email: string) =>
    set((s) => ({
      user: { name: name || email.split('@')[0] || 'Player', email, joined: s.user?.joined ?? now() },
      balance: s.user ? s.balance : 250,
      transactions: s.user ? s.transactions : [{ id: id(), type: 'bonus', amount: 250, note: 'Welcome demo credits', at: now() }, ...s.transactions],
      ui: { ...s.ui, authModal: null },
    })),
  signOut: () => set({ user: null, ui: initial.ui }),
  toggleFavourite: (gameId: string) => set((s) => ({ favourites: s.favourites.includes(gameId) ? s.favourites.filter((f) => f !== gameId) : [gameId, ...s.favourites] })),
  deposit: (amount: number): { ok: boolean; reason?: string } => {
    if (isExcluded(state)) return { ok: false, reason: 'Deposits are paused while a break is active.' }
    if (state.limits.dailyDeposit !== null && depositedToday(state) + amount > state.limits.dailyDeposit) return { ok: false, reason: 'This would exceed your daily deposit limit.' }
    set((s) => ({
      balance: round(s.balance + amount),
      transactions: [{ id: id(), type: 'deposit' as const, amount, note: 'Demo deposit', at: now() }, ...s.transactions].slice(0, 100),
    }))
    return { ok: true }
  },
  withdraw: (amount: number) =>
    set((s) => {
      const a = Math.min(amount, s.balance)
      return { balance: Math.round((s.balance - a) * 100) / 100, transactions: [{ id: id(), type: 'withdrawal' as const, amount: a, note: 'Demo withdrawal', at: now() }, ...s.transactions].slice(0, 100) }
    }),
  playDemo: (gameId: string, title: string, requestedStake = 2, volatility: 'Low' | 'Medium' | 'High' | 'Very High' = 'Medium'): PlayOutcome => {
    const s = state
    if (!s.user) return { ok: false, reason: 'Log in to play.' }
    if (isExcluded(s)) return { ok: false, reason: 'Play is paused while your break is active.' }
    const stake = round(Math.min(requestedStake, s.balance))
    if (stake <= 0) return { ok: false, reason: 'Your demo balance is empty. Add demo credits to keep playing.' }
    if (s.limits.weeklyLoss !== null && netLossThisWeek(s) + stake > s.limits.weeklyLoss) return { ok: false, reason: 'This spin would exceed your weekly loss limit.' }
    // Hit rate and payout spread scale with volatility; RTP stays illustrative.
    const profile = { Low: [0.45, 3], Medium: [0.38, 6], High: [0.28, 14], 'Very High': [0.2, 30] }[volatility]
    const hit = Math.random() < profile[0]
    const multiplier = hit ? round(0.5 + Math.random() ** 2 * profile[1]) : 0
    const win = round(stake * multiplier)
    const txs: Transaction[] = []
    txs.push({ id: id(), type: 'stake', amount: stake, note: `Demo spin \u00b7 ${title}`, at: now() })
    if (win > 0) txs.push({ id: id(), type: 'win', amount: win, note: `Demo win \u00b7 ${title}`, at: now() })
    set({
      balance: round(s.balance - stake + win),
      points: s.points + Math.round(stake * 10) + 5,
      recentlyPlayed: [gameId, ...s.recentlyPlayed.filter((r) => r !== gameId)].slice(0, 12),
      transactions: [...txs.reverse(), ...s.transactions].slice(0, 100),
      sessionStartedAt: s.sessionStartedAt ?? now(),
    })
    return { ok: true, stake, win, multiplier }
  },
  startSession: () => set((s) => ({ sessionStartedAt: s.sessionStartedAt ?? now() })),
  endSession: () => set({ sessionStartedAt: null }),
  setLimits: (limits: Partial<Limits>) => set((s) => ({ limits: { ...s.limits, ...limits } })),
  selfExclude: (days: number) => set({ selfExcludedUntil: new Date(Date.now() + days * 86400000).toISOString(), ui: initial.ui }),
  clearSelfExclusion: () => set({ selfExcludedUntil: null }),
  reset: () => set({ ...initial, hydrated: true }),
}

export function useLobby<T>(selector: (s: LobbyState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(initial))
}

export const useLobbyState = () => useLobby((s) => s)
