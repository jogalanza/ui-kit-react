import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'

export interface BaseRadioGroupProps {
  value?: any
  onChange?: (value: any) => void
  options?: any[]
  label?: string
  disabled?: boolean
  inline?: boolean
}

export function BaseRadioGroup({
  value = null,
  onChange,
  options = [],
  label = '',
  disabled = false,
  inline = true,
}: BaseRadioGroupProps) {
  const normalizedOptions = options.map((o) =>
    o !== null && typeof o === 'object'
      ? o
      : { label: String(o), value: o },
  )

  const valueStr = value === null || value === undefined ? undefined : String(value)

  const handleChange = (next: string) => {
    const original = normalizedOptions.find((o) => String(o.value) === next)
    onChange?.(original ? original.value : next)
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <RadioGroupPrimitive.Root
        value={valueStr}
        disabled={disabled}
        onValueChange={handleChange}
        className={inline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2'}
      >
        {normalizedOptions.map((opt) => (
          <label
            key={String(opt.value)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-foreground"
          >
            <RadioGroupPrimitive.Item
              value={String(opt.value)}
              className="flex size-4 items-center justify-center rounded-full border border-border bg-card data-[state=checked]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-primary" />
            </RadioGroupPrimitive.Item>
            <span>{opt.label}</span>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
    </div>
  )
}
BaseRadioGroup.displayName = 'BaseRadioGroup'
