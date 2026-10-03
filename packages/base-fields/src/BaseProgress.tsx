import { Progress as ProgressPrimitive } from 'radix-ui'

export function BaseProgress() {
  return (
    <ProgressPrimitive.Root
      value={null}
      className="relative h-1 w-full overflow-hidden rounded-full bg-primary/16"
    >
      <ProgressPrimitive.Indicator className="absolute inset-y-0 left-0 w-1/3 animate-[base-progress-indeterminate_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
    </ProgressPrimitive.Root>
  )
}
BaseProgress.displayName = 'BaseProgress'
