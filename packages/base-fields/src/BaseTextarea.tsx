import * as React from 'react'
import { cn } from '@jogalanza/react-ui-kit-core'
import type { Rule } from './BaseInput'

export interface BaseTextareaProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  hint?: string
  readonly?: boolean
  disabled?: boolean
  rows?: string | number
  rules?: Rule[]
}

export function BaseTextarea({
  value = '',
  onChange,
  label = '',
  placeholder = '',
  hint = '',
  readonly = false,
  disabled = false,
  rows = 3,
  rules = [],
}: BaseTextareaProps) {
  const [touched, setTouched] = React.useState(false)

  let errorMessage = ''
  if (touched) {
    for (const rule of rules) {
      const result = rule(value)
      if (result !== true) {
        errorMessage = result || 'Invalid value'
        break
      }
    }
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={disabled}
        rows={rows as any}
        className={cn(
          'block w-full resize-y rounded border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2',
          errorMessage
            ? 'border-red-500 focus:ring-red-500'
            : 'border-border focus:border-primary focus:ring-primary',
        )}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      {errorMessage ? (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
BaseTextarea.displayName = 'BaseTextarea'
