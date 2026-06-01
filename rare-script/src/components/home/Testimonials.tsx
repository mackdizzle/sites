'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Jasmine T.',
    location: 'Atlanta, GA',
    rating: 5,
    text: "I've worn a lot of 'Christian' brands but Rare Script is genuinely luxury. The Covenant Jacket is my most complimented piece. People ask where I got it before they notice the scripture.",
    product: 'Covenant Coach Jacket',
    avatar: 'JT',
  },
  {
    id: 2,
    name: 'Marcus W.',
    location: 'Houston, TX',
    rating: 5,
    text: "The Called Oversized Tee fits like a dream. 400gsm fabric, gold foil detail — this isn't streetwear, it's elevated. Rare Circle membership was worth it for the early drop access alone.",
    product: 'Called Oversized Tee',
    avatar: 'MW',
  },
  {
    id: 3,
    name: 'Aaliyah R.',
    location: 'Los Angeles, CA',
    rating: 5,
    text: "What I love most is that faith is woven into the design without being preachy. It's refined, intentional, and beautiful. Rare Script understands that holiness and luxury aren't opposites.",
    product: 'Rare Circle Hoodie',
    avatar: 'AR',
  },
  {
    id: 4,
    name: 'David O.',
    location: 'Chicago, IL',
    rating: 5,
    text: "As a Founder's Circle member, the exclusive packaging alone makes this worth it. Every unboxing feels like receiving something sacred. Quality is unmatched in this space.",
    product: "Founder's Circle Member",
    avatar: 'DO',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="py-24 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
          The Community Speaks
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-16">
          Worn with Purpose
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
              ))}
            </div>

            <blockquote className="font-serif text-xl md:text-2xl text-neutral-800 italic leading-relaxed mb-8 max-w-2xl mx-auto">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="h-10 w-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold tracking-wider">
                {t.avatar}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                <p className="text-[11px] text-stone-400 tracking-wide">{t.location} · {t.product}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="h-10 w-10 border border-neutral-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 transition-all rounded-full ${
                  i === current ? 'w-8 bg-amber-700' : 'w-2 bg-stone-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="h-10 w-10 border border-neutral-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
