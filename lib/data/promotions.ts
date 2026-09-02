export type Promotion = {
  id: string
  slug: string
  title: string
  headline: string
  summary: string
  terms: string
  tone: 'violet' | 'gold' | 'blue' | 'red' | 'cyan' | 'green'
  art: string
  category: 'Welcome' | 'Slots' | 'Live' | 'Weekly' | 'Loyalty'
  endsAt: string
  featured: boolean
}

export const promotions: Promotion[] = [
  { id: 'p1', slug: 'welcome-package', title: 'Nova Welcome', headline: '100 demo spins on us', summary: 'New to Nova? Claim 100 demo spins on Fortune Flares to try the lobby with no real money involved.', terms: 'Demo credits only. No real-money value. 18+.', tone: 'violet', art: '100', category: 'Welcome', endsAt: '2026-12-31', featured: true },
  { id: 'p2', slug: 'jackpot-drop', title: 'Daily Jackpot Drop', headline: 'A must-drop jackpot every night at 22:00', summary: 'The Nova daily meter must drop before midnight. Any eligible jackpot spin qualifies.', terms: 'Demo balance only. Meter is illustrative.', tone: 'gold', art: '\u2606', category: 'Weekly', endsAt: '2026-12-31', featured: true },
  { id: 'p3', slug: 'live-cashback', title: 'Live Cashback Mondays', headline: '10% demo cashback on live tables', summary: 'Play any live table on Monday and receive 10% of net demo losses back on Tuesday morning.', terms: 'Max 50 demo credits. Demo only.', tone: 'red', art: '10%', category: 'Live', endsAt: '2026-11-30', featured: true },
  { id: 'p4', slug: 'megaways-race', title: 'Megaways Race', headline: '5,000-credit demo leaderboard', summary: 'Climb the weekly Megaways leaderboard. Top 50 share a 5,000 demo-credit prize pool.', terms: 'Weekly reset Sunday 23:59. Demo only.', tone: 'cyan', art: '\u26a1', category: 'Slots', endsAt: '2026-10-05', featured: false },
  { id: 'p5', slug: 'reel-of-the-week', title: 'Reel of the Week', headline: 'Double loyalty points on Moonlit Wins', summary: 'Every spin on this week\u2019s featured slot earns 2x Nova points towards your next tier.', terms: 'Applies to demo play. Points illustrative.', tone: 'blue', art: '2x', category: 'Loyalty', endsAt: '2026-09-08', featured: false },
  { id: 'p6', slug: 'table-tuesday', title: 'Table Tuesday', headline: 'Blackjack side-bet boosts', summary: 'Perfect Pairs and 21+3 side-bets pay 25% extra in demo credits every Tuesday.', terms: 'Demo only. Boost applies to side-bets.', tone: 'green', art: '21', category: 'Live', endsAt: '2026-12-31', featured: false },
  { id: 'p7', slug: 'new-release-spins', title: 'New Release Spins', headline: '25 demo spins on every new game', summary: 'Try each new release the week it lands with 25 free demo spins.', terms: 'One claim per release. Demo only.', tone: 'violet', art: 'NEW', category: 'Slots', endsAt: '2026-12-31', featured: false },
  { id: 'p8', slug: 'birthday-bonus', title: 'Birthday Bonus', headline: 'A gift on your day', summary: 'Nova members receive a surprise demo-credit gift on their birthday.', terms: 'Demo only. Verified members.', tone: 'gold', art: '\u2740', category: 'Loyalty', endsAt: '2026-12-31', featured: false },
]

export type Tier = { name: string; minPoints: number; perks: string[]; tone: string }

export const tiers: Tier[] = [
  { name: 'Spark', minPoints: 0, perks: ['Access to all demo games', 'Weekly promo emails', 'Standard support'], tone: '#9f9aa8' },
  { name: 'Glow', minPoints: 500, perks: ['5% weekly demo cashback', 'Birthday bonus', 'Priority support'], tone: '#8e6bff' },
  { name: 'Blaze', minPoints: 2500, perks: ['10% weekly demo cashback', 'Exclusive tables', 'Monthly free-spin drops'], tone: '#e2b76b' },
  { name: 'Nova', minPoints: 10000, perks: ['Personal account manager', 'Invite-only events', 'Custom limits & perks'], tone: '#f7f4ef' },
]

export const tierForPoints = (points: number) => [...tiers].reverse().find((t) => points >= t.minPoints) ?? tiers[0]
export const nextTier = (points: number) => tiers.find((t) => t.minPoints > points)
