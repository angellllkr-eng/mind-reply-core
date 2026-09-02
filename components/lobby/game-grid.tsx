'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { categories, games, type Game } from '@/lib/data/games'
import { providerPacks, providers } from '@/lib/data/providers'
import { actions } from '@/lib/store'
import { GameCard } from './game-card'

type Sort = 'Popular' | 'Newest' | 'A–Z' | 'RTP' | 'Jackpot'
const sorts: Sort[] = ['Popular', 'Newest', 'A–Z', 'RTP', 'Jackpot']
const tabs = ['All games', ...categories, 'New', 'Exclusives']
const PAGE = 18

export function GameGrid() {
  const params = useSearchParams()
  const router = useRouter()
  const [category, setCategory] = useState(params.get('cat') ?? 'All games')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [selected, setSelected] = useState<string[]>(providers.map((p) => p.id))
  const [sort, setSort] = useState<Sort>('Popular')
  const [volatility, setVolatility] = useState<string>('Any')
  const [showProviders, setShowProviders] = useState(false)
  const [limit, setLimit] = useState(PAGE)

  useEffect(() => {
    const c = params.get('cat')
    const q = params.get('q')
    if (c) setCategory(c)
    if (q !== null) setQuery(q)
    if (c || q) setLimit(PAGE)
  }, [params])

  const filtered = useMemo(() => {
    let list = games.filter((g) => selected.includes(g.providerId))
    if (category === 'New') list = list.filter((g) => g.isNew)
    else if (category === 'Exclusives') list = list.filter((g) => g.isExclusive)
    else if (category !== 'All games') list = list.filter((g) => g.category === category)
    if (volatility !== 'Any') list = list.filter((g) => g.volatility === volatility)
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((g) => g.title.toLowerCase().includes(q) || providers.find((p) => p.id === g.providerId)?.name.toLowerCase().includes(q) || g.tags.some((t) => t.toLowerCase().includes(q)))
    const cmp: Record<Sort, (a: Game, b: Game) => number> = {
      Popular: (a, b) => b.popularity - a.popularity,
      Newest: (a, b) => b.released.localeCompare(a.released),
      'A–Z': (a, b) => a.title.localeCompare(b.title),
      RTP: (a, b) => b.rtp - a.rtp,
      Jackpot: (a, b) => (b.jackpot ?? 0) - (a.jackpot ?? 0),
    }
    return [...list].sort(cmp[sort])
  }, [category, query, selected, sort, volatility])

  const reset = () => { setCategory('All games'); setQuery(''); setSelected(providers.map((p) => p.id)); setSort('Popular'); setVolatility('Any'); setLimit(PAGE); router.replace('/#games') }
  const surprise = () => { const pool = filtered.length ? filtered : games; actions.openDetail(pool[Math.floor(Math.random() * pool.length)].slug) }
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const packSelected = (ids: string[]) => ids.length === selected.length && ids.every((i) => selected.includes(i))

  return (
    <section className="lobby-section" id="games">
      <div className="section-heading">
        <div><p className="eyebrow">FULL CATALOGUE</p><h2>All {games.length} games, your way.</h2></div>
        <div className="heading-actions">
          <button className="surprise-button" onClick={surprise}><Sparkles size={15} /> Surprise me</button>
          <button className="all-link" onClick={reset}>Reset filters <X size={15} /></button>
        </div>
      </div>

      <div className="controls">
        <div className="category-tabs" role="tablist" aria-label="Game categories">
          {tabs.map((t) => <button role="tab" aria-selected={category === t} key={t} className={category === t ? 'selected' : ''} onClick={() => { setCategory(t); setLimit(PAGE) }}>{t}</button>)}
        </div>
        <label className="search-box"><Search size={17} /><span className="sr-only">Search games</span><input value={query} onChange={(e) => { setQuery(e.target.value); setLimit(PAGE) }} placeholder="Search title, studio, feature" /></label>
      </div>

      <div className="toolbar">
        <div className="toolbar-group">
          <label className="select-wrap"><span>Sort</span><select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort games">{sorts.map((s) => <option key={s}>{s}</option>)}</select><ChevronDown size={14} /></label>
          <label className="select-wrap"><span>Volatility</span><select value={volatility} onChange={(e) => setVolatility(e.target.value)} aria-label="Filter by volatility">{['Any', 'Low', 'Medium', 'High', 'Very High'].map((v) => <option key={v}>{v}</option>)}</select><ChevronDown size={14} /></label>
          <button className={`toolbar-button ${showProviders ? 'selected' : ''}`} onClick={() => setShowProviders(!showProviders)} aria-expanded={showProviders}><SlidersHorizontal size={14} /> Providers ({selected.length}/{providers.length})</button>
        </div>
        <span className="result-count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
      </div>

      {showProviders && (
        <div className="provider-picker">
          <div className="provider-heading">
            <div><p className="eyebrow">PROVIDER PACKS</p><strong>{selected.length} of {providers.length} studios selected</strong></div>
            <div className="provider-actions"><button onClick={() => setSelected(providers.map((p) => p.id))}>Select all</button><button onClick={() => setSelected([])}>Clear all</button></div>
          </div>
          <div className="provider-packs">{providerPacks.map((p) => <button key={p.name} className={packSelected(p.ids) ? 'pack-selected' : ''} onClick={() => setSelected(p.ids)}>{p.name}</button>)}</div>
          <div className="provider-list">{providers.map((p) => <label key={p.id} className="provider-option"><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)} /> {p.name} <small>{p.tier}</small></label>)}</div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state"><h3>No games match those filters.</h3><p>Try a different category, clear the search, or add more studios.</p><button className="outline-button" onClick={reset}>Reset filters</button></div>
      ) : (
        <>
          <div className="game-grid">{filtered.slice(0, limit).map((g) => <GameCard key={g.id} game={g} />)}</div>
          {limit < filtered.length && <div className="load-more"><button className="outline-button" onClick={() => setLimit(limit + PAGE)}>Load {Math.min(PAGE, filtered.length - limit)} more <ChevronDown size={15} /></button><span>Showing {Math.min(limit, filtered.length)} of {filtered.length}</span></div>}
        </>
      )}
    </section>
  )
}
