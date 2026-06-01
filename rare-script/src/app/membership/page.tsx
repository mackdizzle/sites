import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Crown, Zap, Gift, Lock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MEMBERSHIP_TIERS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Rare Circle Membership',
  description:
    'Join the Rare Circle — exclusive early access to limited drops, member-only colorways, loyalty points, and a community of those who walk with purpose.',
}

const tierKeys = ['STANDARD', 'RARE_CIRCLE', 'FOUNDERS_CIRCLE'] as const

const icons = [Star, Crown, Zap]

const faqs = [
  {
    q: 'When does my membership start?',
    a: 'Your membership activates immediately after purchase. You can start shopping member drops right away.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from your account dashboard. Your benefits continue until the end of the billing period.',
  },
  {
    q: "What's the difference between Rare Circle and Founder's Circle?",
    a: "Rare Circle gives you 48-hour early access and 10% off. Founder's Circle gives you 72-hour access, 20% off, custom packaging, 2x loyalty points, and an annual gift box.",
  },
  {
    q: 'How do loyalty points work?',
    a: 'You earn 10 points per $1 spent. 100 points = $1 in store credit. Points never expire while your membership is active.',
  },
  {
    q: 'Are there member-exclusive products?',
    a: 'Yes — certain colorways, capsule releases, and the Founder\'s-only collection are never available to the public.',
  },
]

export default function MembershipPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="bg-neutral-950 text-white py-24 px-6 lg:px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617952385804-7b325f797d8b?w=1400&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-amber-700/40 text-amber-500 text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 mb-8">
            <Crown size={12} />
            Rare Circle Program
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Join the
            <br />
            <span className="italic font-light text-amber-400">Inner Circle</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Premium membership for those who wear their faith with intention. Early access to every drop,
            exclusive pieces, loyalty rewards, and a community that walks with purpose.
          </p>
        </div>
      </div>

      {/* Tier cards */}
      <div className="py-20 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Choose Your Circle
            </h2>
            <p className="text-neutral-500 text-sm">Every tier gets you closer to the movement.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tierKeys.map((key, i) => {
              const tier = MEMBERSHIP_TIERS[key]
              const Icon = icons[i]
              const isMiddle = i === 1

              return (
                <div
                  key={key}
                  className={`relative p-8 ${
                    isMiddle
                      ? 'bg-neutral-900 text-white ring-2 ring-amber-700 shadow-2xl md:-mt-4 md:pb-12'
                      : 'bg-white shadow-md'
                  }`}
                >
                  {isMiddle && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[9px] tracking-[0.25em] uppercase px-4 py-1 font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className={`w-10 h-10 flex items-center justify-center mb-6 ${isMiddle ? 'bg-amber-700' : 'bg-stone-100'}`}>
                    <Icon size={18} className={isMiddle ? 'text-white' : 'text-amber-700'} />
                  </div>

                  <h3 className={`font-serif text-2xl font-bold mb-1 ${isMiddle ? 'text-white' : 'text-neutral-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 ${isMiddle ? 'text-stone-400' : 'text-stone-500'}`}>
                    {tier.description}
                  </p>

                  <div className="mb-8">
                    {tier.price === 0 ? (
                      <span className={`text-4xl font-bold ${isMiddle ? 'text-white' : 'text-neutral-900'}`}>Free</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${isMiddle ? 'text-white' : 'text-neutral-900'}`}>
                          {formatPrice(tier.price)}
                        </span>
                        <span className={`text-sm ${isMiddle ? 'text-stone-400' : 'text-stone-400'}`}>/mo</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <Check
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${isMiddle ? 'text-amber-400' : 'text-amber-700'}`}
                        />
                        <span className={`text-sm leading-snug ${isMiddle ? 'text-stone-300' : 'text-stone-600'}`}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/account?join=true" className="block">
                    <Button className="w-full" variant={isMiddle ? 'gold' : 'outline'}>
                      {tier.price === 0 ? 'Join Free' : `Join ${tier.name}`}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Perks highlight */}
      <div className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Member Benefits
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={20} />,
                title: 'Early Drop Access',
                text: 'Get exclusive access to every limited drop before the public — 48 or 72 hours early depending on tier.',
              },
              {
                icon: <Lock size={20} />,
                title: 'Member-Only Pieces',
                text: 'Exclusive colorways and capsule releases that will never be available outside the Rare Circle.',
              },
              {
                icon: <Gift size={20} />,
                title: 'Loyalty Rewards',
                text: 'Earn 10 points per $1 spent. Redeem for store credit, free shipping, or exclusive experiences.',
              },
              {
                icon: <Crown size={20} />,
                title: 'Birthday Gift',
                text: 'Every member receives a special discount and surprise during their birthday month.',
              },
              {
                icon: <Star size={20} />,
                title: 'Private Community',
                text: 'Access the Rare Circle community — faith-based discussions, style drops, and exclusive content.',
              },
              {
                icon: <Check size={20} />,
                title: 'Member Pricing',
                text: '10% off every order (Rare Circle) or 20% off (Founder\'s Circle). Every single purchase.',
              },
            ].map((b) => (
              <div key={b.title} className="border border-neutral-100 p-6 hover:border-amber-700/30 transition-colors">
                <div className="text-amber-700 mb-4">{b.icon}</div>
                <h3 className="font-semibold text-neutral-900 mb-2 text-sm">{b.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white p-6">
                <h3 className="font-semibold text-neutral-900 mb-2 text-sm">{faq.q}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
