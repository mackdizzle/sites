'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Editorial fashion image - dark, moody, luxury */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617952385804-7b325f797d8b?w=1920&q=90')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        {/* Scripture pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-amber-700/60 text-amber-500 text-[10px] tracking-[0.3em] uppercase px-4 py-2 mb-8"
        >
          <span className="w-4 h-px bg-amber-700/60" />
          Written With Purpose
          <span className="w-4 h-px bg-amber-700/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 max-w-4xl"
        >
          Faith
          <br />
          <span className="italic font-light">Worn</span> Rare
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-stone-300 text-sm md:text-base tracking-widest uppercase max-w-sm mx-auto mb-10 leading-relaxed"
        >
          Luxury Apparel for the Called
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/shop">
            <Button size="xl" className="bg-white text-neutral-900 hover:bg-stone-100 min-w-[200px]">
              Shop the Collection
            </Button>
          </Link>
          <Link href="/faith">
            <Button
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-neutral-900 min-w-[200px]"
            >
              Our Story
            </Button>
          </Link>
        </motion.div>

        {/* Scripture */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-xs italic tracking-wide whitespace-nowrap"
        >
          &ldquo;For we are His workmanship&rdquo; — Eph. 2:10
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
