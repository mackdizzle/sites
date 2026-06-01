'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getTimeUntil } from '@/lib/utils'

const DROP_DATE = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString()

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-5xl font-bold font-mono tabular-nums text-white min-w-[2.5ch] text-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[9px] tracking-[0.3em] uppercase text-stone-500 mt-1">{label}</span>
    </div>
  )
}

export default function LimitedDrop() {
  const [time, setTime] = useState(getTimeUntil(DROP_DATE))

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntil(DROP_DATE)), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-28 overflow-hidden bg-neutral-950">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-red-400 font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Limited Drop — Dropping Soon
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
              The Ephesians
              <br />
              <span className="italic font-light text-amber-500">Capsule</span>
            </h2>
            <p className="text-stone-400 text-sm mb-10 leading-relaxed max-w-md">
              A seven-piece limited collection grounded in Ephesians 6. Spiritual armor reimagined
              as wearable art. Only 77 units. No restocks.
            </p>
          </motion.div>

          {/* Countdown */}
          <div className="flex items-start gap-6 mb-12">
            <CountdownUnit value={time.days} label="Days" />
            <span className="text-3xl text-stone-600 font-light mt-1">:</span>
            <CountdownUnit value={time.hours} label="Hours" />
            <span className="text-3xl text-stone-600 font-light mt-1">:</span>
            <CountdownUnit value={time.minutes} label="Min" />
            <span className="text-3xl text-stone-600 font-light mt-1">:</span>
            <CountdownUnit value={time.seconds} label="Sec" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/membership">
              <Button variant="gold" size="lg">
                Join Rare Circle — Early Access
              </Button>
            </Link>
            <Link href="/shop?category=limited-drops">
              <Button
                size="lg"
                className="border border-stone-600 text-stone-300 bg-transparent hover:bg-white/10"
              >
                View Drop
              </Button>
            </Link>
          </div>

          <p className="text-stone-600 text-[11px] tracking-wide mt-6">
            Rare Circle members get 72-hour early access before public drop.
          </p>
        </div>
      </div>
    </section>
  )
}
