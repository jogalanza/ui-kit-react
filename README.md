# ui-kit-react

React port of [`jogalanza/ui-kit`](https://github.com/jogalanza/ui-kit), distributed as independent npm packages under the `@jogalanza` scope. npm workspaces monorepo:

```
packages/
  core-ui/      @jogalanza/react-ui-kit-core — shared shadcn React primitives (Badge, Button, Checkbox,
                Dialog, DropdownMenu, Input, NativeSelect, Popover, Separator, Switch, Table,
                Toaster), the cn() util, and the notify()/notifyError()/notifyResult() toast
                helpers. Dual-purpose: published directly (for projects that want the primitives
                on their own) AND bundled into other ui-kit packages at build time (e.g.
                filterbar), so those stay fully self-contained without their own peer dependency.
  filterbar/    @jogalanza/react-filterbar — badge-style popover filter bar.
  base-fields/  @jogalanza/react-base-fields — form-field components built on the same primitives.
  data-table/   @jogalanza/react-data-table — sortable, filterable, paginated table (@tanstack/react-table).
```

## Port mapping (Vue → React)

| Vue / shadcn-vue | React / shadcn |
| --- | --- |
| `reka-ui` primitives | `radix-ui` (`@radix-ui/react-*`) |
| `@lucide/vue` | `lucide-react` |
| `vue-sonner` | `sonner` |
| `@tanstack/vue-table` | `@tanstack/react-table` |
| `@radix-icons/vue` | `@radix-ui/react-icons` |
| `@tiptap/vue-3` | `@tiptap/react` |
| `v-model` | `value` / `checked` + `onChange` / `onCheckedChange` |

Tailwind utility classes and shadcn design tokens are preserved verbatim. Library-internal CSS
custom properties are the exception: `--reka-*` becomes `--radix-*` so the utilities keep working
against the React primitive.

## Adding a new component package

1. `packages/<name>/` with its own `package.json` and `vite.config.ts` (copy an existing package as a
   template — same `peerDependencies`, same `publishConfig`).
2. Add `"@jogalanza/react-ui-kit-core": "*"` to its `devDependencies` (not `dependencies` — it is bundled at
   build time) and import primitives from it, e.g. `import { Button, Popover } from '@jogalanza/react-ui-kit-core'`.
3. Build `core-ui` before any package that bundles it — its `main`/`exports` point at its own built
   `dist`, not raw source.

## Develop

```
npm install
npm run typecheck --workspace=packages/core-ui
npm run build --workspace=packages/core-ui
npm run build   # all packages, in order
```
