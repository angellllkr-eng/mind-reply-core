import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { byNewest, byPopularity, categories, games, totalJackpot } from '@/lib/data/games'
import { liveTables } from '@/lib/data/live-tables'
import { GameGrid } from '@/components/lobby/game-grid'
import { GameRail } from '@/components/lobby/game-rail'
import { PromoCarousel } from '@/components/promos/promo-carousel'
import { LiveTableCard } from '@/components/live/live-table-card'
import { PersonalRails } from '@/components/lobby/personal-rails'
import { JackpotMeter } from '@/components/lobby/jackpot-meter'

const moods = [
  { label: 'Slots', art: '7', cat: 'Slots' },
  { label: 'Live Casino', art: '\u2660', cat: 'Live Casino' },
  { label: 'Table Games', art: '21', cat: 'Table Games' },
  { label: 'Jackpots', art: '\u25c6', cat: 'Jackpots' },
  { label: 'Megaways', art: '\u26a1', cat: 'Megaways' },
  { label: 'Instant Win', art: '\u2605', cat: 'Instant Win' },
]

export default function Page() {
  const featured = games.filter((g) => g.isFeatured)
  const fresh = byNewest(games).slice(0, 14)
  const popular = byPopularity(games).slice(0, 14)
  const jackpots = games.filter((g) => g.jackpot).sort((a, b) => (b.jackpot ?? 0) - (a.jackpot ?? 0))
  const exclusives = games.filter((g) => g.isExclusive)
  const megaways = byPopularity(games.filter((g) => g.category === 'Megaways'))
  const openTables = liveTables.filter((t) => t.status === 'Open').slice(0, 6)

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> THE NOVA WELCOME</p>
          <h1>Find your<br /><em>lucky</em> moment.</h1>
          <p className="hero-description">{games.length} original games from 24 studios, a live floor that never sleeps and rewards that grow with you. Every credit here is demo.</p>
          <div className="hero-actions">
            <Link href="#games" className="button">Explore the lobby <ArrowRight size={17} /></Link>
            <Link href="/live" className="text-button">Enter the live floor <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-card"><span className="hero-card-label">TONIGHT&apos;S FEATURE</span><strong>40</strong><span>TREASURES</span><small>DIAMOND TREE</small><div className="hero-card-stars">✦　✦　✦</div></div>
          <div className="hero-chip">NOVA<br /><span>♣</span></div>
        </div>
        <div className="hero-foot"><span>{games.length} games</span><span className="hero-foot-line" /><span>{liveTables.length} live tables</span><span className="hero-foot-line" /><span>Demo only</span><ShieldCheck size={16} /></div>
      </section>

      <div className="lobby-section stack">
        <PromoCarousel />

        <div className="quick-overview" aria-label="Quick game categories">
          <div className="quick-overview-copy"><p className="eyebrow">START HERE</p><h2>Pick a mood.</h2><p>Jump straight into the kind of play you feel like today.</p></div>
          <div className="quick-overview-actions six">
            {moods.map((m) => <Link key={m.label} href={`/?cat=${encodeURIComponent(m.cat)}#games`} className="quick-pick"><span>{m.art}</span><strong>{m.label}</strong><small>{games.filter((g) => g.category === m.cat).length} games</small></Link>)}
          </div>
        </div>

        <PersonalRails />
        <GameRail id="featured" eyebrow="HANDPICKED" title="Featured this week" games={featured} href="/?cat=All%20games#games" />
        <GameRail eyebrow="JUST LANDED" title="New releases" games={fresh} href="/?cat=New#games" />
        <GameRail eyebrow="TRENDING" title="Most played right now" games={popular} href="/#games" />

        <section className="live-strip" id="live">
          <div className="rail-head">
            <div><p className="eyebrow">LIVE FLOOR</p><h2>Real dealers, open seats.</h2></div>
            <Link href="/live" className="all-link">All {liveTables.length} tables <ArrowRight size={15} /></Link>
          </div>
          <div className="live-grid">{openTables.map((t) => <LiveTableCard key={t.id} table={t} />)}</div>
        </section>

        <JackpotMeter total={totalJackpot} count={jackpots.length} />
        <GameRail id="jackpot" eyebrow="PROGRESSIVES" title="Jackpot games" games={jackpots} href="/?cat=Jackpots#games" />
        <GameRail eyebrow="ONLY AT NOVA" title="Nova exclusives" games={exclusives} href="/?cat=Exclusives#games" />
        <GameRail eyebrow="UP TO 117,649 WAYS" title="Megaways" games={megaways} href="/?cat=Megaways#games" />
      </div>

      <Suspense fallback={<section className="lobby-section" id="games"><div className="empty-state"><p>Loading catalogue…</p></div></section>}>
        <GameGrid />
      </Suspense>

      <section className="feature-strip" id="rewards">
        <div className="feature-icon"><Trophy size={23} /></div>
        <div><p className="eyebrow">NOVA REWARDS</p><h2>Four tiers. <span>Real perks.</span></h2><p>Every demo spin earns Nova points. Climb from Spark to Nova and unlock cashback, exclusive tables and more.</p></div>
        <Link href="/rewards" className="outline-button">See the tiers <ArrowRight size={16} /></Link>
      </section>
      <p className="sr-only">Categories available: {categories.join(', ')}</p>
    </>
  )
}
