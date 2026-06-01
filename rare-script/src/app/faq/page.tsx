import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Answers to common questions about shipping, returns, sizing, membership, and more.',
}

const categories = [
  {
    name: 'Orders & Shipping',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping (5-7 business days) is available on all orders. Express (2-3 days) and Overnight options are also available at checkout. Free standard shipping on orders over $150.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently we ship to the US, Canada, and the UK. International shipping typically takes 7-14 business days. Duties and customs fees may apply.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. Once your order ships, you\'ll receive an email with your tracking number. You can also track your order in your account dashboard.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Orders can be modified or cancelled within 2 hours of placement. After that, orders enter processing and cannot be changed. Contact us immediately at hello@rarescript.com.',
      },
    ],
  },
  {
    name: 'Returns & Exchanges',
    faqs: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Limited drops and sale items are final sale.',
      },
      {
        q: 'How do I start a return?',
        a: 'Log into your account, go to Order History, select the order, and click "Start Return." You\'ll receive a prepaid return label via email.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive and inspect your return (3-5 business days), your refund is processed within 5-7 business days to your original payment method.',
      },
    ],
  },
  {
    name: 'Sizing & Product',
    faqs: [
      {
        q: 'How does Rare Script sizing run?',
        a: 'Our pieces are designed with an intentionally oversized fit. If you prefer a more fitted look, we recommend sizing down one. Check the size chart on each product page.',
      },
      {
        q: 'What fabrics do you use?',
        a: 'We use premium 400gsm combed cotton, French terry, recycled nylon, and luxury cotton-poly blends. Every fabric is selected for feel, durability, and drape.',
      },
      {
        q: 'How should I care for my garments?',
        a: 'Turn inside out, cold wash on delicate cycle, lay flat or hang dry. Never tumble dry or iron directly on printed graphics. Treat it like the luxury piece it is.',
      },
    ],
  },
  {
    name: 'Rare Circle Membership',
    faqs: [
      {
        q: 'What is the Rare Circle?',
        a: 'The Rare Circle is our premium membership program offering early access to drops, member-only pieces, loyalty points, birthday discounts, and an exclusive community. Tiers: Standard (free), Rare Circle ($19.99/mo), Founder\'s Circle ($49.99/mo).',
      },
      {
        q: 'How do I use my loyalty points?',
        a: 'Loyalty points are shown in your account dashboard. During checkout, you\'ll have the option to apply points as a discount. 100 points = $1.',
      },
      {
        q: 'Can I upgrade or downgrade my tier?',
        a: 'Yes — you can change your membership tier at any time from your account settings. Changes take effect at the next billing cycle.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-stone-50 py-16 px-6 lg:px-8 mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-semibold mb-3">
            Support
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-neutral-500 text-sm">
            Can&apos;t find your answer?{' '}
            <Link href="/contact" className="text-amber-700 underline underline-offset-2">
              Contact us
            </Link>{' '}
            and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="space-y-14">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-100">
                {cat.name}
              </h2>
              <div className="space-y-6">
                {cat.faqs.map((faq) => (
                  <div key={faq.q} className="group">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-neutral-900 text-white p-8 text-center">
          <h3 className="font-serif text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-stone-400 text-sm mb-6">Our team responds within 24 hours, Monday–Friday.</p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center text-[11px] font-semibold tracking-widest uppercase bg-amber-700 text-white px-6 py-3 hover:bg-amber-800 transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
