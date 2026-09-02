export type Currency = 'EUR' | 'GBP' | 'USD'

export const currencySymbol: Record<Currency, string> = { EUR: '\u20ac', GBP: '\u00a3', USD: '$' }

export function money(amount: number, currency: Currency = 'EUR', opts: { compact?: boolean } = {}) {
  if (opts.compact && Math.abs(amount) >= 1000) {
    return `${currencySymbol[currency]}${new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(amount)}`
  }
  return `${currencySymbol[currency]}${new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`
}

export function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} h ago`
  return `${Math.round(h / 24)} d ago`
}
