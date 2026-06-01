import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Rare Script',
  description:
    'The story behind the brand — a luxury Christian fashion house built on faith, purpose, and uncompromising craft.',
}

const values = [
  {
    icon: '✦',
    title: 'Excellence',
    text: 'We believe the people of God should wear their calling with the same excellence they bring to every other area of their lives.',
  },
  {
    icon: '✦',
    title: 'Intention',
    text: 'Every piece is designed with purpose. Every fabric choice, every scripture reference, every stitch — deliberate.',
  },
  {
    icon: '✦',
    title: 'Identity',
    text: 'We don\'t make "Christian merch." We make luxury apparel for people who understand that their identity in Christ demands excellence.',
  },
  {
    icon: '✦',
    title: 'Community',
    text: 'The Rare Circle isn\'t just a membership. It\'s a tribe of those called to walk with purpose, dressed with intention.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            About Rare Script
          </h1>
        </div>
      </div>

      {/* Mission section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            A luxury fashion house rooted in faith.
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed">
            Rare Script was born from the conviction that faith and excellence are not mutually exclusive.
            That premium quality and spiritual identity belong together. That the Church deserves luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We started with a simple question: why does &quot;Christian fashion&quot; so often feel like an afterthought?
              Like faith is something that needs to be apologized for with cheap fabrics and dated aesthetics?
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Rare Script exists to answer that question differently. We design for the believer who walks into
              a room with quiet confidence — who doesn&apos;t need to shout, because they know who they are.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Our pieces are crafted to last, designed to turn heads, and grounded in scripture. Not as
              decoration. As declaration.
            </p>
          </div>
          <div className="relative aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85"
              alt="Rare Script Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-8 mb-20">
          {values.map((v) => (
            <div key={v.title} className="bg-stone-50 p-8">
              <span className="text-amber-700 text-lg mb-4 block">{v.icon}</span>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">{v.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-neutral-900 text-white p-12 text-center">
          <p className="text-amber-600 text-[10px] tracking-[0.35em] uppercase font-semibold mb-4">
            Join the Movement
          </p>
          <h3 className="font-serif text-3xl font-bold mb-4">
            Wear your calling.
          </h3>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto">
            Discover pieces crafted for those who walk with purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-stone-100">
                Shop the Collection
              </Button>
            </Link>
            <Link href="/faith">
              <Button size="lg" className="border border-stone-600 text-stone-300 bg-transparent hover:bg-white/10">
                Faith & Purpose
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
