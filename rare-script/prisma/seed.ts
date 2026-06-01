import { PrismaClient } from '@prisma/client'
import { slugify } from '../src/lib/utils'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Rare Script database...')

  // ── Categories ──────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 't-shirts' }, update: {}, create: { name: 'T-Shirts', slug: 't-shirts', position: 1 } }),
    prisma.category.upsert({ where: { slug: 'leisurewear' }, update: {}, create: { name: 'Leisurewear', slug: 'leisurewear', position: 2 } }),
    prisma.category.upsert({ where: { slug: 'jackets' }, update: {}, create: { name: 'Jackets', slug: 'jackets', position: 3 } }),
    prisma.category.upsert({ where: { slug: 'caps' }, update: {}, create: { name: 'Caps', slug: 'caps', position: 4 } }),
    prisma.category.upsert({ where: { slug: 'limited-drops' }, update: {}, create: { name: 'Limited Drops', slug: 'limited-drops', position: 5 } }),
  ])
  const [tShirts, leisurewear, jackets, caps] = categories
  console.log('✓ Categories seeded')

  // ── Collections ─────────────────────────────────────────────────────────
  const sacredEdit = await prisma.collection.upsert({
    where: { slug: 'sacred-edit' },
    update: {},
    create: { name: 'The Sacred Edit', slug: 'sacred-edit', description: 'Refined pieces for quiet moments and bold statements.', isFeatured: true },
  })
  const covenantSeries = await prisma.collection.upsert({
    where: { slug: 'covenant-series' },
    update: {},
    create: { name: 'Covenant Series', slug: 'covenant-series', description: 'Bold graphics rooted in covenant scripture.', isFeatured: true },
  })
  const kingdomEssentials = await prisma.collection.upsert({
    where: { slug: 'kingdom-essentials' },
    update: {},
    create: { name: 'Kingdom Essentials', slug: 'kingdom-essentials', description: 'The everyday capsule. Premium basics elevated with faith-driven design.' },
  })
  const ephesiansCapsule = await prisma.collection.upsert({
    where: { slug: 'ephesians-capsule' },
    update: {},
    create: {
      name: 'The Ephesians Capsule',
      slug: 'ephesians-capsule',
      description: 'Seven pieces. Ephesians 6. Spiritual armor, reimagined as wearable art. 77 units only.',
      isFeatured: true,
      releaseDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    },
  })
  console.log('✓ Collections seeded')

  // ── Products ─────────────────────────────────────────────────────────────
  const products = [
    {
      name: 'Called Oversized Tee',
      slug: 'called-oversized-tee',
      description: 'Our flagship tee. Crafted from 400gsm heavyweight combed cotton, the Called Oversized Tee is built to last — and built to make a statement.\n\nScreen printed with our signature gold foil Ephesians 2:10 graphic, this piece sits at the intersection of luxury streetwear and living faith.',
      shortDesc: 'Premium heavyweight 400gsm cotton. Gold foil scripture graphic. Signature oversized silhouette.',
      price: 65,
      comparePrice: 85,
      categoryId: tShirts.id,
      collectionId: kingdomEssentials.id,
      tags: ['tee', 'scripture', 'bestseller', 'unisex'],
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      scriptureRef: 'Ephesians 2:10',
      scriptureText: 'For we are His workmanship, created in Christ Jesus for good works.',
      images: [
        { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90', alt: 'Called Tee Front', position: 0 },
        { url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90', alt: 'Called Tee Back', position: 1 },
      ],
      variants: [
        { size: 'S', stock: 12 }, { size: 'M', stock: 8 }, { size: 'L', stock: 5 }, { size: 'XL', stock: 3 }, { size: 'XXL', stock: 0 },
      ],
    },
    {
      name: 'Rare Circle Hoodie',
      slug: 'rare-circle-hoodie',
      description: 'Premium French terry blend. Embossed Rare Script logo on chest. Heavyweight 400gsm for substantial warmth without bulk.',
      shortDesc: 'Heavyweight French terry hoodie. Embossed logo. 400gsm.',
      price: 145,
      categoryId: leisurewear.id,
      collectionId: sacredEdit.id,
      tags: ['hoodie', 'premium', 'bestseller'],
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90', alt: 'Rare Circle Hoodie', position: 0 },
      ],
      variants: [
        { size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 4 },
      ],
    },
    {
      name: 'Faith Trucker Cap',
      slug: 'faith-trucker-cap',
      description: 'Stone washed cotton-poly blend cap with embroidered cross detail on the front panel. Structured crown. Adjustable snapback closure.',
      price: 48,
      categoryId: caps.id,
      tags: ['cap', 'accessories', 'bestseller'],
      isBestSeller: true,
      scriptureRef: '1 Peter 2:9',
      images: [
        { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=90', alt: 'Faith Cap', position: 0 },
      ],
      variants: [{ size: 'One Size', stock: 20 }],
    },
    {
      name: 'Covenant Coach Jacket',
      slug: 'covenant-coach-jacket',
      description: 'Lightweight nylon coach jacket with gold embroidery. Satin lining printed with Philippians 4:13 in full. Elastic cuffs and hem.',
      shortDesc: 'Lightweight nylon, gold embroidery, scripture-lined satin interior.',
      price: 195,
      comparePrice: 240,
      categoryId: jackets.id,
      collectionId: covenantSeries.id,
      tags: ['jacket', 'limited', 'premium'],
      isFeatured: true,
      isNewArrival: true,
      isLimitedDrop: true,
      scriptureRef: 'Philippians 4:13',
      images: [
        { url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=90', alt: 'Covenant Jacket', position: 0 },
      ],
      variants: [
        { size: 'S', stock: 3 }, { size: 'M', stock: 2 }, { size: 'L', stock: 1 }, { size: 'XL', stock: 0 },
      ],
    },
    {
      name: 'Workmanship Joggers',
      slug: 'workmanship-joggers',
      description: '400gsm French terry joggers. Rare Script embroidered logo on left thigh. Tapered fit. Premium elastic waistband with drawcord.',
      price: 98,
      categoryId: leisurewear.id,
      collectionId: sacredEdit.id,
      tags: ['joggers', 'leisurewear'],
      isNewArrival: true,
      scriptureRef: 'Ephesians 2:10',
      images: [
        { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=90', alt: 'Workmanship Joggers', position: 0 },
      ],
      variants: [
        { size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 5 },
      ],
    },
    {
      name: 'Ephesians Drop Tee',
      slug: 'ephesians-drop-tee',
      description: 'Limited Edition — Only 77 units. Oversized tee with full-back Ephesians 6:10-18 typography print. Stone colorway.',
      shortDesc: 'Limited to 77 units. Full-back Ephesians 6 typography print.',
      price: 88,
      categoryId: tShirts.id,
      collectionId: ephesiansCapsule.id,
      tags: ['tee', 'limited', 'scripture'],
      isFeatured: true,
      isNewArrival: true,
      isLimitedDrop: true,
      scriptureRef: 'Ephesians 6:10-18',
      dropDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      images: [
        { url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90', alt: 'Ephesians Tee', position: 0 },
      ],
      variants: [
        { size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 12 }, { size: 'XL', stock: 8 }, { size: 'XXL', stock: 4 },
      ],
    },
    {
      name: 'Proverbs 31 Crop Tee',
      slug: 'proverbs-31-crop-tee',
      description: 'Relaxed crop tee. Soft 240gsm combed cotton. Gold script Proverbs 31:25 print across the chest.',
      price: 58,
      categoryId: tShirts.id,
      tags: ['tee', 'women', 'scripture', 'bestseller'],
      isBestSeller: true,
      isNewArrival: true,
      scriptureRef: 'Proverbs 31:25',
      scriptureText: 'She is clothed with strength and dignity, and she laughs without fear of the future.',
      images: [
        { url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=90', alt: 'Proverbs 31 Crop Tee', position: 0 },
      ],
      variants: [
        { size: 'XS', stock: 6 }, { size: 'S', stock: 9 }, { size: 'M', stock: 11 }, { size: 'L', stock: 5 },
      ],
    },
    {
      name: 'Kingdom Puffer Jacket',
      slug: 'kingdom-puffer-jacket',
      description: 'Luxe recycled puffer. Cross-quilted detailing. Scripture embroidered on inner chest. Water-repellent shell.',
      price: 280,
      categoryId: jackets.id,
      collectionId: sacredEdit.id,
      tags: ['jacket', 'winter', 'premium'],
      isFeatured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90', alt: 'Kingdom Puffer Jacket', position: 0 },
      ],
      variants: [
        { size: 'S', stock: 4 }, { size: 'M', stock: 6 }, { size: 'L', stock: 3 }, { size: 'XL', stock: 2 },
      ],
    },
  ]

  for (const p of products) {
    const { images, variants, ...data } = p
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        images: { create: images },
        variants: { create: variants },
      },
    })
  }
  console.log(`✓ ${products.length} products seeded`)

  // ── Coupons ──────────────────────────────────────────────────────────────
  const coupons = [
    { code: 'WELCOME15', type: 'PERCENTAGE' as const, value: 15, description: 'Welcome — 15% off first order', isFirstOrderOnly: true },
    { code: 'RARECIRCLE', type: 'PERCENTAGE' as const, value: 10, description: 'Rare Circle member discount', minOrderAmount: 100, isMemberOnly: true },
    { code: 'SAVE20', type: 'FIXED_AMOUNT' as const, value: 20, description: '$20 off orders over $80', minOrderAmount: 80 },
    { code: 'FREESHIP', type: 'FREE_SHIPPING' as const, value: 0, description: 'Free shipping on any order' },
    { code: 'BLESSED30', type: 'PERCENTAGE' as const, value: 30, description: '30% off orders over $150', minOrderAmount: 150 },
    { code: 'FOUNDERS20', type: 'PERCENTAGE' as const, value: 20, description: "Founder's Circle 20% discount", isMemberOnly: true },
  ]

  for (const c of coupons) {
    await prisma.coupon.upsert({ where: { code: c.code }, update: {}, create: c })
  }
  console.log(`✓ ${coupons.length} coupons seeded`)

  console.log('\n✅ Rare Script database seeded successfully!')
  console.log('\nDemo coupon codes:')
  coupons.forEach((c) => console.log(`  ${c.code.padEnd(14)} — ${c.description}`))
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
