import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { cn } from '@jogalanza/react-ui-kit-core'

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    {children ?? <ChevronDownIcon className="size-4" />}
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = 'SelectScrollDownButton'
