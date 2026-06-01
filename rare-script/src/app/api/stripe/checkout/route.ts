import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-05-27.dahlia',
})

export async function POST(req: NextRequest) {
  try {
    const { items, form, total, discount } = await req.json()

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    // Build Stripe line items from cart
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: item.product.images?.[0]?.url ? [item.product.images[0].url] : [],
          metadata: {
            productId: item.product.id,
            variantId: item.variantId || '',
            size: item.variant?.size || '',
          },
        },
        unit_amount: Math.round((item.variant?.price || item.product.price) * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: form.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      metadata: {
        orderEmail: form.email,
        customerName: `${form.firstName} ${form.lastName}`,
        discount: discount?.toString() || '0',
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: err.message || 'Payment initialization failed' },
      { status: 500 }
    )
  }
}
