import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '@jogalanza/ui-kit-core'
import type { Rule } from './BaseInput'

export interface BaseSelectProps {
  value?: any
  onChange?: (value: any) => void
  // Array of raw values, or { label, value } objects — mirrors Quasar's
  // q-select :options, always operating in "emit-value" mode (value is
  // the raw value, never the option object).
  options?: any[]
  label?: string
  placeholder?: string
  hint?: string
  clearable?: boolean
  disabled?: boolean
  rules?: Rule[]
}

export function BaseSelect({
  value = null,
  onChange,
  options = [],
  label = '',
  placeholder = '',
  hint = '',
  clearable = false,
  disabled = false,
  rules = [],
}: BaseSelectProps) {
  const [touched, setTouched] = React.useState(false)

  const normalizedOptions = options.map((o) =>
    o !== null && typeof o === 'object'
      ? o
      : { label: String(o), value: o },
  )

  const hasValue = value !== null && value !== undefined && value !== ''

  const selectedLabel =
    normalizedOptions.find((o) => o.value === value)?.label ?? ''

  const valueStr = value === null || value === undefined ? '' : String(value)

  const handleChange = (next: string) => {
    setTouched(true)
    const original = normalizedOptions.find((o) => String(o.value) === next)
    if (original) onChange?.(original.value)
    else onChange?.(next === '' ? null : next)
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
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <SelectPrimitive.Root
        value={valueStr}
        disabled={disabled}
        onValueChange={handleChange}
      >
        <SelectPrimitive.Trigger className="relative flex w-full items-center justify-between rounded border border-border bg-card py-2 pl-3 pr-9 text-left text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
          <span
            className={cn(
              'block truncate',
              selectedLabel ? '' : 'text-muted-foreground',
            )}
          >
            {selectedLabel || placeholder || 'Select…'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {clearable && hasValue ? (
              <X
                className="size-4 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange?.(null)
                }}
              />
            ) : (
              <SelectPrimitive.Icon>
                <ChevronDown className="size-[18px] text-muted-foreground" />
              </SelectPrimitive.Icon>
            )}
          </span>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 max-h-60 w-(--radix-select-trigger-width) overflow-auto rounded-md bg-card py-1 shadow-lg ring-1 ring-border"
          >
            <SelectPrimitive.Viewport>
              {!normalizedOptions.length && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No options
                </div>
              )}
              {normalizedOptions.map((opt) => (
                <SelectPrimitive.Item
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-sm outline-none data-[highlighted]:bg-primary/10"
                >
                  <SelectPrimitive.ItemText
                    className={
                      opt.value === value
                        ? 'font-semibold text-primary'
                        : 'text-foreground'
                    }
                  >
                    {opt.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check className="size-4 text-primary" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {errorMessage ? (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
BaseSelect.displayName = 'BaseSelect'
