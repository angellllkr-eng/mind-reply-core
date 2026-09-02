'use client'

import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { actions, useLobby } from '@/lib/store'

export function AuthModal() {
  const mode = useLobby((s) => s.ui.authModal)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [over18, setOver18] = useState(false)
  if (!mode) return null

  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (mode === 'register' && !over18) return setError('You must confirm you are 18 or over.')
    setError('')
    actions.signIn(name, email)
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={actions.closeAuth}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={actions.closeAuth} aria-label="Close dialog"><X size={19} /></button>
        <p className="eyebrow">NOVA MEMBERS</p>
        <h2 id="auth-title">{mode === 'login' ? 'Welcome back.' : 'Make your moment.'}</h2>
        <p className="modal-copy">{mode === 'login' ? 'Sign in to your demo account. Your favourites, wallet and history are stored on this device.' : 'Create a demo account and receive 250 demo credits to explore the lobby. No real money is involved.'}</p>
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
          {mode === 'register' && <input className="modal-input" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Display name" />}
          <input className="modal-input" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" autoComplete="email" />
          <input className="modal-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          {mode === 'register' && <label className="check-row"><input type="checkbox" checked={over18} onChange={(e) => setOver18(e.target.checked)} /> I confirm I am 18 or over and accept the demo terms.</label>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button modal-submit">{mode === 'login' ? 'Log in' : 'Create demo account'} <ArrowRight size={16} /></button>
        </form>
        <p className="modal-switch">{mode === 'login' ? 'New here? ' : 'Already a member? '}<button onClick={() => actions.openAuth(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Log in'}</button></p>
      </section>
    </div>
  )
}
