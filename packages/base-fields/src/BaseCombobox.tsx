import * as React from 'react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { X } from 'lucide-react'

export interface BaseComboboxOption {
  label: string
  value: any
}

export interface BaseComboboxProps {
  // Array of raw values (the multi-select's current selection).
  value?: any[]
  onChange?: (value: any[]) => void
  // { label, value } objects — the full set of selectable options.
  options?: BaseComboboxOption[]
  label?: string
  placeholder?: string
  hint?: string
  // Whether typing a value not in `options` offers a "+ Create ..." row.
  allowCreate?: boolean
  onCreate?: (value: string) => void
}

export function BaseCombobox({
  value = [],
  onChange,
  options = [],
  label = '',
  placeholder = '',
  hint = '',
  allowCreate = false,
  onCreate,
}: BaseComboboxProps) {
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const labelFor = (val: any) =>
    options.find((o) => o.value === val)?.label ?? val

  const removeValue = (val: any) => {
    onChange?.(value.filter((v) => v !== val))
  }

  const addValue = (val: any) => {
    if (!value.includes(val)) onChange?.([...value, val])
    setQuery('')
  }

  const q = query.trim().toLowerCase()
  const unselected = options.filter((o) => !value.includes(o.value))
  const filteredOptions = !q
    ? unselected
    : unselected.filter((o) => o.label.toLowerCase().includes(q))

  // Only offer "create" when the typed text doesn't already exactly match an
  // existing option — otherwise selecting that option is the obvious action.
  const showCreate =
    allowCreate &&
    !!query.trim() &&
    !options.some((o) => o.label.toLowerCase() === q)

  const createFromQuery = () => {
    if (!query.trim()) return
    onCreate?.(query.trim())
    setQuery('')
  }

  const onEnter = () => {
    if (showCreate) createFromQuery()
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <PopoverPrimitive.Root
        open={open && (filteredOptions.length > 0 || showCreate)}
        onOpenChange={setOpen}
      >
        <PopoverPrimitive.Anchor asChild>
          <div className="flex min-h-[42px] w-full flex-wrap items-center gap-1 rounded border border-border bg-card px-2 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
            {value.map((val) => (
              <span
                key={String(val)}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {labelFor(val)}
                <X
                  className="size-3.5 cursor-pointer"
                  onClick={() => removeValue(val)}
                />
              </span>
            ))}
            <PopoverPrimitive.Trigger asChild>
              <input
                value={query}
                className="min-w-[80px] flex-1 border-0 bg-transparent p-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                placeholder={value?.length ? '' : placeholder}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setOpen(true)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onEnter()
                  }
                }}
              />
            </PopoverPrimitive.Trigger>
          </div>
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="z-10 mt-1 max-h-60 w-(--radix-popover-trigger-width) overflow-auto rounded-md bg-card py-1 shadow-lg ring-1 ring-border focus:outline-none"
          >
            {filteredOptions.map((opt) => (
              <div
                key={String(opt.value)}
                className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm data-[highlighted]:bg-primary/10 data-[highlighted]:outline-none"
                onClick={() => addValue(opt.value)}
              >
                <span className="text-foreground">{opt.label}</span>
              </div>
            ))}
            {showCreate && (
              <div
                className="cursor-pointer px-3 py-2 text-sm text-primary hover:bg-primary/10"
                onClick={createFromQuery}
              >
                + Create "{query}"
              </div>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
BaseCombobox.displayName = 'BaseCombobox'
