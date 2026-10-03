import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { cn } from '../lib/utils'
import { Button } from '../button'

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean
}

export const DialogFooter = ({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogFooterProps) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      'flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  >
    {children}
    {showCloseButton && (
      <DialogPrimitive.Close asChild>
        <Button variant="outline">Close</Button>
      </DialogPrimitive.Close>
    )}
  </div>
)
DialogFooter.displayName = 'DialogFooter'
