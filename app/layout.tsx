import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/header/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Overlays } from '@/components/layout/overlays'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Nova Play — Find your lucky moment', template: '%s · Nova Play' },
  description: 'Nova Play is a free-play Digital Hall with demo games, a live-floor interface, promotions and rewards. No real money.',
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
      </body>
    </html>
  )
}
