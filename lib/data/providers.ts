export type ProviderTier = 'Premium' | 'Studio' | 'Boutique'

export type Provider = { id: string; name: string; tier: ProviderTier; founded: number; hq: string }

export const providers: Provider[] = [
  { id: 'northstar', name: 'Northstar Studios', tier: 'Premium', founded: 2009, hq: 'Stockholm' },
  { id: 'crown-thorn', name: 'Crown & Thorn', tier: 'Premium', founded: 2011, hq: 'London' },
  { id: 'velvet-table', name: 'Velvet Table', tier: 'Premium', founded: 2013, hq: 'Riga' },
  { id: 'eastline', name: 'Eastline Games', tier: 'Premium', founded: 2008, hq: 'Manila' },
  { id: 'lumen', name: 'Lumen Interactive', tier: 'Premium', founded: 2012, hq: 'Malta' },
  { id: 'harbour', name: 'Harbour Reel', tier: 'Studio', founded: 2015, hq: 'Dublin' },
  { id: 'saffron', name: 'Saffron Spin', tier: 'Studio', founded: 2016, hq: 'Barcelona' },
  { id: 'ironclad', name: 'Ironclad Play', tier: 'Studio', founded: 2014, hq: 'Berlin' },
  { id: 'meridian', name: 'Meridian Labs', tier: 'Studio', founded: 2017, hq: 'Lisbon' },
  { id: 'quartz', name: 'Quartz Works', tier: 'Studio', founded: 2013, hq: 'Prague' },
  { id: 'tidewater', name: 'Tidewater Gaming', tier: 'Studio', founded: 2018, hq: 'Copenhagen' },
  { id: 'ember', name: 'Ember Forge', tier: 'Studio', founded: 2019, hq: 'Tallinn' },
  { id: 'atlas', name: 'Atlas Reels', tier: 'Studio', founded: 2010, hq: 'Gibraltar' },
  { id: 'bluebird', name: 'Bluebird Digital', tier: 'Studio', founded: 2016, hq: 'Leeds' },
  { id: 'nightjar', name: 'Nightjar Games', tier: 'Boutique', founded: 2020, hq: 'Glasgow' },
  { id: 'paperlantern', name: 'Paper Lantern', tier: 'Boutique', founded: 2021, hq: 'Kyiv' },
  { id: 'wildfern', name: 'Wildfern', tier: 'Boutique', founded: 2019, hq: 'Helsinki' },
  { id: 'coppercoil', name: 'Copper Coil', tier: 'Boutique', founded: 2022, hq: 'Bristol' },
  { id: 'monsoon', name: 'Monsoon Studio', tier: 'Boutique', founded: 2020, hq: 'Bangalore' },
  { id: 'halcyon', name: 'Halcyon Play', tier: 'Boutique', founded: 2018, hq: 'Vienna' },
  { id: 'sablefox', name: 'Sablefox', tier: 'Boutique', founded: 2021, hq: 'Warsaw' },
  { id: 'orchard', name: 'Orchard Gaming', tier: 'Boutique', founded: 2017, hq: 'Bath' },
  { id: 'driftwood', name: 'Driftwood Labs', tier: 'Boutique', founded: 2022, hq: 'Cork' },
  { id: 'kestrel', name: 'Kestrel Interactive', tier: 'Boutique', founded: 2019, hq: 'Edinburgh' },
]

export const providerById = (id: string) => providers.find((p) => p.id === id)!
export const providerPacks = [
  { name: 'All providers', ids: providers.map((p) => p.id) },
  { name: 'Premium partners', ids: providers.filter((p) => p.tier === 'Premium').map((p) => p.id) },
  { name: 'Studios', ids: providers.filter((p) => p.tier === 'Studio').map((p) => p.id) },
  { name: 'Boutique', ids: providers.filter((p) => p.tier === 'Boutique').map((p) => p.id) },
  { name: 'UK studios', ids: providers.filter((p) => ['London', 'Leeds', 'Glasgow', 'Bristol', 'Bath', 'Edinburgh'].includes(p.hq)).map((p) => p.id) },
]
