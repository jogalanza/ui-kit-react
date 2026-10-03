import * as React from 'react'
import { Image as ImageIcon, User } from 'lucide-react'
import { cn } from '@jogalanza/react-ui-kit-core'

export interface BaseImageFieldProps {
  value?: any
  onChange?: (file: File) => void
  forTableDisplay?: boolean
  cssClass?: string
  editable?: boolean
  name?: string
  append?: React.ReactNode
}

export function BaseImageField({
  value = null,
  onChange,
  forTableDisplay = false,
  cssClass = '',
  editable = true,
  name = '',
  append,
}: BaseImageFieldProps) {
  const fileInput = React.useRef<HTMLInputElement>(null)
  const [imgError, setImgError] = React.useState(false)

  const trigger = () => {
    if (!editable) return
    fileInput.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onChange?.(file)
  }

  if (forTableDisplay) {
    return (
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-muted',
          cssClass,
        )}
      >
        {value && !imgError ? (
          <img
            src={value}
            className="size-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <User className="size-6 text-muted-foreground" />
        )}
      </span>
    )
  }

  return (
    <div className="relative">
      {value ? (
        <img
          src={value}
          className={cn('w-full cursor-pointer object-fill', cssClass)}
          onClick={(e) => {
            e.stopPropagation()
            trigger()
          }}
        />
      ) : (
        <div
          className={cn(
            'flex aspect-video w-full cursor-pointer items-center justify-center rounded border border-dashed border-border bg-background text-muted-foreground',
            cssClass,
          )}
          onClick={(e) => {
            e.stopPropagation()
            trigger()
          }}
        >
          <ImageIcon className="size-8" />
        </div>
      )}
      {append}
      <input
        ref={fileInput}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  )
}
BaseImageField.displayName = 'BaseImageField'
