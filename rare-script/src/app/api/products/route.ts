import { NextRequest, NextResponse } from 'next/server'

// In production: import prisma and query the database
// import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const collection = searchParams.get('collection')
    const filter = searchParams.get('filter')
    const sort = searchParams.get('sort') || 'featured'
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const search = searchParams.get('q')

    // In production, replace with actual Prisma queries:
    // const where: Prisma.ProductWhereInput = {
    //   status: 'ACTIVE',
    //   ...(category && { category: { slug: category } }),
    //   ...(collection && { collection: { slug: collection } }),
    //   ...(filter === 'new' && { isNewArrival: true }),
    //   ...(filter === 'bestsellers' && { isBestSeller: true }),
    //   ...(filter === 'featured' && { isFeatured: true }),
    //   ...(filter === 'limited' && { isLimitedDrop: true }),
    //   ...(search && {
    //     OR: [
    //       { name: { contains: search, mode: 'insensitive' } },
    //       { description: { contains: search, mode: 'insensitive' } },
    //       { tags: { has: search.toLowerCase() } },
    //     ],
    //   }),
    // }
    //
    // const [products, total] = await Promise.all([
    //   prisma.product.findMany({
    //     where,
    //     include: { images: true, variants: true, category: true, collection: true },
    //     orderBy: sort === 'price-asc' ? { price: 'asc' }
    //       : sort === 'price-desc' ? { price: 'desc' }
    //       : sort === 'newest' ? { createdAt: 'desc' }
    //       : { isFeatured: 'desc' },
    //     skip: (page - 1) * limit,
    //     take: limit,
    //   }),
    //   prisma.product.count({ where }),
    // ])

    return NextResponse.json({
      products: [],
      total: 0,
      page,
      pages: 1,
    })
  } catch (err) {
    console.error('Products fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Admin only — protected by middleware in production
    const body = await req.json()

    // Validate required fields
    const { name, price, categoryId, description } = body
    if (!name || !price || !categoryId || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In production:
    // const product = await prisma.product.create({ data: { ...body, slug: slugify(name) } })
    // return NextResponse.json(product, { status: 201 })

    return NextResponse.json({ message: 'Product creation requires database setup' }, { status: 501 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
