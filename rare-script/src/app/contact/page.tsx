'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BRAND } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
    toast.success('Message sent! We\'ll respond within 24 hours.')
  }

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-neutral-950 text-white py-16 px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-600 text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-14">
        {/* Contact info */}
        <div className="lg:col-span-2">
          <p className="text-neutral-500 text-sm leading-relaxed mb-10">
            Have a question about an order, our pieces, or the Rare Circle? We&apos;re here for you.
            Our support team responds within 24 hours, Monday through Friday.
          </p>

          <div className="space-y-6">
            {[
              { icon: <Mail size={16} />, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
              { icon: <Phone size={16} />, label: 'Phone', value: BRAND.phone, href: `tel:${BRAND.phone}` },
              { icon: <MapPin size={16} />, label: 'Address', value: BRAND.address },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-9 h-9 bg-stone-100 flex items-center justify-center flex-shrink-0 text-amber-700">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-neutral-700 hover:text-amber-800 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-neutral-700">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">Follow Us</p>
            <a
              href={BRAND.social.instagram}
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-amber-800 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @rarescript
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="bg-stone-50 p-10 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Message Received</h3>
              <p className="text-neutral-500 text-sm">
                Thank you for reaching out. We&apos;ll respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your name"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <Input
                label="Subject"
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                placeholder="Order inquiry, sizing, membership..."
              />
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  rows={6}
                  required
                  placeholder="Tell us how we can help..."
                  className="w-full border-b border-neutral-200 bg-transparent py-3 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors resize-none"
                />
              </div>
              <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
