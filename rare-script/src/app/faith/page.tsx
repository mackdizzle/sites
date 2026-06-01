import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SCRIPTURES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Faith & Purpose — The Rare Script Story',
  description:
    'The spiritual foundation behind Rare Script. Why we create, who we create for, and the scriptures that guide every design decision.',
}

const principles = [
  {
    number: '01',
    title: 'We are His workmanship.',
    scripture: 'Ephesians 2:10',
    text: 'Everything we make starts here. If God crafted you with intentionality and care — every detail of who you are — then what you wear should reflect that same intentionality. Rare Script exists to honor that workmanship.',
  },
  {
    number: '02',
    title: 'Clothed with strength and dignity.',
    scripture: 'Proverbs 31:25',
    text: 'Confidence isn\'t arrogance — it\'s knowing who made you and why. Our pieces are designed to give you that presence. The presence of someone who knows they are loved, chosen, and called.',
  },
  {
    number: '03',
    title: 'A royal priesthood.',
    scripture: '1 Peter 2:9',
    text: 'You were not made for mediocrity. You were made for purpose. The clothes you wear should never contradict that calling. Rare Script designs for royalty — the everyday royalty of those who belong to the Kingdom.',
  },
  {
    number: '04',
    title: 'Put on the full armor.',
    scripture: 'Ephesians 6:11',
    text: 'The spiritual life is not passive. We engage. We resist. We stand. Rare Script apparel is a small but meaningful act of putting on — of choosing each morning to walk with intention and not apologize for your faith.',
  },
]

export default function FaithPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-center bg-neutral-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=85')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <p className="text-amber-600 text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
            Faith & Purpose
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            The Word Behind
            <br />
            <span className="italic font-light">the Cloth</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Every Rare Script piece carries a conviction. These are the scriptures, the beliefs, and the
            principles that shape everything we create.
          </p>
        </div>
      </div>

      {/* Principles */}
      <div className="bg-white">
        {principles.map((p, i) => (
          <div
            key={p.number}
            className={`max-w-7xl mx-auto px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center ${
              i !== principles.length - 1 ? 'border-b border-neutral-100' : ''
            }`}
          >
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <div className="flex items-start gap-4 mb-6">
                <span className="text-stone-200 text-6xl font-bold font-serif leading-none mt-1">
                  {p.number}
                </span>
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-amber-700 font-semibold block mb-2">
                    {p.scripture}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                    {p.title}
                  </h2>
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{p.text}</p>
            </div>
            <div className={`bg-stone-50 p-10 text-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <p className="font-serif text-xl md:text-2xl text-neutral-700 italic leading-relaxed mb-4">
                &ldquo;{SCRIPTURES.find((s) => s.ref.includes(p.scripture.split(' ')[0]))?.text || p.title}&rdquo;
              </p>
              <span className="text-amber-700 text-[11px] tracking-[0.3em] uppercase font-semibold">
                {p.scripture}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Brand statement */}
      <div className="bg-neutral-900 text-white py-24 px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-amber-600 text-[10px] tracking-[0.35em] uppercase font-semibold block mb-6">
            Our Commitment
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight">
            We will never compromise the faith
            <br />
            <span className="italic font-light text-stone-300">to chase the trend.</span>
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Rare Script will always be grounded in scripture. Every collection is reviewed for spiritual
            integrity. We don&apos;t use faith as a marketing angle — it is the foundation everything is built on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-stone-100">
                Shop the Collection
              </Button>
            </Link>
            <Link href="/membership">
              <Button size="lg" variant="gold">
                Join Rare Circle
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
