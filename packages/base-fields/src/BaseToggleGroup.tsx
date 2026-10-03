import * as React from 'react'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

export interface BaseToggleGroupProps {
  value?: any
  onChange?: (value: any) => void
  options?: any[]
  disabled?: boolean
}

export function BaseToggleGroup({
  value = null,
  onChange,
  options = [],
  disabled = false,
}: BaseToggleGroupProps) {
  const normalizedOptions = options.map((o) =>
    o !== null && typeof o === 'object'
      ? o
      : { label: String(o), value: o },
  )

  const valueStr = value === null || value === undefined ? undefined : String(value)

  const handleChange = (next: string) => {
    if (!next) return
    const original = normalizedOptions.find((o) => String(o.value) === next)
    onChange?.(original ? original.value : next)
  }

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={valueStr}
      disabled={disabled}
      onValueChange={handleChange}
      className="inline-flex w-full overflow-hidden rounded-md border border-primary"
    >
      {normalizedOptions.map((opt) => (
        <ToggleGroupPrimitive.Item
          key={String(opt.value)}
          value={String(opt.value)}
          className="flex-1 px-3 py-1.5 text-center text-sm text-primary transition-colors data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-primary/10 data-[state=on]:hover:bg-primary/90 focus-visible:outline-none"
        >
          {opt.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
BaseToggleGroup.displayName = 'BaseToggleGroup'
