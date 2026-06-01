import type { Metadata } from 'next'
import ProductDetailClient from './ProductDetailClient'

// In production: fetch from DB by slug
const PRODUCT_DATA: Record<string, any> = {
  'called-oversized-tee': {
    id: '1',
    name: 'Called Oversized Tee',
    slug: 'called-oversized-tee',
    description: `Our flagship tee. Crafted from 400gsm heavyweight combed cotton, the Called Oversized Tee is built to last — and built to make a statement.\n\nScreen printed with our signature gold foil Ephesians 2:10 graphic, this piece sits at the intersection of luxury streetwear and living faith. The oversized silhouette drapes effortlessly, and the structured boxy shoulders give it an elevated, editorial feel.\n\nWear it as a declaration. Wear it as a conversation starter. Wear it as a reminder of who you are.`,
    shortDesc: 'Premium heavyweight 400gsm cotton. Gold foil scripture graphic. Signature oversized silhouette.',
    price: 65,
    comparePrice: 85,
    category: { id: 'cat1', name: 'T-Shirts', slug: 't-shirts' },
    tags: ['tee', 'scripture', 'bestseller', 'unisex'],
    status: 'ACTIVE',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedDrop: false,
    scriptureRef: 'Ephesians 2:10',
    scriptureText: 'For we are His workmanship, created in Christ Jesus for good works.',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90', alt: 'Called Tee Front', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90', alt: 'Called Tee Back', position: 1 },
      { id: 'i3', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90', alt: 'Called Tee Detail', position: 2 },
    ],
    variants: [
      { id: 'v1', size: 'S', stock: 12 },
      { id: 'v2', size: 'M', stock: 8 },
      { id: 'v3', size: 'L', stock: 5 },
      { id: 'v4', size: 'XL', stock: 3 },
      { id: 'v5', size: 'XXL', stock: 0 },
    ],
    details: [
      '400gsm combed cotton',
      'Oversized boxy silhouette',
      'Gold foil screen print',
      'Garment washed for premium softness',
      'Reinforced shoulder seams',
      'Scripture: Ephesians 2:10',
    ],
    sizeChart: {
      headers: ['Size', 'Chest', 'Length', 'Sleeve'],
      rows: [
        ['S', '42"', '28"', '9"'],
        ['M', '44"', '29"', '9.5"'],
        ['L', '46"', '30"', '10"'],
        ['XL', '48"', '31"', '10.5"'],
        ['XXL', '50"', '32"', '11"'],
      ],
    },
    reviews: [
      {
        id: 'r1',
        rating: 5,
        title: 'Premium quality. No compromise.',
        body: 'This is the best quality tee I have owned. The gold foil print is immaculate and the oversized fit is exactly right. Not cheap oversized — intentionally structured.',
        user: { name: 'Marcus W.' },
        verified: true,
        createdAt: '2024-02-10',
      },
      {
        id: 'r2',
        rating: 5,
        title: 'Faith and fashion in one piece.',
        body: 'I wore this to church and got 4 compliments before I even sat down. The Eph. 2:10 reference is tasteful. Not in-your-face. Just beautiful.',
        user: { name: 'Jasmine T.' },
        verified: true,
        createdAt: '2024-02-14',
      },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCT_DATA[slug]
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.shortDesc || product.description.slice(0, 160),
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = PRODUCT_DATA[slug] || PRODUCT_DATA['called-oversized-tee']
  return <ProductDetailClient product={product} />
}
