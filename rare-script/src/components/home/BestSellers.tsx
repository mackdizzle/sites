'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from './ProductCard'
import { Product } from '@/types'

// Sample products for demonstration
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Called Oversized Tee',
    slug: 'called-oversized-tee',
    description: 'Premium heavyweight cotton in our signature oversized silhouette. Scripture-inspired graphics screen printed in gold foil.',
    shortDesc: 'Premium heavyweight tee with gold foil graphics.',
    price: 65,
    comparePrice: 85,
    category: { id: 'cat1', name: 'T-Shirts', slug: 't-shirts' },
    collection: { id: 'col1', name: 'Kingdom Essentials', slug: 'kingdom-essentials' },
    tags: ['tee', 'scripture', 'bestseller'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedDrop: false,
    scriptureRef: 'Eph. 2:10',
    scriptureText: 'For we are His workmanship',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', alt: 'Called Tee Front', position: 0 },
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
    shortDesc: 'Heavyweight French terry hoodie.',
    price: 145,
    category: { id: 'cat2', name: 'Leisurewear', slug: 'leisurewear' },
    tags: ['hoodie', 'premium', 'bestseller'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isLimitedDrop: false,
    images: [
      { id: 'i3', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85', alt: 'Rare Circle Hoodie', position: 0 },
    ],
    variants: [
      { id: 'v5', size: 'S', stock: 10 },
      { id: 'v6', size: 'M', stock: 15 },
      { id: 'v7', size: 'L', stock: 9 },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Faith Trucker Cap',
    slug: 'faith-trucker-cap',
    description: 'Stone washed cotton-poly blend cap with embroidered cross detail.',
    price: 48,
    category: { id: 'cat3', name: 'Caps', slug: 'caps' },
    tags: ['cap', 'accessories'],
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
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '4',
    name: 'Covenant Coach Jacket',
    slug: 'covenant-coach-jacket',
    description: 'Lightweight nylon coach jacket. Gold embroidery. Satin lining with scripture.',
    price: 195,
    comparePrice: 240,
    category: { id: 'cat4', name: 'Jackets', slug: 'jackets' },
    collection: { id: 'col2', name: 'Covenant Series', slug: 'covenant-series' },
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
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

interface Props {
  title?: string
  subtitle?: string
  filter?: 'bestsellers' | 'new' | 'featured' | 'all'
  limit?: number
}

export default function BestSellers({
  title = 'Best Sellers',
  subtitle = 'The pieces our community returns to again and again.',
  filter = 'bestsellers',
  limit = 4,
}: Props) {
  const products = SAMPLE_PRODUCTS.slice(0, limit)

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
            Community Favorites
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/shop">
            <Button variant="outline" size="lg">Explore All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
