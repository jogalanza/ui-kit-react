import * as React from 'react'
import { cn } from '@jogalanza/ui-kit-core'

export type Rule = (value: any) => true | string

export interface BaseInputProps {
  value?: string | number
  onChange?: (value: string | number | null) => void
  type?: string
  label?: string
  placeholder?: string
  hint?: string
  readonly?: boolean
  disabled?: boolean
  step?: string | number
  autocomplete?: string
  // Array of (value) => true | 'error message' — validated on blur/change, same shape as
  // the validator functions previously passed to Quasar's q-input :rules.
  rules?: Rule[]
  // Lightens the label/hint text for use on dark backgrounds (e.g. the login card).
  dark?: boolean
  clearable?: boolean
  prepend?: React.ReactNode
  append?: React.ReactNode
}

export function BaseInput({
  value = '',
  onChange,
  type = 'text',
  label = '',
  placeholder = '',
  hint = '',
  readonly = false,
  disabled = false,
  step,
  autocomplete,
  rules = [],
  dark = false,
  clearable = false,
  prepend,
  append,
}: BaseInputProps) {
  const [touched, setTouched] = React.useState(false)
  const showClear = clearable && value !== '' && value != null

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    onChange?.(type === 'number' ? (raw === '' ? null : Number(raw)) : raw)
  }

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
        <label
          className={cn(
            'mb-1 block text-sm font-medium',
            dark ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prepend && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {prepend}
          </span>
        )}
        <input
          value={value as any}
          type={type}
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          step={step}
          autoComplete={autocomplete}
          className={cn(
            'block w-full rounded border bg-card py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2',
            prepend ? 'pl-9' : 'pl-3',
            append || showClear ? 'pr-9' : 'pr-3',
            errorMessage
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border focus:border-primary focus:ring-primary',
          )}
          onChange={onInput}
          onBlur={() => setTouched(true)}
        />
        {showClear && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground">
            <i
              className="material-icons cursor-pointer text-[16px]"
              onClick={() => onChange?.('')}
            >
              close
            </i>
          </span>
        )}
        {!showClear && append && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {append}
          </span>
        )}
      </div>
      {errorMessage ? (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
BaseInput.displayName = 'BaseInput'
