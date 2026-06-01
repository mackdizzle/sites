'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const addItem = useCartStore((s) => s.addItem)
  const { toggle, has } = useWishlistStore()
  const wishlisted = has(product.id)

  const mainImage = product.images[imgIndex]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85'
  const hoverImage = product.images[1]?.url || mainImage

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        <Image
          src={hovered ? hoverImage : mainImage}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && <Badge variant="new">New</Badge>}
          {product.isLimitedDrop && <Badge variant="limited">Limited</Badge>}
          {product.isBestSeller && <Badge variant="gold">Best Seller</Badge>}
          {discount > 0 && <Badge>−{discount}%</Badge>}
          {product.status === 'SOLD_OUT' && <Badge>Sold Out</Badge>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 z-10 h-8 w-8 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all hover:bg-white opacity-0 group-hover:opacity-100"
        >
          <Heart
            size={14}
            className={wishlisted ? 'fill-amber-700 text-amber-700' : 'text-neutral-600'}
          />
        </button>

        {/* Quick action bar */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? 0 : 48 }}
          transition={{ type: 'tween', duration: 0.25 }}
          className="absolute bottom-0 left-0 right-0 flex z-10"
        >
          <button
            onClick={() => product.status !== 'SOLD_OUT' && addItem(product)}
            disabled={product.status === 'SOLD_OUT'}
            className="flex-1 bg-neutral-900 text-white text-[10px] font-semibold tracking-[0.15em] uppercase py-3.5 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={12} />
            {product.status === 'SOLD_OUT' ? 'Sold Out' : 'Quick Add'}
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-stone-100 text-neutral-700 px-4 flex items-center justify-center hover:bg-stone-200 transition-colors"
          >
            <Eye size={14} />
          </Link>
        </motion.div>

        {/* Image dots for multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-1 h-1 rounded-full transition-all ${i === imgIndex ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <Link href={`/product/${product.slug}`} className="block">
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">
          {product.category.name}
        </p>
        <h3 className="text-sm font-semibold text-neutral-900 mb-1 leading-snug group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>
        {product.scriptureRef && (
          <p className="text-[10px] text-stone-400 italic mb-1.5">— {product.scriptureRef}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-stone-400 line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
