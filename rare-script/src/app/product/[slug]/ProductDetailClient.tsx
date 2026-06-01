'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2, ShieldCheck, Truck, RotateCcw, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { formatPrice, getRatingStars, formatDate } from '@/lib/utils'
import { Product } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  product: Product & {
    details?: string[]
    sizeChart?: { headers: string[]; rows: string[][] }
  }
}

export default function ProductDetailClient({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const setCartOpen = useCartStore((s) => s.setOpen)
  const { toggle, has } = useWishlistStore()
  const wishlisted = has(product.id)

  const variant = product.variants.find((v) => v.id === selectedVariant)
  const price = variant?.price || product.price
  const inStock = variant ? variant.stock > 0 : product.variants.some((v) => v.stock > 0)

  const handleAddToCart = () => {
    if (product.variants.length > 1 && !selectedVariant) {
      toast.error('Please select a size first.')
      return
    }
    addItem(product, variant, qty)
    setCartOpen(true)
    toast.success(`${product.name} added to bag`, {
      icon: '🛍️',
    })
  }

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0

  // Group sizes
  const sizes = product.variants.filter((v) => v.size)

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]?.url || '/images/placeholder.jpg'}
                    alt={product.images[activeImage]?.alt || product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isLimitedDrop && <Badge variant="limited">Limited Drop</Badge>}
                {product.isNewArrival && <Badge variant="new">New</Badge>}
                {product.comparePrice && (
                  <Badge>
                    -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-16 bg-stone-100 flex-shrink-0 overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-neutral-900' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.url} alt={img.alt || ''} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Category */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
              {product.category.name}
              {product.collection && ` · ${product.collection.name}`}
            </p>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.round(avgRating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">
                  {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-neutral-900">{formatPrice(price)}</span>
              {product.comparePrice && (
                <span className="text-base text-stone-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
            </div>

            {/* Scripture */}
            {product.scriptureText && (
              <blockquote className="border-l-2 border-amber-700 pl-4 mb-6 bg-stone-50 py-3 pr-4">
                <p className="text-sm text-neutral-600 italic leading-relaxed">&ldquo;{product.scriptureText}&rdquo;</p>
                <cite className="text-[11px] text-amber-700 tracking-widest not-italic font-semibold mt-1 block">
                  — {product.scriptureRef}
                </cite>
              </blockquote>
            )}

            {/* Short desc */}
            <p className="text-sm text-neutral-600 leading-relaxed mb-8">
              {product.shortDesc || product.description.split('\n')[0]}
            </p>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500">
                    Size {selectedVariant && <span className="text-neutral-900">— {sizes.find(v => v.id === selectedVariant)?.size}</span>}
                  </label>
                  <button
                    onClick={() => setSizeOpen(!sizeOpen)}
                    className="text-[11px] text-amber-700 uppercase tracking-widest underline underline-offset-2"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      disabled={v.stock === 0}
                      className={`px-4 py-2 text-xs font-medium border transition-all relative ${
                        selectedVariant === v.id
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : v.stock === 0
                          ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {v.size}
                      {v.stock > 0 && v.stock <= 3 && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size chart accordion */}
            <AnimatePresence>
              {sizeOpen && (product as any).sizeChart && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="border border-neutral-100 p-4">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          {(product as any).sizeChart.headers.map((h: string) => (
                            <th key={h} className="text-left py-1 text-neutral-400 tracking-widest uppercase text-[10px]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(product as any).sizeChart.rows.map((row: string[], i: number) => (
                          <tr key={i} className="border-t border-neutral-100">
                            {row.map((cell, j) => (
                              <td key={j} className="py-2 text-neutral-700">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-neutral-200">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  −
                </button>
                <span className="px-4 text-sm font-medium min-w-[3ch] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!inStock}
                size="lg"
                className="flex-1"
              >
                {inStock ? 'Add to Bag' : 'Sold Out'}
              </Button>
              <button
                onClick={() => toggle(product.id)}
                className="h-12 w-12 border border-neutral-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
              >
                <Heart
                  size={18}
                  className={wishlisted ? 'fill-amber-700 text-amber-700' : 'text-neutral-400'}
                />
              </button>
            </div>

            {/* Low stock */}
            {variant && variant.stock > 0 && variant.stock <= 3 && (
              <p className="text-xs text-red-600 font-medium mb-4 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
                Only {variant.stock} left in this size
              </p>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-neutral-100">
              {[
                { icon: <Truck size={14} />, label: 'Free shipping over $150' },
                { icon: <RotateCcw size={14} />, label: '30-day free returns' },
                { icon: <ShieldCheck size={14} />, label: 'Secure checkout' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-stone-400">{item.icon}</span>
                  <span className="text-[10px] text-neutral-500 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Details accordion */}
            {(product as any).details && (
              <div className="border-t border-neutral-100">
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="flex items-center justify-between w-full py-4 text-[11px] font-semibold tracking-widest uppercase text-neutral-600"
                >
                  Product Details
                  {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence>
                  {detailsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-2 pb-4"
                    >
                      {(product as any).details.map((d: string) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="text-amber-700 mt-0.5">✦</span>
                          {d}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Reviews section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-20 border-t border-neutral-100 pt-16">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-1">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.round(avgRating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">
                    {avgRating.toFixed(1)} out of 5 · {product.reviews.length} reviews
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">Write a Review</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-stone-50 p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}
                      />
                    ))}
                  </div>
                  {review.title && (
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">{review.title}</h4>
                  )}
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{review.body}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-neutral-700">{review.user.name}</span>
                    <div className="flex items-center gap-2">
                      {review.verified && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                          <ShieldCheck size={10} /> Verified Purchase
                        </span>
                      )}
                      <span className="text-[10px] text-stone-400">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
