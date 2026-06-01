'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types'

interface CartStore {
  items: CartItem[]
  couponCode: string
  couponDiscount: number
  couponType: string
  isOpen: boolean

  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  applyCoupon: (code: string, discount: number, type: string) => void
  removeCoupon: () => void
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      couponDiscount: 0,
      couponType: '',
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === product.id && i.variantId === (variant?.id || undefined)
          )

          if (existingIndex >= 0) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            }
            return { items: updated }
          }

          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
            productId: product.id,
            variantId: variant?.id,
            product,
            variant,
            quantity,
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),

      setOpen: (open) => set({ isOpen: open }),

      applyCoupon: (code, discount, type) =>
        set({ couponCode: code, couponDiscount: discount, couponType: type }),

      removeCoupon: () => set({ couponCode: '', couponDiscount: 0, couponType: '' }),

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((sum, item) => {
          const price = item.variant?.price || item.product.price
          return sum + price * item.quantity
        }, 0)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    { name: 'rare-script-cart' }
  )
)
