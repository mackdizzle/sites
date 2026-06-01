'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BRAND } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'register' && form.password !== form.confirm) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    // In production: call NextAuth signIn() or create account via API
    toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!')
    setLoading(false)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-2xl font-bold tracking-[0.3em] uppercase">
            {BRAND.name}
          </Link>
          <p className="text-stone-400 text-xs mt-2 tracking-widest uppercase">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex mb-8 border border-neutral-200">
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all ${
                mode === m ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your full name"
              required
            />
          )}
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="your@email.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            placeholder="••••••••"
            required
          />
          {mode === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              placeholder="••••••••"
              required
            />
          )}

          {mode === 'login' && (
            <div className="text-right">
              <Link href="/account/forgot" className="text-[11px] text-amber-700 underline underline-offset-2">
                Forgot password?
              </Link>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-neutral-200" />
          <span className="text-[11px] text-stone-400 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Social login */}
        <button className="w-full border border-neutral-200 py-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-600 hover:bg-stone-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {mode === 'register' && (
          <p className="text-center text-[11px] text-stone-400 mt-6 leading-relaxed">
            By creating an account, you agree to our{' '}
            <Link href="/policies/terms" className="underline text-neutral-500">Terms</Link> and{' '}
            <Link href="/policies/privacy" className="underline text-neutral-500">Privacy Policy</Link>.
          </p>
        )}
      </div>
    </div>
  )
}
