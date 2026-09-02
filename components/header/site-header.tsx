'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Gift, Home, Menu, Radio, Search, Trophy, User, Wallet, X } from 'lucide-react'
import { actions, useLobbyState } from '@/lib/store'
import { totalJackpot } from '@/lib/data/games'
import { money, type Currency } from '@/lib/format'

const nav = [
  { href: '/', label: 'Casino' },
  { href: '/live', label: 'Live' },
  { href: '/?cat=Slots#games', label: 'Slots' },
  { href: '/?cat=Jackpots#games', label: 'Jackpots' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/rewards', label: 'Rewards' },
]

const ribbon = ['All games', 'Slots', 'Live Casino', 'Table Games', 'Jackpots', 'Megaways', 'Instant Win', 'New', 'Exclusives']

export function SiteHeader() {
  const s = useLobbyState()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')

  const submitSearch = () => {
    if (!q.trim()) return
    router.push(`/?q=${encodeURIComponent(q.trim())}#games`)
    setQ('')
  }

  return (
    <>
      <div className="utility">
        <span><span className="status-dot" /> Studio preview · Demo credits only · Play responsibly</span>
        <span className="utility-links">18+　|　<Link href="/account">Help centre</Link>　|　EN</span>
      </div>
      <header className="site-header">
        <div className="header-primary">
          <Link className="wordmark" href="/" aria-label="NOVA home"><span className="wordmark-mark">N</span><span>NOVA<span className="wordmark-dot">.</span></span></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((n) => <Link key={n.label} href={n.href} className={pathname === n.href.split('?')[0].split('#')[0] && !n.href.includes('?') ? 'active' : ''}>{n.label}</Link>)}
          </nav>
          <label className="header-search">
            <Search size={16} /><span className="sr-only">Search games</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submitSearch() }} placeholder="Search 170+ games" />
          </label>
          <div className="header-actions">
            {s.user ? (
              <>
                <button className="balance-pill balance-button" onClick={actions.openAccount} aria-label="Open account and wallet">
                  <Wallet size={14} /><span className="balance-amount">{money(s.balance, s.currency)}</span>
                </button>
                <button className="deposit-button" onClick={actions.openAccount}><Wallet size={15} /> Deposit</button>
                <button className="login-button" onClick={actions.openAccount} aria-label="Account"><User size={15} /> {s.user.name.split(' ')[0]}</button>
              </>
            ) : (
              <>
                <div className="balance-pill">
                  <span className="balance-amount">{money(0, s.currency)}</span>
                  <select className="currency-select" value={s.currency} onChange={(e) => actions.setCurrency(e.target.value as Currency)} aria-label="Select currency"><option>GBP</option><option>EUR</option><option>USD</option></select>
                </div>
                <button className="deposit-button" onClick={() => actions.openAuth('register')}><Wallet size={15} /> Join</button>
                <button className="login-button" onClick={() => actions.openAuth('login')}><User size={15} /> Log in</button>
              </>
            )}
            <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        <div className="header-ribbon">
          <div className="ribbon-tabs">
            {ribbon.map((item) => <Link key={item} href={item === 'All games' ? '/#games' : `/?cat=${encodeURIComponent(item)}#games`} className="ribbon-tab">{item}</Link>)}
          </div>
          <Link href="/?cat=Jackpots#games" className="ribbon-jackpot"><Trophy size={14} /> <span>Total jackpots</span> <strong>{money(totalJackpot, s.currency)}</strong></Link>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((n) => <Link key={n.label} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</Link>)}
          <Link href="/account" onClick={() => setMenuOpen(false)}>Account</Link>
        </nav>
      )}
      <nav className="bottom-nav" aria-label="Quick navigation">
        <Link href="/" className={pathname === '/' ? 'active' : ''}><Home size={18} /><span>Lobby</span></Link>
        <Link href="/live" className={pathname === '/live' ? 'active' : ''}><Radio size={18} /><span>Live</span></Link>
        <Link href="/promotions" className={pathname === '/promotions' ? 'active' : ''}><Gift size={18} /><span>Promos</span></Link>
        <Link href="/rewards" className={pathname === '/rewards' ? 'active' : ''}><Trophy size={18} /><span>Rewards</span></Link>
        <button onClick={actions.openAccount}><User size={18} /><span>{s.user ? 'Account' : 'Log in'}</span></button>
      </nav>
    </>
  )
}
