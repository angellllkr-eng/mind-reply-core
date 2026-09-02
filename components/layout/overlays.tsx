'use client'

import { useEffect } from 'react'
import { AuthModal } from '@/components/account/auth-modal'
import { AccountDrawer } from '@/components/account/account-drawer'
import { GameDetailSheet } from '@/components/game/game-detail-sheet'
import { actions, useLobbyState } from '@/lib/store'

export function Overlays() {
  const ui = useLobbyState().ui
  const open = !!(ui.authModal || ui.accountDrawer || ui.detailSlug)
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { actions.closeAuth(); actions.closeAccount(); actions.closeDetail() } }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])
  return <><AuthModal /><AccountDrawer /><GameDetailSheet /></>
}
