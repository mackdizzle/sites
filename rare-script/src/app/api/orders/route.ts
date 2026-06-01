import { NextRequest, NextResponse } from 'next/server'
import { generateOrderNumber } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    // In production: get userId from session, query orders
    // const session = await auth()
    // if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    //
    // const orders = await prisma.order.findMany({
    //   where: { userId: session.user.id },
    //   include: { items: { include: { product: true } } },
    //   orderBy: { createdAt: 'desc' },
    // })

    return NextResponse.json({ orders: [] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const orderNumber = generateOrderNumber()

    // In production:
    // const order = await prisma.order.create({
    //   data: {
    //     orderNumber,
    //     email: body.email,
    //     userId: body.userId,
    //     ...body.shipping,
    //     subtotal: body.subtotal,
    //     discount: body.discount || 0,
    //     shipping: body.shippingCost,
    //     tax: body.tax,
    //     total: body.total,
    //     paymentIntentId: body.paymentIntentId,
    //     status: 'CONFIRMED',
    //     paymentStatus: 'PAID',
    //     items: { create: body.items },
    //   },
    // })

    return NextResponse.json({ orderNumber, success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
