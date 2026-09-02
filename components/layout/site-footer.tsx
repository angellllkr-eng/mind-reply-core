import Link from 'next/link'
import { Clock, CreditCard, Landmark, ShieldCheck, Smartphone, Wallet } from 'lucide-react'

const columns = [
  { title: 'Casino', links: [['Lobby', '/'], ['Slots', '/?cat=Slots#games'], ['Jackpots', '/?cat=Jackpots#games'], ['Megaways', '/?cat=Megaways#games'], ['New releases', '/?cat=New#games']] },
  { title: 'Live', links: [['Live floor', '/live'], ['Roulette', '/live?type=Roulette'], ['Blackjack', '/live?type=Blackjack'], ['Baccarat', '/live?type=Baccarat'], ['Game shows', '/live?type=Game%20Shows']] },
  { title: 'Rewards', links: [['Promotions', '/promotions'], ['Loyalty tiers', '/rewards'], ['Account', '/account'], ['Transactions', '/account#transactions'], ['Limits & tools', '/account#limits']] },
  { title: 'Help', links: [['Help centre', '/account#help'], ['Safer gambling', '/account#limits'], ['Self-exclusion', '/account#limits'], ['Terms (demo)', '/account#help'], ['Privacy (demo)', '/account#help']] },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="wordmark" href="/"><span className="wordmark-mark">N</span><span>NOVA<span className="wordmark-dot">.</span></span></Link>
          <p>Your moment, beautifully played. Nova is an original demo lobby; every balance, spin and prize shown is illustrative.</p>
          <div className="footer-payments" aria-label="Payment methods (illustrative)">
            <span><CreditCard size={14} /> Cards</span><span><Landmark size={14} /> Bank</span><span><Wallet size={14} /> e-Wallet</span><span><Smartphone size={14} /> Pay by phone</span>
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.title} className="footer-col">
            <h3>{c.title}</h3>
            {c.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-safer">
        <div className="safer-badges" aria-label="Safer gambling">
          <span className="age-badge">18+</span>
          <Link href="/account#limits" className="safer-link"><ShieldCheck size={15} /> Safer gambling tools</Link>
          <Link href="/account#limits" className="safer-link"><Clock size={15} /> Take a break</Link>
          <span className="safer-link muted">Self-exclusion support</span>
          <span className="safer-link muted">Gambling support helplines</span>
        </div>
        <p>When the fun stops, stop. Set deposit, loss and time limits from your account at any time. Nova&apos;s safer gambling tools apply instantly and cannot be loosened without a 24-hour cooling-off period.</p>
      </div>
      <div className="footer-licence">
        <p>Nova Play is a design and engineering demonstration. It is not a licensed gambling operator, does not accept real money, and does not offer real-money gambling. Any resemblance to a licence number, regulator or operator is unintended. Persons under 18 may not create an account.</p>
        <span className="footer-copy">© 2026 Nova Play · Demo build · All studio, game and table names are original.</span>
      </div>
    </footer>
  )
}
