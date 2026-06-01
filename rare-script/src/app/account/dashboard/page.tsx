import type { Metadata } from 'next'
import Link from 'next/link'
import { Package, Heart, Crown, Settings, Gift, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate, formatPrice } from '@/lib/utils'

export const metadata: Metadata = { title: 'My Account — Dashboard' }

// Mock data for display — in production: fetch from session/database
const mockUser = {
  name: 'Jasmine T.',
  email: 'jasmine@example.com',
  membership: { tier: 'RARE_CIRCLE', points: 1840 },
  joinedAt: '2024-01-15',
}

const mockOrders = [
  {
    id: 'RS-A1B2C3',
    date: '2024-02-20',
    status: 'Delivered',
    total: 145,
    items: [{ name: 'Rare Circle Hoodie', size: 'M', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' }],
  },
  {
    id: 'RS-D4E5F6',
    date: '2024-02-10',
    status: 'Delivered',
    total: 65,
    items: [{ name: 'Called Oversized Tee', size: 'L', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80' }],
  },
]

const statusColors: Record<string, string> = {
  Pending: 'text-yellow-600 bg-yellow-50',
  Processing: 'text-blue-600 bg-blue-50',
  Shipped: 'text-purple-600 bg-purple-50',
  Delivered: 'text-emerald-600 bg-emerald-50',
  Cancelled: 'text-red-600 bg-red-50',
}

export default function AccountDashboardPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-2">My Account</p>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">
            Welcome back, {mockUser.name.split(' ')[0]}.
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Profile card */}
            <div className="bg-white p-6 border border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                {mockUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-semibold text-neutral-900">{mockUser.name}</h3>
              <p className="text-stone-400 text-xs mt-0.5">{mockUser.email}</p>
              <p className="text-stone-400 text-xs mt-1">Member since {formatDate(mockUser.joinedAt)}</p>
            </div>

            {/* Membership card */}
            <div className="bg-neutral-900 text-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown size={16} className="text-amber-400" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-semibold">
                  Rare Circle
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">
                {mockUser.membership.points.toLocaleString()}
              </p>
              <p className="text-stone-400 text-xs mb-4">Loyalty Points</p>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(mockUser.membership.points % 1000) / 10}%` }}
                />
              </div>
              <p className="text-stone-500 text-[10px]">
                {1000 - (mockUser.membership.points % 1000)} points to next reward
              </p>
              <Link href="/membership" className="block mt-4">
                <button className="text-[10px] tracking-widest uppercase text-amber-400 hover:text-amber-300 transition-colors">
                  View Benefits →
                </button>
              </Link>
            </div>

            {/* Navigation */}
            <div className="bg-white border border-neutral-100 overflow-hidden">
              {[
                { href: '/account/orders', icon: <Package size={14} />, label: 'Order History' },
                { href: '/account/wishlist', icon: <Heart size={14} />, label: 'Wishlist' },
                { href: '/membership', icon: <Crown size={14} />, label: 'My Membership' },
                { href: '/account/settings', icon: <Settings size={14} />, label: 'Account Settings' },
              ].map((item, i, arr) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm text-neutral-600 hover:bg-stone-50 hover:text-neutral-900 transition-colors ${
                    i < arr.length - 1 ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  <span className="text-stone-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <div className="bg-white border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold text-neutral-900">Recent Orders</h2>
                <Link href="/account/orders" className="text-[11px] text-amber-700 uppercase tracking-widest underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    <div className="h-14 w-12 bg-stone-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-neutral-900">{order.items[0].name}</p>
                          <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                            {order.items[0].size}
                          </p>
                        </div>
                        <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-stone-400">
                          {formatDate(order.date)} · {order.id}
                        </span>
                        <span className="text-xs font-bold">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-800 text-white p-6">
                <Gift size={20} className="mb-3" />
                <h3 className="font-serif text-lg font-bold mb-2">Refer a Friend</h3>
                <p className="text-amber-200 text-xs mb-4">Give 15% off. Earn $20 store credit.</p>
                <button className="text-[10px] tracking-widest uppercase border border-amber-400 text-amber-300 px-4 py-2 hover:bg-white/10 transition-colors">
                  Get Referral Link
                </button>
              </div>
              <div className="bg-stone-100 p-6">
                <Star size={20} className="text-amber-700 mb-3" />
                <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Leave a Review</h3>
                <p className="text-neutral-500 text-xs mb-4">Share your experience with your recent purchases.</p>
                <Link href="/account/orders">
                  <button className="text-[10px] tracking-widest uppercase border border-neutral-300 text-neutral-600 px-4 py-2 hover:bg-white transition-colors">
                    Write Reviews
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
