import * as React from 'react'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'
import { cn } from '../lib/utils'

export const Toaster = ({
  className,
  position = 'top-center',
  richColors = true,
  ...props
}: ToasterProps) => (
  <SonnerToaster
    position={position}
    richColors={richColors}
    className={cn('toaster group', className)}
    style={
      {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius)',
      } as React.CSSProperties
    }
    {...props}
  />
)
Toaster.displayName = 'Toaster'
