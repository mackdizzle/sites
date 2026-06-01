import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Collections — Rare Script',
  description: 'Explore all Rare Script collections — curated capsule drops grounded in scripture and luxury craftsmanship.',
}

const collections = [
  {
    name: 'The Sacred Edit',
    slug: 'sacred-edit',
    description: 'Refined pieces for quiet moments and bold statements. The foundation of the Rare Script wardrobe.',
    image: 'https://images.unsplash.com/photo-1536992266094-82847e1fd431?w=900&q=85',
    pieces: 12,
    tag: 'New Season',
    featured: true,
  },
  {
    name: 'Covenant Series',
    slug: 'covenant-series',
    description: 'Bold graphics rooted in covenant scripture. Fashion as declaration.',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=900&q=85',
    pieces: 8,
    tag: 'Best Sellers',
    featured: true,
  },
  {
    name: 'Kingdom Essentials',
    slug: 'kingdom-essentials',
    description: 'The everyday capsule. Premium basics elevated with faith-driven design.',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&q=85',
    pieces: 15,
    tag: 'Core',
    featured: false,
  },
  {
    name: 'The Ephesians Capsule',
    slug: 'ephesians-capsule',
    description: 'Seven pieces. Ephesians 6. Spiritual armor, reimagined as wearable art. 77 units only.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    pieces: 7,
    tag: 'Limited · 77 Units',
    featured: true,
    isLimited: true,
  },
]

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-stone-50 py-16 px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
            Rare Script
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900">
            Collections
          </h1>
          <p className="text-neutral-500 text-sm mt-2 max-w-md">
            Curated capsule drops, each grounded in scripture and crafted without compromise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {collections.map((col, i) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group">
              <div
                className={`relative overflow-hidden ${
                  col.featured && i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {col.isLimited && (
                  <div className="absolute top-4 left-4 bg-red-800 text-white text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-semibold">
                    Limited Drop
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="text-amber-400 text-[10px] tracking-[0.25em] uppercase font-semibold block mb-2">
                    {col.tag} · {col.pieces} pieces
                  </span>
                  <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-2">
                    {col.name}
                  </h2>
                  <p className="text-white/70 text-sm max-w-md mb-4 hidden md:block">
                    {col.description}
                  </p>
                  <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] group-hover:text-white transition-colors flex items-center gap-2">
                    Explore Collection
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
