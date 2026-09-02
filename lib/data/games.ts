import { providers } from './providers'

export type Category = 'Slots' | 'Live Casino' | 'Table Games' | 'Jackpots' | 'Instant Win' | 'Megaways'
export type Volatility = 'Low' | 'Medium' | 'High' | 'Very High'
export type Tone = 'violet' | 'gold' | 'blue' | 'red' | 'cyan' | 'green' | 'rose' | 'amber'

export type Game = {
  id: string
  slug: string
  title: string
  providerId: string
  category: Category
  tags: string[]
  art: string
  tone: Tone
  rtp: number
  volatility: Volatility
  minBet: number
  maxBet: number
  maxWin: number
  lines: number
  jackpot?: number
  isNew: boolean
  isExclusive: boolean
  isFeatured: boolean
  popularity: number
  released: string
  description: string
}

export const categories: Category[] = ['Slots', 'Live Casino', 'Table Games', 'Jackpots', 'Instant Win', 'Megaways']

// Deterministic pseudo-random so the catalog is stable across renders/builds.
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const first = ['Fortune', 'Moonlit', 'Royal', 'Aurora', 'Lucky', 'Golden', 'Jade', 'Neon', 'Velvet', 'Solar', 'Crimson', 'Ivory', 'Frost', 'Ember', 'Midnight', 'Sapphire', 'Emerald', 'Wild', 'Mystic', 'Thunder', 'Silver', 'Copper', 'Phantom', 'Blazing', 'Arctic', 'Tropic', 'Ancient', 'Cosmic', 'Twilight', 'Amber']
const second = ['Flares', 'Wins', 'Rush', 'Gems', 'Lanterns', 'Dragon', 'Crown', 'Reels', 'Riches', 'Fortune', 'Spins', 'Treasure', 'Vault', 'Kingdom', 'Harvest', 'Odyssey', 'Cascade', 'Heist', 'Empire', 'Tides', 'Bonanza', 'Quest', 'Legends', 'Jewels', 'Fever', 'Storm', 'Garden', 'Express', 'Temple', 'Carnival']
const suffix = ['', '', '', ' Deluxe', ' Megaways', ' II', ' Hold & Win', ' Xtreme', ' Gold', ' Bonus Buy']
const tableNames = ['Solaris Blackjack', 'Golden 21', 'Orbit Dice', 'European Roulette Pro', 'French Roulette Elite', 'Classic Baccarat', 'Speed Baccarat', 'Three Card Brag', 'Casino Hold\u2019em', 'Caribbean Stud', 'Multi-hand Blackjack', 'Lightning Dice Classic', 'Punto Banco', 'Perfect Pairs 21', 'Double Ball Roulette', 'Sic Bo Royale', 'Dragon Tiger', 'Blackjack Surrender', 'American Roulette', 'Ultimate Texas Poker']
const liveNames = ['Neon Roulette Live', 'Velvet Baccarat Live', 'Nova Blackjack Lobby', 'Lightning Wheel Live', 'Crazy Coin Flip Live', 'Speed Roulette Live', 'Infinite Blackjack Live', 'Auto Roulette Nova', 'Salon Priv\u00e9 Blackjack', 'Mega Ball Live', 'Dream Wheel Live', 'Football Studio Live', 'Baccarat Squeeze Live', 'Deal or Not Live', 'Monopoly-style Board Live', 'Gonzo Treasure Hunt Live', 'Immersive Roulette Live', 'Craps Live Nova', 'Andar Bahar Live', 'Teen Patti Live', 'Blackjack Party Live', 'Power Blackjack Live', 'Fan Tan Live', 'Cash or Crash Live']
const instantNames = ['Scratch Sevens', 'Plinko Nova', 'Mines Deluxe', 'Dice Duel', 'Keno Kings', 'Hi-Lo Express', 'Crash Rocket', 'Wheel of Nova', 'Coin Toss Pro', 'Turbo Bingo', 'Lucky Cards', 'Limbo Lite']
const arts = ['7', '77', 'K', 'Q', 'J', 'A', '\u25c6', '8', '21', '\u2660', '\u2663', '\u2665', '\u2666', '00', '\u2605', 'X', '\u00a7', '\u2020']
const tones: Tone[] = ['violet', 'gold', 'blue', 'red', 'cyan', 'green', 'rose', 'amber']
const vols: Volatility[] = ['Low', 'Medium', 'High', 'Very High']
const tagPool = ['Free spins', 'Multipliers', 'Cascading', 'Buy bonus', 'Sticky wilds', 'Expanding reels', 'Cluster pays', 'Respins', 'Wheel bonus', 'Pick & click']

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function build(): Game[] {
  const r = rng(20260902)
  const out: Game[] = []
  const used = new Set<string>()
  const pick = <T,>(arr: T[]) => arr[Math.floor(r() * arr.length)]
  const push = (title: string, category: Category, forceProvider?: string) => {
    let t = title
    let i = 2
    while (used.has(t)) t = `${title} ${i++}`
    used.add(t)
    const providerId = forceProvider ?? pick(providers).id
    const isJackpot = category === 'Jackpots'
    const year = 2019 + Math.floor(r() * 8)
    const month = 1 + Math.floor(r() * 12)
    const rtp = category === 'Live Casino' || category === 'Table Games' ? 98.5 + r() * 1.1 : isJackpot ? 92 + r() * 3 : 94 + r() * 3.2
    const pop = Math.round(20 + r() * 80)
    out.push({
      id: `g${out.length + 1}`,
      slug: slugify(t),
      title: t,
      providerId,
      category,
      tags: Array.from(new Set([pick(tagPool), pick(tagPool)])),
      art: pick(arts),
      tone: pick(tones),
      rtp: Math.round(rtp * 100) / 100,
      volatility: category === 'Live Casino' || category === 'Table Games' ? 'Low' : pick(vols),
      minBet: pick([0.1, 0.2, 0.25, 0.5, 1]),
      maxBet: pick([50, 100, 200, 500, 1000]),
      maxWin: isJackpot ? 0 : pick([500, 1000, 2500, 5000, 10000, 20000, 50000]),
      lines: category === 'Megaways' ? 117649 : pick([10, 20, 25, 40, 243, 1024]),
      jackpot: isJackpot ? Math.round((12000 + r() * 400000) * 100) / 100 : undefined,
      isNew: year === 2026 && month >= 6,
      isExclusive: r() < 0.09,
      isFeatured: r() < 0.12,
      popularity: pop,
      released: `${year}-${String(month).padStart(2, '0')}`,
      description: `${t} brings ${category.toLowerCase()} action from ${providers.find((p) => p.id === providerId)?.name}. Expect ${pick(['smooth pacing', 'bold feature rounds', 'crisp classic play', 'layered bonus mechanics'])} and ${pick(['a warm soundtrack', 'a moody neon palette', 'sharp, readable symbols', 'a generous hit rate'])}.`,
    })
  }
  for (let i = 0; i < 96; i++) push(`${pick(first)} ${pick(second)}${pick(suffix)}`.trim(), r() < 0.15 ? 'Megaways' : 'Slots')
  for (let i = 0; i < 18; i++) push(`${pick(first)} ${pick(second)} Jackpot`, 'Jackpots')
  tableNames.forEach((n) => push(n, 'Table Games', pick(['velvet-table', 'crown-thorn', 'lumen', 'northstar'])))
  liveNames.forEach((n) => push(n, 'Live Casino', pick(['velvet-table', 'lumen', 'crown-thorn'])))
  instantNames.forEach((n) => push(n, 'Instant Win'))
  return out
}

export const games: Game[] = build()
export const gameBySlug = (slug: string) => games.find((g) => g.slug === slug)
export const byPopularity = (list: Game[]) => [...list].sort((a, b) => b.popularity - a.popularity)
export const byNewest = (list: Game[]) => [...list].sort((a, b) => b.released.localeCompare(a.released))
export const similarGames = (game: Game, n = 6) => byPopularity(games.filter((g) => g.id !== game.id && (g.category === game.category || g.providerId === game.providerId))).slice(0, n)
export const totalJackpot = games.reduce((sum, g) => sum + (g.jackpot ?? 0), 0)
