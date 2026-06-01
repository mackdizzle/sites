import type { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop — All Products',
  description:
    'Browse the full Rare Script collection. Premium faith-based apparel including leisurewear, tees, jackets, caps, and limited drops.',
}

export default function ShopPage() {
  return <ShopClient />
}
