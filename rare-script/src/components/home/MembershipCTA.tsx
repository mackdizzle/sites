'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MEMBERSHIP_TIERS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

const tiers = [
  MEMBERSHIP_TIERS.STANDARD,
  MEMBERSHIP_TIERS.RARE_CIRCLE,
  MEMBERSHIP_TIERS.FOUNDERS_CIRCLE,
]

export default function MembershipCTA() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
            The Rare Circle
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Join the Movement
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto">
            A premium membership program for those who wear their faith with intention. Early access,
            exclusive drops, and a community that walks with purpose.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const isMiddle = i === 1
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 ${
                  isMiddle
                    ? 'bg-neutral-900 text-white ring-2 ring-amber-700 scale-105 shadow-2xl'
                    : 'bg-white text-neutral-900 shadow-md'
                }`}
              >
                {isMiddle && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[9px] tracking-[0.25em] uppercase px-4 py-1 font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`font-serif text-2xl font-bold mb-1 ${
                      isMiddle ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className={`text-sm ${isMiddle ? 'text-stone-400' : 'text-stone-500'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8">
                  {tier.price === 0 ? (
                    <span className={`text-3xl font-bold ${isMiddle ? 'text-white' : 'text-neutral-900'}`}>
                      Free
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${isMiddle ? 'text-white' : 'text-neutral-900'}`}>
                        {formatPrice(tier.price)}
                      </span>
                      <span className={`text-sm ${isMiddle ? 'text-stone-400' : 'text-stone-500'}`}>
                        /mo
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${
                          isMiddle ? 'text-amber-500' : 'text-amber-700'
                        }`}
                      />
                      <span
                        className={`text-sm leading-snug ${
                          isMiddle ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/membership" className="block">
                  <Button
                    className="w-full"
                    variant={isMiddle ? 'gold' : 'outline'}
                  >
                    {tier.price === 0 ? 'Join Free' : 'Get Started'}
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
