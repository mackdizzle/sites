import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full border-b border-neutral-200 bg-transparent py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[11px] text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }
