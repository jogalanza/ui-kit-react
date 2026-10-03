export type FilterType =
  | 'text'
  | 'number'
  | 'date'
  | 'date-range'
  | 'number-range'
  | 'toggle'
  | 'select'

export interface FilterOption {
  /** Required — property name in the filters object. */
  key: string
  label?: string
  type?: FilterType
  /** Shows the badge even when empty. */
  alwaysVisible?: boolean
  /** For `select`, allows multi-select. */
  multiple?: boolean
  /** For `select`, list of primitives or `{ value, label }` objects. */
  options?: Array<unknown>
  /** For `date-range` / `number-range`, the second bound field. */
  key2?: string
  defaultValue?: unknown
  defaultValue2?: unknown
  optionValue?: string
  optionLabel?: string
  trueLabel?: string
  falseLabel?: string
  [key: string]: unknown
}
