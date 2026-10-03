import * as React from 'react'
import { Button, cn } from '@jogalanza/react-ui-kit-core'

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
  size?: string
  dense?: boolean
  iconOnly?: boolean
  icon?: string | null
  color?: string | null
  label?: string | null
  loading?: boolean
}

export function BaseButton({
  variant = 'default',
  size = 'default',
  dense = false,
  iconOnly = false,
  icon = null,
  color = null,
  label = null,
  loading = false,
  disabled = false,
  title,
  className,
  children,
  ...props
}: BaseButtonProps) {
  // core-ui's Button already ships a native `destructive` variant, so it's passed straight
  // through instead of overlaying manual red classes on top of `ghost`.
  const resolvedVariant = variant === 'flat' ? 'ghost' : variant

  const colorClass = color === 'red' ? 'text-red-500 hover:bg-red-500/10' : ''

  // `dense` alone (no iconOnly) still needs room for its label — forcing the square
  // icon-only box here clipped labeled buttons like "Add Row"/"Add Files".
  const sizeClass = iconOnly
    ? 'h-7 w-7 p-0'
    : dense || size === 'xs'
      ? 'h-7 px-2 text-xs'
      : ''

  return (
    <Button
      variant={resolvedVariant as any}
      size={size as any}
      disabled={disabled || loading}
      title={title || label || undefined}
      className={cn(colorClass, sizeClass, className)}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </span>
      ) : (
        <>
          {icon && <i className="material-icons text-[18px]">{icon}</i>}
          {label && !iconOnly && <span>{label}</span>}
          {children}
        </>
      )}
    </Button>
  )
}
BaseButton.displayName = 'BaseButton'
