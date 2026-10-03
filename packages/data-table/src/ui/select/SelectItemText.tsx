import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'

export const SelectItemText = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemText>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>(({ ...props }, ref) => (
  <SelectPrimitive.ItemText
    ref={ref}
    data-slot="select-item-text"
    {...props}
  />
))
SelectItemText.displayName = 'SelectItemText'
