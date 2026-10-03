import * as React from 'react'

export interface BaseChipInputProps {
  // A plain array of strings — there is no separate "catalog" to pick from, every value is
  // free-form user input, unlike BaseCombobox which selects from a known options list.
  value?: string[]
  onChange?: (next: string[]) => void
  label?: string
  placeholder?: string
  hint?: string
}

export function BaseChipInput({
  value = [],
  onChange,
  label = '',
  placeholder = 'Type and press Enter',
  hint = '',
}: BaseChipInputProps) {
  const [draft, setDraft] = React.useState('')

  const commit = () => {
    const val = draft.trim()
    setDraft('')
    if (!val || value.includes(val)) return
    onChange?.([...value, val])
  }

  const removeAt = (idx: number) => {
    const next = [...value]
    next.splice(idx, 1)
    onChange?.(next)
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div className="flex min-h-[42px] w-full flex-wrap items-center gap-1 rounded border border-border bg-card px-2 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
        {value.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
          >
            {item}
            <i
              className="material-icons cursor-pointer text-[12px]"
              onClick={() => removeAt(idx)}
            >
              close
            </i>
          </span>
        ))}
        <input
          value={draft}
          className="min-w-[80px] flex-1 border-0 bg-transparent p-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          placeholder={value?.length ? '' : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commit()
            }
          }}
          onBlur={commit}
        />
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
BaseChipInput.displayName = 'BaseChipInput'
