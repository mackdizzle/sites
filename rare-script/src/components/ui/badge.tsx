import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'outline' | 'scripture' | 'new' | 'limited'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-900 text-white',
    gold: 'bg-amber-700 text-white',
    outline: 'border border-neutral-300 text-neutral-600',
    scripture: 'bg-stone-100 text-stone-700 italic',
    new: 'bg-emerald-700 text-white',
    limited: 'bg-red-800 text-white',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
