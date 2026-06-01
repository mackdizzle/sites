'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/home/ProductCard'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'

// All products data (in production, fetch from API)
const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Called Oversized Tee',
    slug: 'called-oversized-tee',
    description: 'Premium heavyweight 400gsm cotton in our signature oversized silhouette. Scripture-inspired graphics screen printed in gold foil.',
    price: 65,
    comparePrice: 85,
    category: { id: 'cat1', name: 'T-Shirts', slug: 't-shirts' },
    tags: ['tee', 'scripture', 'bestseller'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedDrop: false,
    scriptureRef: 'Eph. 2:10',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', alt: 'Called Tee', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=85', alt: 'Called Tee Back', position: 1 },
    ],
    variants: [
      { id: 'v1', size: 'S', stock: 12 },
      { id: 'v2', size: 'M', stock: 8 },
      { id: 'v3', size: 'L', stock: 5 },
      { id: 'v4', size: 'XL', stock: 3 },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Rare Circle Hoodie',
    slug: 'rare-circle-hoodie',
    description: 'Premium French terry blend. Embossed Rare Script logo. Heavyweight 400gsm.',
    price: 145,
    category: { id: 'cat2', name: 'Leisurewear', slug: 'leisurewear' },
    tags: ['hoodie', 'premium'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isLimitedDrop: false,
    images: [
      { id: 'i3', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85', alt: 'Hoodie', position: 0 },
    ],
    variants: [
      { id: 'v5', size: 'S', stock: 10 },
      { id: 'v6', size: 'M', stock: 15 },
      { id: 'v7', size: 'L', stock: 9 },
    ],
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Faith Trucker Cap',
    slug: 'faith-trucker-cap',
    description: 'Stone washed cotton-poly blend cap with embroidered cross detail.',
    price: 48,
    category: { id: 'cat3', name: 'Caps', slug: 'caps' },
    tags: ['cap'],
    status: 'ACTIVE',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedDrop: false,
    scriptureRef: '1 Pet. 2:9',
    images: [
      { id: 'i4', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85', alt: 'Faith Cap', position: 0 },
    ],
    variants: [{ id: 'v8', size: 'One Size', stock: 20 }],
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Covenant Coach Jacket',
    slug: 'covenant-coach-jacket',
    description: 'Lightweight nylon coach jacket. Gold embroidery. Satin lining with scripture print.',
    price: 195,
    comparePrice: 240,
    category: { id: 'cat4', name: 'Jackets', slug: 'jackets' },
    tags: ['jacket', 'limited', 'premium'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedDrop: true,
    scriptureRef: 'Phil. 4:13',
    images: [
      { id: 'i5', url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&q=85', alt: 'Covenant Jacket', position: 0 },
    ],
    variants: [
      { id: 'v9', size: 'S', stock: 3 },
      { id: 'v10', size: 'M', stock: 2 },
      { id: 'v11', size: 'L', stock: 1 },
    ],
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Workmanship Joggers',
    slug: 'workmanship-joggers',
    description: '400gsm French terry joggers. Rare Script embroidered logo. Tapered fit. Premium elastic waistband.',
    price: 98,
    category: { id: 'cat2', name: 'Leisurewear', slug: 'leisurewear' },
    tags: ['joggers', 'leisurewear'],
    status: 'ACTIVE',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedDrop: false,
    scriptureRef: 'Eph. 2:10',
    images: [
      { id: 'i6', url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=85', alt: 'Joggers', position: 0 },
    ],
    variants: [
      { id: 'v12', size: 'S', stock: 8 },
      { id: 'v13', size: 'M', stock: 12 },
      { id: 'v14', size: 'L', stock: 7 },
      { id: 'v15', size: 'XL', stock: 5 },
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Ephesians Drop Tee — White',
    slug: 'ephesians-drop-tee-white',
    description: 'Limited Edition — Only 77 units. Oversized tee with full-back Ephesians 6 typography print.',
    price: 88,
    category: { id: 'cat1', name: 'T-Shirts', slug: 't-shirts' },
    collection: { id: 'col3', name: 'Ephesians Capsule', slug: 'ephesians-capsule' },
    tags: ['tee', 'limited', 'scripture'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedDrop: true,
    scriptureRef: 'Eph. 6:10-18',
    images: [
      { id: 'i7', url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=85', alt: 'Ephesians Tee', position: 0 },
    ],
    variants: [
      { id: 'v16', size: 'S', stock: 10 },
      { id: 'v17', size: 'M', stock: 15 },
      { id: 'v18', size: 'L', stock: 12 },
      { id: 'v19', size: 'XL', stock: 8 },
      { id: 'v20', size: 'XXL', stock: 4 },
    ],
    createdAt: '2024-01-06',
    updatedAt: '2024-01-06',
  },
  {
    id: '7',
    name: 'Proverbs 31 Crop Tee',
    slug: 'proverbs-31-crop-tee',
    description: 'Relaxed crop tee. Soft 240gsm combed cotton. Gold script print.',
    price: 58,
    category: { id: 'cat1', name: 'T-Shirts', slug: 't-shirts' },
    tags: ['tee', 'women', 'scripture'],
    status: 'ACTIVE',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    isLimitedDrop: false,
    scriptureRef: 'Prov. 31:25',
    images: [
      { id: 'i8', url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=85', alt: 'Crop Tee', position: 0 },
    ],
    variants: [
      { id: 'v21', size: 'XS', stock: 6 },
      { id: 'v22', size: 'S', stock: 9 },
      { id: 'v23', size: 'M', stock: 11 },
      { id: 'v24', size: 'L', stock: 5 },
    ],
    createdAt: '2024-01-07',
    updatedAt: '2024-01-07',
  },
  {
    id: '8',
    name: 'Kingdom Puffer Jacket',
    slug: 'kingdom-puffer-jacket',
    description: 'Luxe recycled puffer. Cross-quilted detailing. Scripture embroidered on inner chest.',
    price: 280,
    category: { id: 'cat4', name: 'Jackets', slug: 'jackets' },
    tags: ['jacket', 'winter', 'premium'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    isLimitedDrop: false,
    images: [
      { id: 'i9', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85', alt: 'Puffer Jacket', position: 0 },
    ],
    variants: [
      { id: 'v25', size: 'S', stock: 4 },
      { id: 'v26', size: 'M', stock: 6 },
      { id: 'v27', size: 'L', stock: 3 },
      { id: 'v28', size: 'XL', stock: 2 },
    ],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
  },
]

const CATEGORIES = ['All', 'T-Shirts', 'Leisurewear', 'Jackets', 'Caps', 'Limited Drops']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestsellers', label: 'Best Sellers' },
]

export default function ShopClient() {
  const [category, setCategory] = useState('All')
  const [sizes, setSizes] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(500)
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS]

    if (category !== 'All') {
      if (category === 'Limited Drops') {
        result = result.filter((p) => p.isLimitedDrop)
      } else {
        result = result.filter((p) => p.category.name === category)
      }
    }

    result = result.filter((p) => p.price <= priceMax)

    if (sizes.length > 0) {
      result = result.filter((p) => p.variants.some((v) => v.size && sizes.includes(v.size)))
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'bestsellers':
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller))
        break
    }

    return result
  }, [category, sizes, priceMax, sort])

  return (
    <div className="pt-32 pb-24">
      {/* Page header */}
      <div className="bg-stone-50 py-14 px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-2">
            Rare Script
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900">Shop All</h1>
          <p className="text-neutral-500 text-sm mt-2">{filtered.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-all border ${
                category === cat
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="space-y-8 sticky top-28">
              {/* Size */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-4">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 text-[11px] font-medium border transition-all ${
                        sizes.includes(s)
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-4">
                  Max Price: ${priceMax}
                </h3>
                <input
                  type="range"
                  min={20}
                  max={500}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-amber-700"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>$20</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-4">
                  Collection
                </h3>
                <div className="space-y-2">
                  {['New Arrivals', 'Best Sellers', 'Limited Drops', 'On Sale'].map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="accent-amber-700" />
                      <span className="text-xs text-neutral-600">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(sizes.length > 0 || priceMax < 500 || category !== 'All') && (
                <button
                  onClick={() => { setSizes([]); setPriceMax(500); setCategory('All') }}
                  className="text-[11px] text-red-500 uppercase tracking-widest font-medium flex items-center gap-1"
                >
                  <X size={12} /> Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main product grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold border border-neutral-200 px-4 py-2"
              >
                <SlidersHorizontal size={14} />
                Filter
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 hidden sm:block">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-[11px] uppercase tracking-widest border border-neutral-200 bg-transparent py-2 px-3 focus:outline-none focus:border-neutral-400"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-neutral-400 text-sm">No products match your filters.</p>
                <button
                  onClick={() => { setSizes([]); setPriceMax(500); setCategory('All') }}
                  className="mt-4 text-[11px] text-amber-700 uppercase tracking-widest underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
