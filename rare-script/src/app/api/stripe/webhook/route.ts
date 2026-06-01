import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-05-27.dahlia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleOrderCreation(session)
        break
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed for intent:', intent.id)
        // In production: notify customer, update order status
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleMembershipUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleMembershipCancellation(subscription)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleOrderCreation(session: Stripe.Checkout.Session) {
  // In production:
  // 1. Create order in database with generateOrderNumber()
  // 2. Update product inventory
  // 3. Send confirmation email
  // 4. Add loyalty points to customer account
  // 5. Trigger fulfillment workflow
  console.log('Order created from session:', session.id, {
    email: session.customer_email,
    amount: session.amount_total,
  })
}

async function handleMembershipUpdate(subscription: Stripe.Subscription) {
  // In production: update membership tier/status in database
  console.log('Membership updated:', subscription.id, subscription.status)
}

async function handleMembershipCancellation(subscription: Stripe.Subscription) {
  // In production: set membership status to CANCELLED in database
  console.log('Membership cancelled:', subscription.id)
}
