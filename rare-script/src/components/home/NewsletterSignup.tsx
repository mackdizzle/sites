'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-24 px-6 lg:px-8 bg-neutral-900 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-600 text-[10px] tracking-[0.35em] uppercase font-semibold mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-stone-400 text-sm mb-3 leading-relaxed">
            Be first to know about new drops, exclusive restocks, scripture-inspired editorials,
            and members-only offers.
          </p>
          <p className="text-amber-600 text-[11px] tracking-widest uppercase mb-10 font-semibold">
            + Get 15% off your first order
          </p>

          {status === 'success' ? (
            <div className="py-4 px-6 bg-amber-900/30 border border-amber-700/40">
              <p className="text-amber-400 text-sm font-medium">
                You're in. Check your email for your 15% discount code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 py-3.5 px-4 text-sm focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="md"
                loading={status === 'loading'}
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-stone-600 text-[11px] mt-4 tracking-wide">
            No spam. Unsubscribe at any time. Your privacy is sacred to us.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
