import Link from 'next/link'
import { Share2, Play } from 'lucide-react'
import { BRAND, SCRIPTURES } from '@/lib/constants'

export default function Footer() {
  const scripture = SCRIPTURES[0]

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Scripture bar */}
      <div className="border-b border-white/10 py-8 text-center">
        <p className="text-stone-400 text-sm italic max-w-xl mx-auto">
          &ldquo;{scripture.text}&rdquo;
        </p>
        <p className="text-amber-700 text-[11px] tracking-widest uppercase mt-2">{scripture.ref}</p>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold tracking-[0.3em] uppercase font-serif mb-4">
            {BRAND.name}
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
            {BRAND.description}
          </p>
          <p className="text-amber-700 text-[10px] tracking-[0.2em] uppercase font-semibold">
            {BRAND.tagline}
          </p>
          <div className="flex gap-4 mt-6">
            <a href={BRAND.social.instagram} className="text-stone-400 hover:text-white transition-colors">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={BRAND.social.youtube} className="text-stone-400 hover:text-white transition-colors">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href={BRAND.social.tiktok} className="text-stone-400 hover:text-white transition-colors">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.16 8.16 0 004.77 1.52V6.94a4.85 4.85 0 01-1-.25z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-5">
            Shop
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'All Products', href: '/shop' },
              { label: 'Leisurewear', href: '/shop?category=leisurewear' },
              { label: 'T-Shirts', href: '/shop?category=t-shirts' },
              { label: 'Jackets', href: '/shop?category=jackets' },
              { label: 'Caps', href: '/shop?category=caps' },
              { label: 'Limited Drops', href: '/shop?category=limited-drops' },
              { label: 'New Arrivals', href: '/shop?filter=new' },
              { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-stone-400 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-5">
            Company
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'About Rare Script', href: '/about' },
              { label: 'Faith & Purpose', href: '/faith' },
              { label: 'Rare Circle Membership', href: '/membership' },
              { label: 'Collections', href: '/collections' },
              { label: 'Press', href: '/about#press' },
              { label: 'Careers', href: '/about#careers' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-stone-400 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-5">
            Support
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Shipping Policy', href: '/policies/shipping' },
              { label: 'Returns & Exchanges', href: '/policies/returns' },
              { label: 'Privacy Policy', href: '/policies/privacy' },
              { label: 'Terms of Service', href: '/policies/terms' },
              { label: 'Size Guide', href: '/shop#size-guide' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-stone-400 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-stone-500 text-xs mb-1">Questions? Email us:</p>
            <a href={`mailto:${BRAND.email}`} className="text-amber-700 text-sm hover:text-amber-600 transition-colors">
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-[11px] tracking-widest uppercase">
            © {new Date().getFullYear()} Rare Script. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-stone-600 text-[11px]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 opacity-40 invert" />
            <span className="mx-2">·</span>
            <span className="tracking-widest uppercase">Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
