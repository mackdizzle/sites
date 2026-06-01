import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Package, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Order Confirmed — Thank You' }

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order } = await searchParams

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
          Order Confirmed
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
          Thank you for your order.
        </h1>

        {order && (
          <p className="text-neutral-500 text-sm mb-2">
            Order #{order}
          </p>
        )}

        <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          Your order is being prepared with care. You&apos;ll receive a confirmation email shortly with
          tracking information once your piece ships.
        </p>

        {/* Scripture */}
        <blockquote className="border border-stone-200 p-6 mb-10 bg-stone-50">
          <p className="text-sm text-neutral-600 italic leading-relaxed mb-2">
            &ldquo;For we are His workmanship, created in Christ Jesus for good works.&rdquo;
          </p>
          <cite className="text-[11px] text-amber-700 tracking-widest not-italic font-semibold">
            Ephesians 2:10
          </cite>
        </blockquote>

        {/* Next steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-stone-50 p-5 text-left">
            <Mail size={18} className="text-amber-700 mb-3" />
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">Confirmation Email</h3>
            <p className="text-xs text-neutral-500">A receipt has been sent to your email address.</p>
          </div>
          <div className="bg-stone-50 p-5 text-left">
            <Package size={18} className="text-amber-700 mb-3" />
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">Shipping Updates</h3>
            <p className="text-xs text-neutral-500">We&apos;ll email you tracking info when your order ships.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account/dashboard">
            <Button variant="outline">View Order History</Button>
          </Link>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
