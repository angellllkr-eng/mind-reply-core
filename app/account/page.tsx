import type { Metadata } from 'next'
import { AccountOverview } from '@/components/account/account-overview'

export const metadata: Metadata = { title: 'Account', description: 'Your demo wallet, statement, favourites, limits and safer gambling tools.' }

export default function AccountPage() {
  return <AccountOverview />
}
