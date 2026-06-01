import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

    const variants = {
      primary:
        'bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:ring-neutral-900',
      secondary:
        'bg-stone-100 text-neutral-900 hover:bg-stone-200 focus-visible:ring-stone-400',
      outline:
        'border border-neutral-900 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white focus-visible:ring-neutral-900',
      ghost:
        'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100 focus-visible:ring-stone-400',
      gold:
        'bg-amber-700 text-white hover:bg-amber-800 focus-visible:ring-amber-700',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    }

    const sizes = {
      sm: 'text-[10px] px-4 py-2',
      md: 'text-[11px] px-6 py-3',
      lg: 'text-[11px] px-8 py-4',
      xl: 'text-xs px-10 py-5',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
