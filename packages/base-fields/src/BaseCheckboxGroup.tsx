import * as React from 'react'
import { BaseCheckbox } from './BaseCheckbox'

export interface BaseCheckboxGroupProps {
  value?: any[]
  onChange?: (next: any[]) => void
  options?: any[]
  label?: string
  inline?: boolean
}

export function BaseCheckboxGroup({
  value = [],
  onChange,
  options = [],
  label = '',
  inline = false,
}: BaseCheckboxGroupProps) {
  const normalizedOptions = options.map((o) =>
    o !== null && typeof o === 'object'
      ? o
      : { label: String(o), value: o },
  )

  const toggle = (v: any, checked: boolean) => {
    const next = checked
      ? [...value, v]
      : value.filter((x) => x !== v)
    onChange?.(next)
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div className={inline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2'}>
        {normalizedOptions.map((opt) => (
          <BaseCheckbox
            key={String(opt.value)}
            checked={value.includes(opt.value)}
            label={opt.label}
            onChange={(checked) => toggle(opt.value, checked)}
          />
        ))}
      </div>
    </div>
  )
}
BaseCheckboxGroup.displayName = 'BaseCheckboxGroup'
