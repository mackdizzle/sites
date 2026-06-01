'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function BrandStory() {
  return (
    <section className="py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85')`,
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          {/* Floating scripture card */}
          <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-amber-800 p-6 max-w-[220px]">
            <p className="text-white text-sm italic leading-relaxed mb-2">
              &ldquo;You are a chosen people, a royal priesthood.&rdquo;
            </p>
            <p className="text-amber-200 text-[10px] tracking-[0.2em] uppercase">1 Peter 2:9</p>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-600 text-[10px] tracking-[0.35em] uppercase font-semibold mb-6">
            The Rare Script Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold leading-tight mb-8">
            Apparel crafted
            <br />
            <span className="italic font-light">for the called.</span>
          </h2>

          <div className="space-y-4 text-stone-400 leading-relaxed text-sm mb-10">
            <p>
              Rare Script was born from a simple conviction: that faith deserves to be worn with the
              same excellence we bring to every area of our lives. Not as a statement of religion, but as
              a declaration of identity.
            </p>
            <p>
              We create premium apparel that sits at the intersection of luxury fashion and living
              faith — pieces that don&apos;t just look exceptional, they carry meaning. Every stitch, every
              fabric choice, every scripture reference is intentional.
            </p>
            <p>
              Because the people of God should wear their calling with confidence, elegance, and grace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/faith">
              <Button variant="gold" size="lg">Read Our Story</Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                className="border border-stone-600 text-stone-300 bg-transparent hover:bg-white/10"
              >
                Meet the Brand
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
