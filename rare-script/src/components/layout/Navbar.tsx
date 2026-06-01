'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { BRAND } from '@/lib/constants'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'The Sacred Edit', href: '/collections/sacred-edit' },
      { label: 'Covenant Series', href: '/collections/covenant-series' },
      { label: 'Kingdom Essentials', href: '/collections/kingdom-essentials' },
      { label: 'Limited Drops', href: '/shop?category=limited-drops' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Faith & Purpose', href: '/faith' },
  { label: 'Rare Circle', href: '/membership' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenu, setMegaMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const itemCount = useCartStore((s) => s.getItemCount())
  const setCartOpen = useCartStore((s) => s.setOpen)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = isHome && !isScrolled ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-neutral-100'
  const textColor = isHome && !isScrolled ? 'text-white' : 'text-neutral-800'

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-neutral-900 text-white text-center py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium">
        Free shipping on orders over $150 · <Link href="/membership" className="underline underline-offset-2">Join Rare Circle</Link> for exclusive drops
      </div>

      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className={`lg:hidden ${textColor}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setMegaMenu(link.label)}
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors hover:opacity-70 ${textColor}`}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} />}
                  </Link>
                  {link.children && megaMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-4 w-52 bg-white shadow-2xl border border-neutral-100 py-3"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-[11px] font-medium tracking-widest uppercase text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Logo */}
            <Link
              href="/"
              className={`absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-[0.3em] uppercase ${textColor} font-serif`}
            >
              {BRAND.name}
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-5">
              <button className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}>
                <Search size={18} />
              </button>
              <Link href="/account/wishlist" className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}>
                <Heart size={18} />
              </Link>
              <Link href="/account" className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}>
                <User size={18} />
              </Link>
              <button
                className={`relative ${textColor} hover:opacity-70 transition-opacity`}
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-amber-700 text-white text-[9px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <Link
                href="/"
                className="text-xl font-bold tracking-[0.3em] uppercase font-serif"
                onClick={() => setMobileOpen(false)}
              >
                {BRAND.name}
              </Link>
              <button onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-sm font-semibold tracking-[0.15em] uppercase text-neutral-800 border-b border-neutral-100"
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 pl-4 text-xs tracking-widest uppercase text-neutral-500 border-b border-neutral-50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-neutral-100 flex gap-6">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-xs tracking-widest uppercase text-neutral-600">
                <User size={16} /> Account
              </Link>
              <Link href="/account/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-xs tracking-widest uppercase text-neutral-600">
                <Heart size={16} /> Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
