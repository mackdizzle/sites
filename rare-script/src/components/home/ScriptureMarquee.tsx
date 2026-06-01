'use client'

import { motion } from 'framer-motion'

const items = [
  'Faith Worn Rare',
  '✦',
  'Written With Purpose',
  '✦',
  'Luxury Apparel for the Called',
  '✦',
  'For We Are His Workmanship',
  '✦',
  'Eph. 2:10',
  '✦',
  'Royal Priesthood. Holy Nation.',
  '✦',
  '1 Pet. 2:9',
  '✦',
]

export default function ScriptureMarquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-neutral-900 py-4 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-8"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`text-[10px] tracking-[0.25em] uppercase font-medium flex-shrink-0 ${
              item === '✦' ? 'text-amber-700' : 'text-stone-500'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
