'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, ChevronRight, Heart, Menu, Play, Search, ShieldCheck, Sparkles, Trophy, X, Zap } from 'lucide-react'

type Game = { title: string; provider: string; category: string; art: string; tone: string; tag?: string }

const games: Game[] = [
  { title: 'Fortune Flares', provider: 'Northstar Studios', category: 'Slots', art: '7', tone: 'violet', tag: 'HOT' },
  { title: '40 Treasures: Diamond Tree', provider: 'Crown & Thorn', category: 'Slots', art: '✦', tone: 'gold', tag: 'NEW' },
  { title: 'Neon Roulette', provider: 'Velvet Table', category: 'Live Casino', art: '00', tone: 'blue' },
  { title: 'Solaris Blackjack', provider: 'Velvet Table', category: 'Table Games', art: '♠', tone: 'red' },
  { title: 'Moonlit Wins', provider: 'Northstar Studios', category: 'Slots', art: '☾', tone: 'cyan' },
  { title: 'Jade Dragon', provider: 'Eastline Games', category: 'Jackpots', art: '龍', tone: 'green', tag: 'MEGA' },
  { title: 'Royal Rush', provider: 'Crown & Thorn', category: 'Slots', art: '♛', tone: 'gold', tag: 'HOT' },
  { title: 'Orbit Dice', provider: 'Northstar Studios', category: 'Table Games', art: '⚄', tone: 'blue' },
  { title: 'Velvet Baccarat', provider: 'Velvet Table', category: 'Live Casino', art: 'A', tone: 'red' },
  { title: 'Aurora Gems', provider: 'Eastline Games', category: 'Jackpots', art: '◆', tone: 'cyan' },
  { title: 'Lucky Lanterns', provider: 'Eastline Games', category: 'Slots', art: '8', tone: 'green' },
  { title: 'Golden 21', provider: 'Velvet Table', category: 'Table Games', art: '21', tone: 'violet', tag: 'NEW' },
]

const categories = ['All games', 'Slots', 'Live Casino', 'Table Games', 'Jackpots']
const providers = Array.from(new Set(games.map((game) => game.provider)))
const packs = [
  { name: 'All providers', values: providers },
  { name: 'Premium tables', values: ['Velvet Table', 'Crown & Thorn'] },
  { name: 'Studio originals', values: ['Northstar Studios', 'Eastline Games'] },
]

function GameCard({ game, favorite, onFavorite, onLaunch }: { game: Game; favorite: boolean; onFavorite: () => void; onLaunch: () => void }) {
  return (
    <article className="game-card">
      <button className={`favorite ${favorite ? 'favorited' : ''}`} onClick={onFavorite} aria-label={`${favorite ? 'Remove' : 'Add'} ${game.title} ${favorite ? 'from' : 'to'} favorites`}><Heart size={16} fill={favorite ? 'currentColor' : 'none'} /></button>
      <button className={`game-art art-${game.tone}`} onClick={onLaunch} aria-label={`Preview ${game.title}`}>
        <strong>{game.art}</strong><span className="game-art-word">{game.title}</span><span className="game-art-shine" /><span className="play-hover"><Play size={18} fill="currentColor" /></span>{game.tag && <span className="game-tag">{game.tag}</span>}
      </button>
      <div className="game-meta"><div><h3>{game.title}</h3><p>{game.provider}</p></div><ChevronRight className="game-arrow" size={17} /></div>
    </article>
  )
}

function Modal({ modal, onClose }: { modal: 'login' | 'register'; onClose: () => void }) {
  return <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={19} /></button><p className="eyebrow">NOVA MEMBERS</p><h2 id="modal-title">{modal === 'login' ? 'Welcome back.' : 'Make your moment.'}</h2><p className="modal-copy">Demo sign-in for the Nova experience.</p><input className="modal-input" placeholder="Email address" type="email" aria-label="Email address" /><input className="modal-input" placeholder="Password" type="password" aria-label="Password" /><button className="button modal-submit" onClick={onClose}>Continue <ArrowRight size={16} /></button></section>
}

