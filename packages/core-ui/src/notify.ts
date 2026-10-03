import { toast } from 'sonner'

const typeMap: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
  positive: 'success',
  negative: 'error',
  warning: 'warning',
  info: 'info',
}

export interface NotifyOptions {
  message: string
  type?: string
}

export function notify({ message, type = 'info' }: NotifyOptions) {
  const sonnerType = typeMap[type] || 'info'
  const fn = (toast as any)[sonnerType] || toast.info
  fn(message)
}

export const notifyError = (err: any, fallback?: string) =>
  toast.error(err?.response?.data?.message || fallback)

export const notifyResult = (data: any, fallback?: string) => {
  if (data?.success === false) toast.error(data.message || fallback)
  else toast.success(data?.message || 'Done.')
}
