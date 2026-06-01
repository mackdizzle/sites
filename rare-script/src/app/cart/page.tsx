'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Tag } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, TAX_RATE, SHIPPING_RATES } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, couponCode, couponDiscount, couponType, applyCoupon, removeCoupon } = useCartStore()
  const [promoInput, setPromoInput] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)

  const subtotal = getSubtotal()
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATES[0].price
  const discount = couponDiscount
  const taxable = subtotal - discount
  const tax = taxable * TAX_RATE
  const total = taxable + shippingCost + tax

  const applyPromo = async () => {
    if (!promoInput) return
    setPromoLoading(true)
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotal }),
      })
      const data = await res.json()
      if (data.valid) {
        applyCoupon(data.code, data.discount, data.type)
        toast.success(`Promo applied! You saved ${formatPrice(data.discount)}`)
      } else {
        toast.error(data.message || 'Invalid promo code')
      }
    } catch {
      toast.error('Unable to validate code. Try again.')
    } finally {
      setPromoLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag size={48} className="text-stone-200 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-3">Your bag is empty</h1>
          <p className="text-neutral-500 text-sm mb-8">Discover pieces crafted with purpose.</p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-neutral-900">Your Bag</h1>
          <p className="text-neutral-500 text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const price = item.variant?.price || item.product.price
              const image = item.product.images[0]?.url || '/images/placeholder.jpg'
              return (
                <div key={item.id} className="flex gap-5 pb-6 border-b border-neutral-100">
                  <div className="relative h-28 w-24 bg-stone-100 flex-shrink-0 overflow-hidden">
                    <Image src={image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors leading-snug">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-1">
                          {[item.variant?.size, item.variant?.color].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-300 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-4 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-neutral-900">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-stone-50 p-6 sticky top-28">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-900 mb-6">
                Order Summary
              </h2>

              {/* Promo code */}
              <div className="mb-6">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag size={12} className="text-green-600" />
                      <span className="text-xs font-medium text-green-700">{couponCode}</span>
                      <span className="text-xs text-green-600">−{formatPrice(discount)}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-green-400 hover:text-green-600">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      className="flex-1 border border-neutral-200 px-3 py-2.5 text-xs focus:outline-none focus:border-neutral-400"
                      onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={applyPromo}
                      loading={promoLoading}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Est. Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold text-base text-neutral-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-[11px] text-amber-700 mb-4 text-center">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                </p>
              )}

              <Link href="/checkout" className="block">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1">
                <span className="text-[10px] text-stone-400">Secure checkout powered by</span>
                <span className="text-[10px] font-medium text-stone-500">Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
