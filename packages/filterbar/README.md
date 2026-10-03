# @jogalanza/filterbar

A badge-style popover filter bar for React, built on [Radix UI](https://www.radix-ui.com/) primitives and Tailwind utility classes. React port of the Vue `@jogalanza/filterbar`.

## Install

Add a `.npmrc` in the consuming project pointing the `@jogalanza` scope at GitHub Packages:

```
@jogalanza:registry=https://npm.pkg.github.com
```

Then:

```
npm install @jogalanza/filterbar
```

## Usage

```tsx
import { useState } from 'react'
import { FilterBar } from '@jogalanza/filterbar'

const filterOpts = [
  { key: 'status', label: 'Status', type: 'select', alwaysVisible: true, options: ['Open', 'Closed'] },
  { key: 'search', label: 'Search', type: 'text' },
]

export function Example() {
  const [filters, setFilters] = useState({})
  return <FilterBar value={filters} onChange={setFilters} opts={filterOpts} />
}
```

The Vue `v-model="filters"` maps to `value={filters}` + `onChange={setFilters}` in React.

### Filter option shape

| field | type | notes |
| --- | --- | --- |
| `key` | string | required, property name in the filters object |
| `label` | string | display label |
| `type` | `'text' \| 'number' \| 'date' \| 'date-range' \| 'number-range' \| 'toggle' \| 'select'` | |
| `alwaysVisible` | boolean | shows the badge even when empty |
| `multiple` | boolean | for `select`, allows multi-select |
| `options` | array | for `select`, list of primitives or `{ value, label }` objects |
| `key2` / `defaultValue2` | string | for `date-range`, the second bound field |

## Peer dependencies

This package expects the host project to already provide: `react`, `react-dom`, `radix-ui`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`.

## Styling

FilterBar uses Tailwind utility classes and shadcn design tokens (`bg-popover`, `text-muted-foreground`, etc.) rather than scoped CSS. Make sure your Tailwind `content` config includes this package so its classes aren't purged, e.g.:

```js
content: ['./src/**/*.{ts,tsx,js,jsx}', './node_modules/@jogalanza/filterbar/**/*.js']
```

## Develop

```
npm install
npm run build
```
