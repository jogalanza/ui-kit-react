import * as React from 'react'
import { Plus, X } from 'lucide-react'
import {
  Badge,
  NativeSelect,
  NativeSelectOption,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@jogalanza/ui-kit-core'
import { FilterField } from './FilterField'
import type { FilterOption } from './types'

const ADD_KEY = '__jogalanza_add__'

export type Filters = Record<string, any>

export interface FilterBarProps {
  value?: Filters
  opts?: FilterOption[]
  onChange?: (next: Filters) => void
}

const emptyValueFor = (opt: FilterOption) => {
  if (opt.defaultValue !== undefined) return opt.defaultValue
  if (opt.type === 'select' && opt.multiple) return []
  if (opt.type === 'toggle') return false
  return ''
}

const optValue = (opt: FilterOption, raw: any) =>
  raw !== null && typeof raw === 'object'
    ? raw[opt.optionValue ?? opt.optionLabel ?? 'value']
    : raw

const optLabel = (opt: FilterOption, raw: any) =>
  raw !== null && typeof raw === 'object'
    ? (raw[opt.optionLabel ?? 'label'] ?? raw[opt.optionValue])
    : raw

const labelForValue = (opt: FilterOption, rawValue: any) => {
  const found = (opt.options || []).find(
    (o) => String(optValue(opt, o)) === String(rawValue),
  )
  return found !== undefined ? optLabel(opt, found) : rawValue
}

const truncate = (text: any, max = 24) =>
  text != null && String(text).length > max
    ? `${String(text).slice(0, max)}…`
    : text

const displayValue = (opt: FilterOption, value: Filters) => {
  const v = value[opt.key]

  if (opt.type === 'date-range') {
    const v2 = value[opt.key2 as string]
    if (!v && !v2) return 'Any'
    return `${v || '…'} – ${v2 || '…'}`
  }
  if (opt.type === 'toggle') {
    return v ? opt.trueLabel || 'Yes' : opt.falseLabel || 'No'
  }
  if (opt.type === 'select') {
    if (Array.isArray(v)) {
      if (v.length === 0) return 'All'
      return truncate(
        v.map((rawValue) => labelForValue(opt, rawValue)).join(', '),
      )
    }
    return v === undefined || v === null || v === ''
      ? 'All'
      : truncate(labelForValue(opt, v))
  }
  return v === undefined || v === null || v === '' ? 'Any' : truncate(v)
}

export function FilterBar({ value = {}, opts = [], onChange }: FilterBarProps) {
  const [openKey, setOpenKey] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState<any>(null)
  const [draft2, setDraft2] = React.useState<any>(null)
  const [addOpt, setAddOpt] = React.useState<FilterOption | null>(null)

  const isActive = (opt: FilterOption) => {
    if (opt.type === 'date-range') {
      return !!value[opt.key] || !!value[opt.key2 as string]
    }
    const v = value[opt.key]
    if (Array.isArray(v)) return v.length > 0
    if (opt.type === 'toggle') {
      return v !== undefined && v !== null && v !== emptyValueFor(opt)
    }
    return v !== undefined && v !== null && v !== ''
  }

  const activeOpts = opts.filter((o) => o.alwaysVisible || isActive(o))
  const availableOpts = opts.filter((o) => !activeOpts.includes(o))

  const onOpenChange = (opt: FilterOption, open: boolean) => {
    if (open) {
      setDraft(value[opt.key] ?? emptyValueFor(opt))
      setDraft2(
        opt.key2 !== undefined
          ? (value[opt.key2] ?? opt.defaultValue2 ?? '')
          : null,
      )
      setOpenKey(opt.key)
    } else if (openKey === opt.key) {
      setOpenKey(null)
    }
  }

  const onAddOpenChange = (open: boolean) => {
    if (open) {
      setAddOpt(null)
      setDraft(null)
      setDraft2(null)
      setOpenKey(ADD_KEY)
    } else if (openKey === ADD_KEY) {
      setOpenKey(null)
    }
  }

  const onPickAddField = (key: string) => {
    const next = opts.find((o) => o.key === key) ?? null
    setAddOpt(next)
    if (next) {
      setDraft(emptyValueFor(next))
      setDraft2(next.key2 !== undefined ? (next.defaultValue2 ?? '') : null)
    }
  }

  const applyDraft = (opt: FilterOption) => {
    const next = { ...value }

    if (opt.type === 'date-range') {
      next[opt.key] = draft
      next[opt.key2 as string] = draft2
    } else {
      next[opt.key] = draft
    }

    onChange?.(next)
    setOpenKey(null)
  }

  const clearFilter = (opt: FilterOption) => {
    const next = { ...value }
    next[opt.key] = emptyValueFor(opt)
    if (opt.key2 !== undefined) next[opt.key2] = opt.defaultValue2 ?? ''
    onChange?.(next)
    if (openKey === opt.key) setOpenKey(null)
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {activeOpts.map((opt) => (
        <Popover
          key={opt.key}
          open={openKey === opt.key}
          onOpenChange={(v) => onOpenChange(opt, v)}
        >
          <PopoverTrigger asChild>
            <Badge
              variant="outline"
              className="cursor-pointer select-none gap-1 py-1 pl-2.5 pr-1.5 h-auto"
            >
              <span className="font-medium">{opt.label}:</span>
              <span className="max-w-40 truncate">
                {displayValue(opt, value)}
              </span>
              {!opt.alwaysVisible && (
                <button
                  type="button"
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFilter(opt)
                  }}
                >
                  <X className="size-3" />
                </button>
              )}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <FilterField
              opt={opt}
              value={draft}
              value2={draft2}
              onChange={setDraft}
              onChangeValue2={setDraft2}
              onApply={() => applyDraft(opt)}
            />
          </PopoverContent>
        </Popover>
      ))}

      {availableOpts.length > 0 && (
        <Popover
          open={openKey === ADD_KEY}
          onOpenChange={onAddOpenChange}
        >
          <PopoverTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer select-none gap-1 py-1 h-auto"
            >
              <Plus className="size-3" /> Add Filter
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="space-y-2">
              <NativeSelect
                className="w-full"
                value={addOpt?.key ?? ''}
                onChange={(e) => onPickAddField(e.target.value)}
              >
                <NativeSelectOption value="" disabled>
                  Select field…
                </NativeSelectOption>
                {availableOpts.map((o) => (
                  <NativeSelectOption key={o.key} value={o.key}>
                    {o.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {addOpt && (
                <FilterField
                  opt={addOpt}
                  value={draft}
                  value2={draft2}
                  onChange={setDraft}
                  onChangeValue2={setDraft2}
                  onApply={() => applyDraft(addOpt)}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
