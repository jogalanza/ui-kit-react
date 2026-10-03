import * as React from 'react'
import { BaseTreeNode } from './BaseTreeNode'

export interface TreeNodeData {
  id: string | number
  label?: string
  children?: TreeNodeData[]
  tickable?: boolean
  [key: string]: any
}

export interface BaseTreeContextValue {
  expandedIds: Set<string | number>
  filterVisible: Set<string | number> | null
  isLeaf: (node: TreeNodeData) => boolean
  isTickable: (node: TreeNodeData) => boolean
  isDisabled: () => boolean
  nodeState: (node: TreeNodeData) => 'checked' | 'unchecked' | 'indeterminate'
  toggleNode: (node: TreeNodeData) => void
  toggleExpand: (node: TreeNodeData) => void
}

export const BaseTreeContext = React.createContext<BaseTreeContextValue | null>(
  null,
)

export interface BaseTreeProps {
  nodes?: TreeNodeData[]
  value?: Array<string | number>
  onChange?: (next: Array<string | number>) => void
  strategy?: 'leaf' | 'strict'
  disabled?: boolean
  // Case-insensitive label substring filter. A node stays visible if it or any descendant
  // matches; branches containing a match are auto-expanded so results aren't hidden.
  filter?: string
}

export function BaseTree({
  nodes = [],
  value = [],
  onChange,
  strategy = 'leaf',
  disabled = false,
  filter = '',
}: BaseTreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string | number>>(
    () => new Set(),
  )

  const isLeaf = (node: TreeNodeData) =>
    !node.children || node.children.length === 0
  const isTickable = (node: TreeNodeData) => node.tickable !== false

  const collectLeafIds = (node: TreeNodeData): Array<string | number> => {
    if (isLeaf(node)) return isTickable(node) ? [node.id] : []
    return (node.children || []).flatMap(collectLeafIds)
  }

  const nodeState = (
    node: TreeNodeData,
  ): 'checked' | 'unchecked' | 'indeterminate' => {
    if (strategy === 'strict') {
      return value.includes(node.id) ? 'checked' : 'unchecked'
    }
    if (isLeaf(node)) return value.includes(node.id) ? 'checked' : 'unchecked'
    const leafIds = collectLeafIds(node)
    if (leafIds.length === 0) return 'unchecked'
    const tickedCount = leafIds.filter((id) => value.includes(id)).length
    if (tickedCount === 0) return 'unchecked'
    if (tickedCount === leafIds.length) return 'checked'
    return 'indeterminate'
  }

  const toggleNode = (node: TreeNodeData) => {
    if (disabled || !isTickable(node)) return

    if (strategy === 'strict' || isLeaf(node)) {
      const set = new Set(value)
      if (set.has(node.id)) set.delete(node.id)
      else set.add(node.id)
      onChange?.([...set])
      return
    }

    // Branch node ('leaf' strategy only): clicking a fully-checked branch clears all its leaves;
    // clicking an unchecked or partially-checked (indeterminate) branch ticks all of them — the
    // same convention native tri-state checkboxes and Quasar's leaf-strategy trees use.
    const leafIds = collectLeafIds(node)
    const set = new Set(value)
    if (nodeState(node) === 'checked') {
      leafIds.forEach((id) => set.delete(id))
    } else {
      leafIds.forEach((id) => set.add(id))
    }
    onChange?.([...set])
  }

  const toggleExpand = (node: TreeNodeData) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(node.id)) next.delete(node.id)
      else next.add(node.id)
      return next
    })
  }

  const norm = (s: any) => (s || '').toLowerCase()

  // null = no active filter (respect whatever the user has manually expanded/collapsed).
  // Set = the ids that should be visible while filtering. autoExpanded holds the branch ids
  // that must be shown expanded so matches aren't hidden.
  const { filterVisible, autoExpanded } = React.useMemo(() => {
    const term = norm(filter)
    if (!term) return { filterVisible: null as Set<string | number> | null, autoExpanded: new Set<string | number>() }

    const visible = new Set<string | number>()
    const expanded = new Set<string | number>()
    const walk = (node: TreeNodeData): boolean => {
      const selfMatch = norm(node.label).includes(term)
      let childMatch = false
      for (const child of node.children || []) {
        if (walk(child)) childMatch = true
      }
      if (selfMatch || childMatch) {
        visible.add(node.id)
        if (childMatch) expanded.add(node.id)
        return true
      }
      return false
    }
    for (const node of nodes) walk(node)
    return { filterVisible: visible, autoExpanded: expanded }
    // expandedIds intentionally excluded: auto-expansion is derived from the filter alone.
  }, [filter, nodes])

  const effectiveExpanded = React.useMemo(() => {
    if (autoExpanded.size === 0) return expandedIds
    return new Set([...expandedIds, ...autoExpanded])
  }, [expandedIds, autoExpanded])

  const ctx: BaseTreeContextValue = {
    expandedIds: effectiveExpanded,
    filterVisible,
    isLeaf,
    isTickable,
    isDisabled: () => disabled,
    nodeState,
    toggleNode,
    toggleExpand,
  }

  return (
    <BaseTreeContext.Provider value={ctx}>
      <ul className="base-tree" role="tree">
        {nodes.map((node) => (
          <BaseTreeNode key={node.id} node={node} depth={0} />
        ))}
      </ul>
    </BaseTreeContext.Provider>
  )
}
BaseTree.displayName = 'BaseTree'
