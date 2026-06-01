import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import { Toaster } from 'react-hot-toast'
import { BRAND } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    'luxury Christian fashion',
    'faith-based apparel',
    'Christian streetwear',
    'premium religious clothing',
    'Rare Script',
    'faith worn rare',
    'Christian luxury brand',
  ],
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans text-neutral-900 bg-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'font-sans text-sm',
            style: { borderRadius: 0, border: '1px solid #e5e7eb' },
          }}
        />
      </body>
    </html>
  )
}
