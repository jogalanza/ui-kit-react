import * as React from 'react'

export const BaseBadge = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
    {children}
  </span>
)
BaseBadge.displayName = 'BaseBadge'
