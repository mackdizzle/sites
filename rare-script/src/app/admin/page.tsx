import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  Users,
  Tag,
  TrendingUp,
  BarChart2,
  Settings,
  Image,
  Star,
  Clock,
  Crown,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard — Rare Script',
}

const stats = [
  { label: 'Total Revenue', value: '$48,231', change: '+18%', icon: <TrendingUp size={20} /> },
  { label: 'Orders (30d)', value: '284', change: '+12%', icon: <ShoppingCart size={20} /> },
  { label: 'Active Members', value: '1,247', change: '+34%', icon: <Crown size={20} /> },
  { label: 'Products', value: '48', change: '+3', icon: <Package size={20} /> },
]

const navItems = [
  { label: 'Products', href: '/admin/products', icon: <Package size={18} />, desc: 'Add, edit, manage inventory' },
  { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart size={18} />, desc: 'View and manage orders' },
  { label: 'Customers', href: '/admin/customers', icon: <Users size={18} />, desc: 'Customer accounts and data' },
  { label: 'Memberships', href: '/admin/memberships', icon: <Crown size={18} />, desc: 'Manage Rare Circle members' },
  { label: 'Coupons', href: '/admin/coupons', icon: <Tag size={18} />, desc: 'Create and manage promo codes' },
  { label: 'Collections', href: '/admin/collections', icon: <Image size={18} />, desc: 'Manage product collections' },
  { label: 'Reviews', href: '/admin/reviews', icon: <Star size={18} />, desc: 'Moderate product reviews' },
  { label: 'Limited Drops', href: '/admin/drops', icon: <Clock size={18} />, desc: 'Schedule and manage drops' },
  { label: 'Analytics', href: '/admin/analytics', icon: <BarChart2 size={18} />, desc: 'Revenue and traffic data' },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={18} />, desc: 'Store configuration' },
]

const recentOrders = [
  { id: 'RS-A1B2C3', customer: 'Jasmine T.', total: '$145.00', status: 'Processing', items: 2 },
  { id: 'RS-D4E5F6', customer: 'Marcus W.', total: '$65.00', status: 'Shipped', items: 1 },
  { id: 'RS-G7H8I9', customer: 'Aaliyah R.', total: '$325.00', status: 'Delivered', items: 3 },
  { id: 'RS-J0K1L2', customer: 'David O.', total: '$195.00', status: 'Pending', items: 1 },
  { id: 'RS-M3N4O5', customer: 'Priya K.', total: '$88.00', status: 'Processing', items: 1 },
]

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-2">
            Admin
          </p>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Rare Script Store Management</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 border border-neutral-100">
              <div className="flex items-start justify-between mb-3">
                <span className="text-stone-400">{s.icon}</span>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5">
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{s.value}</p>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Nav grid */}
          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-5">
              Management
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white p-5 border border-neutral-100 hover:border-amber-700/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-amber-700 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-amber-800 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-5">
              Recent Orders
            </h2>
            <div className="bg-white border border-neutral-100 overflow-hidden">
              {recentOrders.map((order, i) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className={`block p-4 hover:bg-stone-50 transition-colors ${
                    i < recentOrders.length - 1 ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-neutral-500">{order.id}</span>
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-900">{order.customer}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-stone-400">{order.items} item{order.items !== 1 ? 's' : ''}</span>
                    <span className="text-xs font-bold text-neutral-900">{order.total}</span>
                  </div>
                </Link>
              ))}
              <Link
                href="/admin/orders"
                className="block text-center py-3 text-[11px] text-amber-700 uppercase tracking-widest hover:bg-stone-50 transition-colors font-semibold"
              >
                View All Orders →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
