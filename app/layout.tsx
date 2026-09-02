import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/header/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Overlays } from '@/components/layout/overlays'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Nova Play — Find your lucky moment', template: '%s · Nova Play' },
  description: 'An original demo casino lobby: 170+ seeded games, a live floor, promotions, loyalty tiers and a demo wallet. No real money.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c0b13',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <Suspense fallback={null}><SiteHeader /></Suspense>
        <main className="min-h-screen bg-background text-foreground">{children}</main>
        <SiteFooter />
        <Overlays />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
