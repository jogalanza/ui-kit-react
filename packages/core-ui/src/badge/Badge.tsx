import * as React from 'react'
import { Slot } from 'radix-ui'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { badgeVariants } from './index'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = (asChild ? Slot.Root : 'span') as React.ElementType
    return (
      <Comp
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  },
)
Badge.displayName = 'Badge'