function LaunchModal({ game, onClose }: { game: Game; onClose: () => void }) {
  return <section className="launch-modal" role="dialog" aria-modal="true" aria-labelledby="launch-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close game preview"><X size={19} /></button><div className={`launch-art art-${game.tone}`}><strong>{game.art}</strong><span>{game.title}</span></div><div className="launch-copy"><p className="eyebrow"><Zap size={14} /> DEMO PREVIEW</p><h2 id="launch-title">{game.title}</h2><p>This is a visual demo only. No account, payment, wager, or real-money play is available.</p><button className="button" onClick={onClose}>Return to lobby <ArrowRight size={16} /></button></div></section>
}

export default function Page() {
  const [category, setCategory] = useState('All games')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(providers)
  const [favorites, setFavorites] = useState<string[]>([])
  const [modal, setModal] = useState<'login' | 'register' | null>(null)
  const [launch, setLaunch] = useState<Game | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('EUR')
  const filtered = useMemo(() => games.filter((game) => (category === 'All games' || game.category === category) && selected.includes(game.provider) && game.title.toLowerCase().includes(query.toLowerCase())), [category, query, selected])
  const closeOverlays = () => { setModal(null); setLaunch(null) }
  const toggle = (provider: string) => setSelected((items) => items.includes(provider) ? items.filter((item) => item !== provider) : [...items, provider])
  const reset = () => { setCategory('All games'); setQuery(''); setSelected(providers) }
  const surprise = () => { const pool = filtered.length ? filtered : games; setLaunch(pool[Math.floor(Math.random() * pool.length)]) }

  return <main className="min-h-screen bg-background text-foreground">
    <div className="utility"><span><span className="status-dot" /> Studio preview · Play responsibly</span><span className="utility-links">18+　|　Help center　|　EN</span></div>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="NOVA home"><span className="wordmark-mark">N</span><span>NOVA<span className="wordmark-dot">.</span></span></a><nav className="desktop-nav" aria-label="Primary navigation"><a className="active" href="#games">Casino</a><a href="#live">Live tables</a><a href="#jackpot">Jackpots</a><a href="#rewards">Rewards</a></nav><div className="header-actions"><select className="currency-select" value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Select currency"><option>EUR</option><option>GBP</option><option>USD</option></select><span className="demo-balance">{currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}0.00 demo</span><button className="login-button" onClick={() => setModal('login')}>Log in</button><button className="button button-small" onClick={() => setModal('register')}>Create account <ArrowRight size={15} /></button><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={20} /></button></div></header>
    {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#games" onClick={() => setMenuOpen(false)}>Casino</a><a href="#live" onClick={() => setMenuOpen(false)}>Live tables</a><a href="#jackpot" onClick={() => setMenuOpen(false)}>Jackpots</a><a href="#rewards" onClick={() => setMenuOpen(false)}>Rewards</a></nav>}
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><Sparkles size={15} /> THE NOVA WELCOME</p><h1>Find your<br /><em>lucky</em> moment.</h1><p className="hero-description">A brighter way to play. Discover handpicked games, beautiful tables, and rewards that feel genuinely yours.</p><div className="hero-actions"><button className="button" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>Explore the lobby <ArrowRight size={17} /></button><button className="text-button" onClick={() => setLaunch(games[1])}><span className="play-icon"><Play size={12} fill="currentColor" /></span> See how it works</button></div></div><div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card"><span className="hero-card-label">TONIGHT&apos;S FEATURE</span><strong>40</strong><span>TREASURES</span><small>DIAMOND TREE</small><div className="hero-card-stars">✦　✦　✦</div></div><div className="hero-chip">NOVA<br /><span>♣</span></div></div><div className="hero-foot"><span>Trusted by 24,000+ players</span><span className="hero-foot-line" /><span>Licensed &amp; secure</span><ShieldCheck size={16} /></div></section>
    <section className="lobby-section" id="games"><div className="quick-overview" aria-label="Quick game categories"><div className="quick-overview-copy"><p className="eyebrow">START HERE</p><h2>Pick a mood.</h2><p>Jump straight into the kind of play you feel like today.</p></div><div className="quick-overview-actions">{categories.slice(1).map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'quick-pick selected' : 'quick-pick'}><span>{item === 'Slots' ? '7' : item === 'Live Casino' ? '♠' : item === 'Table Games' ? '21' : '◆'}</span><strong>{item}</strong><small>{games.filter((game) => game.category === item).length} games</small></button>)}</div></div><div className="section-heading"><div><p className="eyebrow">THE LOBBY</p><h2>Something for every mood.</h2></div><div className="heading-actions"><button className="surprise-button" onClick={surprise}><Sparkles size={15} /> Surprise me</button><button className="all-link" onClick={reset}>View all games <ChevronRight size={17} /></button></div></div><div className="controls"><div className="category-tabs" role="tablist" aria-label="Game categories">{categories.map((item) => <button role="tab" aria-selected={category === item} key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><span className="sr-only">Search games</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games" /></label></div><div className="provider-picker"><div className="provider-heading"><div><p className="eyebrow">PROVIDER PACKS</p><strong>{selected.length} of {providers.length} providers selected</strong></div><div className="provider-actions"><button onClick={() => setSelected(providers)}>Select all</button><button onClick={() => setSelected([])}>Clear all</button></div></div><div className="provider-packs">{packs.map((pack) => <button key={pack.name} className={pack.values.every((value) => selected.includes(value)) ? 'pack-selected' : ''} onClick={() => setSelected(pack.values)}>{pack.name}</button>)}</div><div className="provider-list">{providers.map((provider) => <label className="provider-option" key={provider}><input type="checkbox" checked={selected.includes(provider)} onChange={() => toggle(provider)} /><span>{provider}</span></label>)}</div></div>{filtered.length ? <div className="game-grid">{filtered.map((game) => <GameCard key={game.title} game={game} favorite={favorites.includes(game.title)} onFavorite={() => setFavorites((items) => items.includes(game.title) ? items.filter((item) => item !== game.title) : [...items, game.title])} onLaunch={() => setLaunch(game)} />)}</div> : <div className="empty-state"><h3>No games match those filters.</h3><p>Try another category, provider, or search term.</p><button className="outline-button" onClick={reset}>Reset filters</button></div>}</section>
    <section className="feature-strip" id="jackpot"><div className="feature-icon"><Trophy size={23} /></div><div><p className="eyebrow">NOVA JACKPOT</p><h2>One shared dream. <span>€184,920.72</span></h2><p>Every eligible spin adds to the meter. The next big moment could be yours.</p></div><button className="outline-button" onClick={() => { setCategory('Jackpots'); document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' }) }}>See jackpot games <ArrowRight size={16} /></button></section>
    <footer id="rewards"><div className="footer-brand"><a className="wordmark" href="#top"><span className="wordmark-mark">N</span><span>NOVA<span className="wordmark-dot">.</span></span></a><p>Your moment, beautifully played.</p></div><div className="footer-note"><ShieldCheck size={18} /><div><strong>Play with intention.</strong><p>18+ only. This is a demo interface with no real-money wagering, payments, or gambling functionality.</p></div></div><span className="footer-copy">© 2026 Nova Play · Responsible gaming</span></footer>
    {(modal || launch) && <div className="modal-backdrop" role="presentation" onClick={closeOverlays}>{modal ? <Modal modal={modal} onClose={closeOverlays} /> : launch ? <LaunchModal game={launch} onClose={closeOverlays} /> : null}</div>}
  </main>
}
