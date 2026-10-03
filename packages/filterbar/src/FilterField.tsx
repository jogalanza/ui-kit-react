import * as React from 'react'
import {
  Button,
  Checkbox,
  Input,
  NativeSelect,
  NativeSelectOption,
} from '@jogalanza/ui-kit-core'
import type { FilterOption } from './types'

export interface FilterFieldProps {
  opt: FilterOption
  value: unknown
  value2?: unknown
  onChange: (value: unknown) => void
  onChangeValue2?: (value: unknown) => void
  onApply: () => void
}

export function FilterField({
  opt,
  value,
  value2,
  onChange,
  onChangeValue2,
  onApply,
}: FilterFieldProps) {
  const selectedValues = Array.isArray(value) ? value : []

  const normalizedOptions = (opt.options || []).map((raw) => {
    if (raw !== null && typeof raw === 'object') {
      const r = raw as Record<string, unknown>
      return {
        value: r[opt.optionValue ?? opt.optionLabel ?? 'value'],
        label: (r[opt.optionLabel ?? 'label'] ?? r[opt.optionValue]) as React.ReactNode,
      }
    }
    return { value: raw, label: raw as React.ReactNode }
  })

  const toggleValue = (v: unknown) => {
    const next = selectedValues.includes(v)
      ? selectedValues.filter((x) => x !== v)
      : [...selectedValues, v]
    onChange(next)
  }

  const applyOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onApply()
  }

  return (
    <div className="space-y-2">
      {(opt.type === 'text' || opt.type === 'number') && (
        <Input
          value={(value as string) ?? ''}
          type={opt.type === 'number' ? 'number' : 'text'}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={applyOnEnter}
        />
      )}

      {opt.type === 'date' && (
        <Input
          value={(value as string) ?? ''}
          type="date"
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={applyOnEnter}
        />
      )}

      {opt.type === 'date-range' && (
        <div className="flex items-center gap-2">
          <Input
            value={(value as string) ?? ''}
            type="date"
            className="flex-1"
            autoFocus
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="text-muted-foreground text-xs">to</span>
          <Input
            value={(value2 as string) ?? ''}
            type="date"
            className="flex-1"
            onChange={(e) => onChangeValue2?.(e.target.value)}
          />
        </div>
      )}

      {opt.type === 'toggle' && (
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={!!value}
            onCheckedChange={(checked) => onChange(checked)}
          />
          {opt.label}
        </label>
      )}

      {opt.type === 'select' && !opt.multiple && (
        <NativeSelect
          className="w-full"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <NativeSelectOption value="">All</NativeSelectOption>
          {normalizedOptions.map((o) => (
            <NativeSelectOption key={String(o.value)} value={o.value as string}>
              {o.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      )}

      {opt.type === 'select' && opt.multiple && (
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-md border p-2">
          {normalizedOptions.length === 0 && (
            <div className="text-muted-foreground text-xs">No options.</div>
          )}
          {normalizedOptions.map((o) => (
            <label
              key={String(o.value)}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                checked={selectedValues.includes(o.value)}
                onCheckedChange={() => toggleValue(o.value)}
              />
              {o.label}
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onApply}>
          Apply
        </Button>
      </div>
    </div>
  )
}
