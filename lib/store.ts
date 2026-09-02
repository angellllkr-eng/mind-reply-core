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
  ui: { authModal: 'login' | 'register' | null; accountDrawer: boolean; detailSlug: string | null }
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
  ui: { authModal: null, accountDrawer: false, detailSlug: null },
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

export const actions = {
  setCurrency: (currency: Currency) => set({ currency }),
  openAuth: (mode: 'login' | 'register') => set((s) => ({ ui: { ...s.ui, authModal: mode, accountDrawer: false } })),
  closeAuth: () => set((s) => ({ ui: { ...s.ui, authModal: null } })),
  openAccount: () => set((s) => (s.user ? { ui: { ...s.ui, accountDrawer: true } } : { ui: { ...s.ui, authModal: 'login' } })),
  closeAccount: () => set((s) => ({ ui: { ...s.ui, accountDrawer: false } })),
  openDetail: (slug: string) => set((s) => ({ ui: { ...s.ui, detailSlug: slug } })),
  closeDetail: () => set((s) => ({ ui: { ...s.ui, detailSlug: null } })),
  signIn: (name: string, email: string) =>
    set((s) => ({
      user: { name: name || email.split('@')[0] || 'Player', email, joined: s.user?.joined ?? now() },
      balance: s.user ? s.balance : 250,
      transactions: s.user ? s.transactions : [{ id: id(), type: 'bonus', amount: 250, note: 'Welcome demo credits', at: now() }, ...s.transactions],
      ui: { ...s.ui, authModal: null },
    })),
  signOut: () => set({ user: null, ui: initial.ui }),
  toggleFavourite: (gameId: string) => set((s) => ({ favourites: s.favourites.includes(gameId) ? s.favourites.filter((f) => f !== gameId) : [gameId, ...s.favourites] })),
  deposit: (amount: number) =>
    set((s) => ({
      balance: Math.round((s.balance + amount) * 100) / 100,
      transactions: [{ id: id(), type: 'deposit' as const, amount, note: 'Demo deposit', at: now() }, ...s.transactions].slice(0, 100),
    })),
  withdraw: (amount: number) =>
    set((s) => {
      const a = Math.min(amount, s.balance)
      return { balance: Math.round((s.balance - a) * 100) / 100, transactions: [{ id: id(), type: 'withdrawal' as const, amount: a, note: 'Demo withdrawal', at: now() }, ...s.transactions].slice(0, 100) }
    }),
  playDemo: (gameId: string, title: string) =>
    set((s) => {
      const stake = Math.min(2, s.balance)
      const win = Math.random() < 0.38 ? Math.round(stake * (1 + Math.random() * 6) * 100) / 100 : 0
      const txs: Transaction[] = []
      if (stake > 0) txs.push({ id: id(), type: 'stake', amount: stake, note: `Demo spin \u00b7 ${title}`, at: now() })
      if (win > 0) txs.push({ id: id(), type: 'win', amount: win, note: `Demo win \u00b7 ${title}`, at: now() })
      return {
        balance: Math.round((s.balance - stake + win) * 100) / 100,
        points: s.points + Math.round(stake * 10) + 5,
        recentlyPlayed: [gameId, ...s.recentlyPlayed.filter((r) => r !== gameId)].slice(0, 12),
        transactions: [...txs.reverse(), ...s.transactions].slice(0, 100),
      }
    }),
  setLimits: (limits: Partial<Limits>) => set((s) => ({ limits: { ...s.limits, ...limits } })),
  selfExclude: (days: number) => set({ selfExcludedUntil: new Date(Date.now() + days * 86400000).toISOString(), ui: initial.ui }),
  clearSelfExclusion: () => set({ selfExcludedUntil: null }),
  reset: () => set({ ...initial, hydrated: true }),
}

export function useLobby<T>(selector: (s: LobbyState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(initial))
}

export const useLobbyState = () => useLobby((s) => s)
export const isExcluded = (s: LobbyState) => !!s.selfExcludedUntil && new Date(s.selfExcludedUntil).getTime() > Date.now()
