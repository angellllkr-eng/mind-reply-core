export type LiveType = 'Roulette' | 'Blackjack' | 'Baccarat' | 'Game Shows' | 'Poker'
export type LiveTable = {
  id: string
  name: string
  type: LiveType
  dealer: string
  studio: string
  minBet: number
  maxBet: number
  seats: number
  seatsOpen: number
  status: 'Open' | 'Full' | 'Opening soon'
  language: string
  tone: 'red' | 'green' | 'violet' | 'gold' | 'blue' | 'cyan'
  lastResults: string[]
}

export const liveTypes: LiveType[] = ['Roulette', 'Blackjack', 'Baccarat', 'Game Shows', 'Poker']

const dealers = ['Amara', 'Tomas', 'Elif', 'Rowan', 'Ines', 'Kwame', 'Mira', 'Luca', 'Priya', 'Jonas', 'Sofia', 'Dario', 'Nadia', 'Felix', 'Hana', 'Oscar', 'Zara', 'Mateo', 'Leah', 'Arun', 'Bea', 'Noor', 'Iker', 'Wren']

const seeds: Array<Omit<LiveTable, 'id' | 'dealer' | 'lastResults'>> = [
  { name: 'Neon Roulette', type: 'Roulette', studio: 'Velvet Table', minBet: 0.5, maxBet: 5000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'red' },
  { name: 'Speed Roulette', type: 'Roulette', studio: 'Velvet Table', minBet: 0.2, maxBet: 2000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'red' },
  { name: 'Auto Roulette Nova', type: 'Roulette', studio: 'Lumen Interactive', minBet: 0.1, maxBet: 1000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'green' },
  { name: 'Immersive Roulette', type: 'Roulette', studio: 'Velvet Table', minBet: 1, maxBet: 10000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'red' },
  { name: 'Double Ball Roulette', type: 'Roulette', studio: 'Crown & Thorn', minBet: 0.5, maxBet: 2500, seats: 0, seatsOpen: 0, status: 'Opening soon', language: 'EN', tone: 'gold' },
  { name: 'Nova Blackjack A', type: 'Blackjack', studio: 'Velvet Table', minBet: 5, maxBet: 2500, seats: 7, seatsOpen: 3, status: 'Open', language: 'EN', tone: 'green' },
  { name: 'Nova Blackjack B', type: 'Blackjack', studio: 'Velvet Table', minBet: 5, maxBet: 2500, seats: 7, seatsOpen: 0, status: 'Full', language: 'EN', tone: 'green' },
  { name: 'Salon Priv\u00e9 Blackjack', type: 'Blackjack', studio: 'Crown & Thorn', minBet: 250, maxBet: 25000, seats: 1, seatsOpen: 1, status: 'Open', language: 'EN', tone: 'gold' },
  { name: 'Infinite Blackjack', type: 'Blackjack', studio: 'Lumen Interactive', minBet: 1, maxBet: 5000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'green' },
  { name: 'Power Blackjack', type: 'Blackjack', studio: 'Velvet Table', minBet: 10, maxBet: 5000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'blue' },
  { name: 'Blackjack Party', type: 'Blackjack', studio: 'Lumen Interactive', minBet: 1, maxBet: 500, seats: 7, seatsOpen: 5, status: 'Open', language: 'EN', tone: 'violet' },
  { name: 'Velvet Baccarat', type: 'Baccarat', studio: 'Velvet Table', minBet: 1, maxBet: 10000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'red' },
  { name: 'Speed Baccarat', type: 'Baccarat', studio: 'Velvet Table', minBet: 1, maxBet: 5000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'red' },
  { name: 'Baccarat Squeeze', type: 'Baccarat', studio: 'Crown & Thorn', minBet: 5, maxBet: 15000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'gold' },
  { name: 'Dragon Tiger Live', type: 'Baccarat', studio: 'Lumen Interactive', minBet: 0.5, maxBet: 2500, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'cyan' },
  { name: 'Lightning Wheel', type: 'Game Shows', studio: 'Lumen Interactive', minBet: 0.1, maxBet: 500, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'violet' },
  { name: 'Mega Ball', type: 'Game Shows', studio: 'Lumen Interactive', minBet: 0.1, maxBet: 100, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'blue' },
  { name: 'Dream Wheel', type: 'Game Shows', studio: 'Velvet Table', minBet: 0.1, maxBet: 1000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'gold' },
  { name: 'Cash or Crash', type: 'Game Shows', studio: 'Crown & Thorn', minBet: 0.1, maxBet: 250, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'cyan' },
  { name: 'Crazy Coin Flip', type: 'Game Shows', studio: 'Lumen Interactive', minBet: 0.1, maxBet: 500, seats: 0, seatsOpen: 0, status: 'Opening soon', language: 'EN', tone: 'violet' },
  { name: 'Casino Hold\u2019em Live', type: 'Poker', studio: 'Velvet Table', minBet: 1, maxBet: 1000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'green' },
  { name: 'Three Card Poker Live', type: 'Poker', studio: 'Crown & Thorn', minBet: 1, maxBet: 1000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'blue' },
  { name: 'Ultimate Texas Live', type: 'Poker', studio: 'Velvet Table', minBet: 2, maxBet: 2000, seats: 0, seatsOpen: 0, status: 'Open', language: 'EN', tone: 'green' },
  { name: 'Caribbean Stud Live', type: 'Poker', studio: 'Lumen Interactive', minBet: 1, maxBet: 500, seats: 0, seatsOpen: 0, status: 'Full', language: 'EN', tone: 'gold' },
]

const results = (type: LiveType, i: number) => {
  if (type === 'Roulette') return ['17', '32', '0', '25', '8', '19', '4', '31'].map((n, j) => String((Number(n) + i * 7 + j) % 37))
  if (type === 'Blackjack') return ['W', 'L', 'W', 'P', 'W', 'L', 'BJ', 'W']
  if (type === 'Baccarat') return ['P', 'B', 'B', 'T', 'P', 'B', 'P', 'P']
  if (type === 'Game Shows') return ['2x', '5x', '1x', '10x', '2x', '1x', '25x', '2x']
  return ['F', 'C', 'F', 'F', 'C', 'F', 'C', 'F']
}

export const liveTables: LiveTable[] = seeds.map((s, i) => ({ ...s, id: `lt${i + 1}`, dealer: dealers[i % dealers.length], lastResults: results(s.type, i) }))
