import * as React from 'react'
import { Paperclip } from 'lucide-react'

export interface BaseFileInputProps {
  value?: File[] | null
  onChange?: (files: File[] | null) => void
  label?: string
  accept?: string
  multiple?: boolean
  clearable?: boolean
}

export function BaseFileInput({
  value = null,
  onChange,
  label = '',
  accept = '',
  multiple = false,
  clearable = false,
}: BaseFileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const files = value || []

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Array.from(e.target.files || [])
    onChange?.(next)
  }

  const removeFile = (idx: number) => {
    const next = files.filter((_, i) => i !== idx)
    onChange?.(next.length ? next : null)
  }

  const clearAll = () => {
    if (inputRef.current) inputRef.current.value = ''
    onChange?.(null)
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div
        className="flex min-h-[42px] w-full cursor-pointer flex-wrap items-center gap-2 rounded border border-border bg-card px-3 py-2 text-sm text-foreground hover:border-primary"
        onClick={() => inputRef.current?.click()}
      >
        <Paperclip className="size-4 shrink-0 text-muted-foreground" />
        {files && files.length ? (
          <>
            {files.map((file, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {file.name}
                <i
                  className="material-icons cursor-pointer text-[14px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(idx)
                  }}
                >
                  close
                </i>
              </span>
            ))}
          </>
        ) : (
          <span className="text-muted-foreground">
            Choose file{multiple ? '(s)' : ''}…
          </span>
        )}

        {clearable && files?.length ? (
          <i
            className="material-icons ml-auto cursor-pointer text-[16px] text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation()
              clearAll()
            }}
          >
            clear
          </i>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={onChangeHandler}
      />
    </div>
  )
}
BaseFileInput.displayName = 'BaseFileInput'
