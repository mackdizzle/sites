'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, getSubtotal } = useCartStore()
  const subtotal = getSubtotal()
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                  Your Bag ({items.length})
                </h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
              <div className="px-6 py-4 bg-stone-50 border-b border-neutral-100">
                <p className="text-[11px] text-neutral-600 mb-2 tracking-wide">
                  Add <span className="font-semibold text-amber-700">{formatPrice(remaining)}</span> more for free shipping
                </p>
                <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    className="h-full bg-amber-700 rounded-full"
                  />
                </div>
              </div>
            )}
            {subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
              <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100">
                <p className="text-[11px] text-emerald-700 font-semibold tracking-wide">
                  ✓ You've unlocked free shipping!
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={40} className="text-stone-300" />
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-1">Your bag is empty</p>
                    <p className="text-xs text-neutral-400">Discover pieces crafted with purpose</p>
                  </div>
                  <Link href="/shop" onClick={() => setOpen(false)}>
                    <Button size="sm">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => {
                    const price = item.variant?.price || item.product.price
                    const image = item.product.images[0]?.url || '/images/placeholder.jpg'
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-24 w-20 bg-stone-100 flex-shrink-0 overflow-hidden">
                          <Image src={image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xs font-semibold text-neutral-900 leading-tight mb-0.5">
                                {item.product.name}
                              </h3>
                              {(item.variant?.size || item.variant?.color) && (
                                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                                  {[item.variant.size, item.variant.color].filter(Boolean).join(' · ')}
                                </p>
                              )}
                              <p className="text-xs font-semibold text-neutral-900 mt-1">
                                {formatPrice(price)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-300 hover:text-red-500 transition-colors flex-shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 border border-neutral-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 border border-neutral-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 uppercase tracking-widest text-[11px]">Subtotal</span>
                  <span className="text-base font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 text-center tracking-wide">
                  Shipping & taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={() => setOpen(false)} className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={() => setOpen(false)} className="block text-center">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-widest underline underline-offset-2 hover:text-neutral-900 transition-colors">
                    View Full Cart
                  </span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
