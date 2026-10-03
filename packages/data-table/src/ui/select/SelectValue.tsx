import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'

export const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ ...props }, ref) => (
  <SelectPrimitive.Value ref={ref} data-slot="select-value" {...props} />
))
SelectValue.displayName = 'SelectValue'
