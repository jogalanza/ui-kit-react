import * as React from 'react'
import { BaseTreeContext, type TreeNodeData } from './BaseTree'

export interface BaseTreeNodeProps {
  node: TreeNodeData
  depth?: number
}

export function BaseTreeNode({ node, depth = 0 }: BaseTreeNodeProps) {
  const ctx = React.useContext(BaseTreeContext)
  if (!ctx) throw new Error('BaseTreeNode must be used within a BaseTree')

  const hasChildren = !!(node.children && node.children.length)
  const isExpanded = ctx.expandedIds.has(node.id)
  const isVisible =
    ctx.filterVisible === null || ctx.filterVisible.has(node.id)
  const state = ctx.nodeState(node)
  const tickable = ctx.isTickable(node)

  if (!isVisible) return null

  const setIndeterminate = (el: HTMLInputElement | null) => {
    if (el) el.indeterminate = state === 'indeterminate'
  }

  const onRowClick = () => {
    if (hasChildren) ctx.toggleExpand(node)
  }

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className="flex cursor-pointer select-none items-center gap-1 rounded py-1 pr-1 hover:bg-muted"
        style={{ paddingLeft: `${depth * 18}px` }}
        onClick={onRowClick}
      >
        {hasChildren ? (
          <button
            type="button"
            className="flex size-4 shrink-0 items-center justify-center text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation()
              ctx.toggleExpand(node)
            }}
          >
            <i
              className={`material-icons text-[16px] transition-transform${isExpanded ? ' rotate-90' : ''}`}
            >
              chevron_right
            </i>
          </button>
        ) : (
          <span className="inline-block size-4 shrink-0"></span>
        )}

        {tickable ? (
          <input
            type="checkbox"
            className="size-4 shrink-0 rounded border-border accent-primary focus:ring-2 focus:ring-primary disabled:cursor-default disabled:opacity-60"
            checked={state === 'checked'}
            disabled={ctx.isDisabled()}
            ref={setIndeterminate}
            onClick={(e) => {
              e.stopPropagation()
              ctx.toggleNode(node)
            }}
          />
        ) : (
          <span className="inline-block size-4 shrink-0"></span>
        )}

        <span className="truncate text-sm text-foreground">{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <ul role="group">
          {node.children!.map((child) => (
            <BaseTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}
BaseTreeNode.displayName = 'BaseTreeNode'
