import * as React from 'react'
import { cn } from '../lib/utils'
import { TableCell } from './TableCell'
import { TableRow } from './TableRow'

export type TableEmptyProps = React.TdHTMLAttributes<HTMLTableCellElement>

export const TableEmpty = ({
  className,
  children,
  colSpan = 1,
  ...props
}: TableEmptyProps) => (
  <TableRow>
    <TableCell
      colSpan={colSpan}
      className={cn(
        'p-4 whitespace-nowrap align-middle text-sm text-foreground',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center py-10">{children}</div>
    </TableCell>
  </TableRow>
)
TableEmpty.displayName = 'TableEmpty'
