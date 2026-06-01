'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { SHIPPING_RATES, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants'
import { ShieldCheck, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Step = 'contact' | 'shipping' | 'payment'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, couponDiscount, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('contact')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    shippingRate: SHIPPING_RATES[0].name,
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const subtotal = getSubtotal()
  const discount = couponDiscount
  const shippingRate = subtotal >= FREE_SHIPPING_THRESHOLD
    ? null
    : SHIPPING_RATES.find((r) => r.name === form.shippingRate) || SHIPPING_RATES[0]
  const shippingCost = shippingRate?.price || 0
  const tax = (subtotal - discount) * TAX_RATE
  const total = subtotal - discount + shippingCost + tax

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, form, total, discount }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.success) {
        clearCart()
        router.push(`/checkout/success?order=${data.orderNumber}`)
      } else {
        toast.error('Payment failed. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Your cart is empty.</p>
          <Link href="/shop"><Button>Shop Now</Button></Link>
        </div>
      </div>
    )
  }

  const stepLabels: { key: Step; label: string }[] = [
    { key: 'contact', label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ]
  const stepIndex = stepLabels.findIndex((s) => s.key === step)

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-serif text-xl font-bold tracking-[0.3em] uppercase">
            Rare Script
          </Link>
          <div className="flex items-center gap-2 text-stone-400 text-xs">
            <Lock size={12} />
            Secure Checkout
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-10">
          {stepLabels.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <button
                onClick={() => i < stepIndex && setStep(s.key)}
                className={`flex items-center gap-2 ${
                  i < stepIndex ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === s.key
                      ? 'bg-neutral-900 text-white'
                      : i < stepIndex
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {i < stepIndex ? '✓' : i + 1}
                </span>
                <span
                  className={`text-[11px] uppercase tracking-widest font-semibold ${
                    step === s.key ? 'text-neutral-900' : 'text-stone-400'
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < stepLabels.length - 1 && <span className="text-stone-200 mx-2">—</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 'contact' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Contact Information</h2>
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First" />
                  <Input label="Last Name" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last" />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => form.email && form.firstName ? setStep('shipping') : toast.error('Please fill in all fields')}
                >
                  Continue to Shipping
                </Button>
                <p className="text-center text-xs text-neutral-400">
                  Already have an account?{' '}
                  <Link href="/account/login" className="text-amber-700 underline">Sign in</Link>
                </p>
              </div>
            )}

            {step === 'shipping' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Shipping Address</h2>
                <Input label="Street Address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123 Main St" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" />
                  <Input label="State" value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="State" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ZIP Code" value={form.zip} onChange={(e) => update('zip', e.target.value)} placeholder="ZIP" />
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className="w-full border-b border-neutral-200 bg-transparent py-3 text-sm focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Shipping method */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <div className="border-2 border-amber-700 bg-amber-50 p-4 flex justify-between">
                        <span className="text-sm font-medium text-neutral-900">Free Shipping (5-7 days)</span>
                        <span className="text-sm font-bold text-amber-700">Free</span>
                      </div>
                    ) : (
                      SHIPPING_RATES.map((rate) => (
                        <label
                          key={rate.name}
                          className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                            form.shippingRate === rate.name
                              ? 'border-neutral-900 bg-stone-50'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={rate.name}
                              checked={form.shippingRate === rate.name}
                              onChange={() => update('shippingRate', rate.name)}
                              className="accent-amber-700"
                            />
                            <span className="text-sm text-neutral-700">{rate.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{formatPrice(rate.price)}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => form.address && form.city ? setStep('payment') : toast.error('Please fill in your address')}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-neutral-900">Payment</h2>
                  <div className="flex items-center gap-1 text-stone-400 text-xs">
                    <ShieldCheck size={12} />
                    <span>Secured by Stripe</span>
                  </div>
                </div>
                <Input label="Cardholder Name" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} placeholder="Name on card" />
                <Input label="Card Number" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} placeholder="MM / YY" />
                  <Input label="CVC" value={form.cardCvc} onChange={(e) => update('cardCvc', e.target.value)} placeholder="•••" />
                </div>
                <Button className="w-full" size="xl" loading={loading} onClick={handlePlaceOrder}>
                  Place Order · {formatPrice(total)}
                </Button>
                <p className="text-center text-[11px] text-stone-400 leading-relaxed">
                  By placing your order, you agree to our{' '}
                  <Link href="/policies/terms" className="underline">Terms</Link> and{' '}
                  <Link href="/policies/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 p-6">
              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
                Order Summary
              </h3>
              <div className="space-y-4 mb-5 divide-y divide-neutral-100">
                {items.map((item) => {
                  const price = item.variant?.price || item.product.price
                  const image = item.product.images[0]?.url || ''
                  return (
                    <div key={item.id} className="flex gap-3 py-3 first:pt-0">
                      <div className="relative h-16 w-13 bg-stone-200 flex-shrink-0 overflow-hidden">
                        {image && <Image src={image} alt={item.product.name} fill className="object-cover" sizes="52px" />}
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-neutral-700 text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-neutral-900 leading-tight">{item.product.name}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          {[item.variant?.size, item.variant?.color].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                      <span className="text-xs font-semibold">{formatPrice(price * item.quantity)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-green-600">
                    <span>Discount</span><span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Tax</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-neutral-200">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
