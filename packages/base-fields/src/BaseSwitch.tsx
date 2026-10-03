import * as React from 'react'
import { Switch as SwitchPrimitive } from 'radix-ui'

export interface BaseSwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

export function BaseSwitch({
  checked = false,
  onChange,
  label = '',
}: BaseSwitchProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={(v) => onChange?.(v)}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      >
        <SwitchPrimitive.Thumb className="inline-block h-4 w-4 transform rounded-full shadow transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-background" />
      </SwitchPrimitive.Root>
      {label && (
        <label
          className="cursor-pointer text-sm text-muted-foreground"
          onClick={() => onChange?.(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  )
}
BaseSwitch.displayName = 'BaseSwitch'
