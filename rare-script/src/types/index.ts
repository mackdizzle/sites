export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string
  price: number
  comparePrice?: number
  category: { id: string; name: string; slug: string }
  collection?: { id: string; name: string; slug: string }
  tags: string[]
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED' | 'SOLD_OUT'
  isFeatured: boolean
  isBestSeller: boolean
  isNewArrival: boolean
  isLimitedDrop: boolean
  dropDate?: string
  dropEndDate?: string
  scriptureRef?: string
  scriptureText?: string
  images: ProductImage[]
  variants: ProductVariant[]
  reviews?: Review[]
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  position: number
}

export interface ProductVariant {
  id: string
  size?: string
  color?: string
  colorHex?: string
  sku?: string
  price?: number
  stock: number
}

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  product: Product
  variant?: ProductVariant
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  email: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  couponCode?: string
  createdAt: string
}

export interface OrderItem {
  id: string
  name: string
  image?: string
  size?: string
  color?: string
  quantity: number
  price: number
  total: number
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED'

export interface Review {
  id: string
  rating: number
  title?: string
  body: string
  verified: boolean
  user: { name?: string }
  createdAt: string
}

export interface Coupon {
  id: string
  code: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minOrderAmount?: number
  isMemberOnly: boolean
  isFirstOrderOnly: boolean
  validUntil?: string
  isActive: boolean
}

export interface Membership {
  id: string
  tier: 'STANDARD' | 'RARE_CIRCLE' | 'FOUNDERS_CIRCLE'
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE'
  points: number
  joinedAt: string
  renewsAt?: string
}

export interface User {
  id: string
  name?: string
  email: string
  image?: string
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN'
  loyaltyPoints: number
  membership?: Membership
}
