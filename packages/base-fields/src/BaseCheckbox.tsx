import * as React from 'react'
import { cn } from '@jogalanza/ui-kit-core'

export interface BaseCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  // Native tooltip shown on hover — the closest headless equivalent to Quasar's q-tooltip
  // for the icon-only/label-only checkboxes in dense table toolbars.
  title?: string
  children?: React.ReactNode
}

export function BaseCheckbox({
  checked = false,
  onChange,
  label = '',
  disabled = false,
  title = '',
  children,
}: BaseCheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-foreground',
        disabled ? 'cursor-default' : 'cursor-pointer',
      )}
      title={title}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary disabled:cursor-default disabled:opacity-70"
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label && <span>{label}</span>}
      {children}
    </label>
  )
}
BaseCheckbox.displayName = 'BaseCheckbox'
