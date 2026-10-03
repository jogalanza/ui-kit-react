import * as React from 'react'
import { cn } from '../lib/utils'

export const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => (
  <option
    ref={ref}
    data-slot="native-select-option"
    className={cn('bg-popover text-popover-foreground', className)}
    {...props}
  />
))
NativeSelectOption.displayName = 'NativeSelectOption'
