# @jogalanza/data-table

A sortable, filterable, paginated data table built on [@tanstack/react-table](https://tanstack.com/table/latest) and shadcn/Radix primitives — column visibility toggle, page-size selector, and pagination controls included. React port of the Vue `@jogalanza/data-table`.

## Install

```
npm install @jogalanza/data-table
```

## Usage

```tsx
import { DataTable } from '@jogalanza/data-table'

const data = [
  { id: 1, name: 'Widget A', status: 'Active' },
  { id: 2, name: 'Widget B', status: 'Archived' },
]

// Standard TanStack column defs: https://tanstack.com/table/latest/docs/guide/column-defs
const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

export function Example() {
  return <DataTable data={data} columns={columns} enableRowSelection />
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `Array` | required | Row data. |
| `columns` | `Array` | required | TanStack column defs. |
| `enableRowSelection` | `Boolean` | `false` | Prepends a select-all/select-row checkbox column. |
| `pageSize` | `Number` | `10` | Initial rows per page. |
| `pageSizeOptions` | `Array` | `[10, 20, 30, 40, 50]` | Options in the rows-per-page selector. |
| `onRowSelectionChange` | `(selection) => void` | — | Called with TanStack's row-selection state object when `enableRowSelection` is set. |

The underlying TanStack table instance is exposed via `ref` (`table`), the React equivalent of the Vue
component's `defineExpose({ table })`.
