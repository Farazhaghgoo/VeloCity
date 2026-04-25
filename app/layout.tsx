import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollRestoration from '@/components/ScrollRestoration'
import ScrollProgress from '@/components/ScrollProgress'
import PageLoader from '@/components/PageLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const siteUrl = 'https://velocityvc.com'

export const metadata: Metadata = {
  title: 'VeloCity — The Verified Deal-Flow Layer',
  description:
    'VeloCity connects verified founders with institutional VCs in 14 days — not 14 weeks. Tamper-proof data. Structured feedback. No warm intros required.',
  metadataBase: new URL(siteUrl),
  keywords: ['venture capital', 'fundraising', 'deal flow', 'startups', 'verified data', 'VC platform', 'pitch deck', 'term sheet'],
  authors: [{ name: 'VeloCity Labs' }],
  creator: 'VeloCity Labs',
  publisher: 'VeloCity Labs',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'VeloCity — The Verified Deal-Flow Layer',
    description: 'From pitch deck to term sheet in 14 days. Verified data. Zero ghosting. No warm intros required.',
    url: siteUrl,
    siteName: 'VeloCity',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VeloCity Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeloCity — The Verified Deal-Flow Layer',
    description: 'From pitch deck to term sheet in 14 days. Verified data. Zero ghosting. No warm intros required.',
    creator: '@velocity',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
          <PageLoader />
          <ScrollProgress />
          <ScrollRestoration />
          <SmoothScroll>{children}</SmoothScroll>
        </body>
    </html>
  )
}
