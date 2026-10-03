import * as React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

export interface RichTextEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write something...',
}: RichTextEditorProps) {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
  })

  // Force a re-render on every editor transaction so the toolbar's active states stay in sync
  // with the current selection (the React equivalent of the Vue composable's reactivity).
  const [, force] = React.useState(0)
  React.useEffect(() => {
    if (!editor) return
    const handler = () => force((n) => n + 1)
    editor.on('transaction', handler)
    return () => {
      editor.off('transaction', handler)
    }
  }, [editor])

  React.useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  const toolbarButtons: Array<{
    icon: string
    title: string
    command: () => void
    isActive?: () => boolean | undefined
  }> = [
    {
      icon: 'format_bold',
      title: 'Bold',
      command: () => editor?.chain().focus().toggleBold().run(),
      isActive: () => editor?.isActive('bold'),
    },
    {
      icon: 'format_italic',
      title: 'Italic',
      command: () => editor?.chain().focus().toggleItalic().run(),
      isActive: () => editor?.isActive('italic'),
    },
    {
      icon: 'format_underlined',
      title: 'Underline',
      command: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: () => editor?.isActive('underline'),
    },
    {
      icon: 'strikethrough_s',
      title: 'Strikethrough',
      command: () => editor?.chain().focus().toggleStrike().run(),
      isActive: () => editor?.isActive('strike'),
    },
    {
      icon: 'format_list_bulleted',
      title: 'Bullet List',
      command: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive('bulletList'),
    },
    {
      icon: 'format_list_numbered',
      title: 'Ordered List',
      command: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive('orderedList'),
    },
    {
      icon: 'link',
      title: 'Link',
      command: () => {
        const url = window.prompt('URL')
        if (url) editor?.chain().focus().setLink({ href: url }).run()
      },
      isActive: () => editor?.isActive('link'),
    },
    {
      icon: 'undo',
      title: 'Undo',
      command: () => editor?.chain().focus().undo().run(),
      isActive: () => false,
    },
    {
      icon: 'redo',
      title: 'Redo',
      command: () => editor?.chain().focus().redo().run(),
      isActive: () => false,
    },
  ]

  const setHeading = (level: string) => {
    if (level === 'p') {
      editor?.chain().focus().setParagraph().run()
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: Number(level) as 1 | 2 | 3 })
        .run()
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      {editor && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border px-3 py-2">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.title}
              type="button"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground${
                btn.isActive?.() ? ' bg-muted text-primary' : ''
              }`}
              title={btn.title}
              onClick={btn.command}
            >
              <i className="material-icons text-[18px]">{btn.icon}</i>
            </button>
          ))}

          <div className="mx-1 h-5 w-px bg-border" />

          <select
            className="h-8 rounded-md border border-border bg-card px-2 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={(e) => setHeading(e.target.value)}
          >
            <option value="p">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-3 py-2 min-h-[120px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-1 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-0.5 [&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
    </div>
  )
}
RichTextEditor.displayName = 'RichTextEditor'
