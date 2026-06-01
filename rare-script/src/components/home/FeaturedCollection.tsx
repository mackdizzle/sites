'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const collections = [
  {
    name: 'The Sacred Edit',
    description: 'Refined pieces for quiet moments and bold statements.',
    image: 'https://images.unsplash.com/photo-1536992266094-82847e1fd431?w=800&q=85',
    href: '/collections/sacred-edit',
    tag: 'New Season',
    span: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    name: 'Covenant Series',
    description: 'Bold graphics. Quiet conviction.',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=85',
    href: '/collections/covenant-series',
    tag: 'Best Sellers',
    span: 'col-span-1',
  },
  {
    name: 'Kingdom Essentials',
    description: 'Everyday elevated. Faith woven in.',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=85',
    href: '/collections/kingdom-essentials',
    tag: 'Limited',
    span: 'col-span-1',
  },
]

export default function FeaturedCollection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
              Curated Drops
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900">
              The Collections
            </h2>
          </div>
          <Link href="/collections" className="hidden md:block">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden cursor-pointer ${col.span}`}
            >
              <Link href={col.href}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${col.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block text-[9px] tracking-[0.25em] uppercase text-amber-400 font-semibold mb-2">
                    {col.tag}
                  </span>
                  <h3 className="font-serif text-white text-2xl md:text-3xl font-bold mb-1">
                    {col.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 max-w-xs">{col.description}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors inline-flex items-center gap-2">
                    Explore
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link href="/collections">
            <Button variant="outline">View All Collections</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
