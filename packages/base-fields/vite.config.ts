import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'BaseFields',
      fileName: () => 'base-fields.js',
      cssFileName: 'base-fields',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'radix-ui',
        'lucide-react',
        '@tiptap/react',
        '@tiptap/starter-kit',
        '@tiptap/extension-underline',
        '@tiptap/extension-link',
        '@tiptap/extension-placeholder',
      ],
    },
    cssCodeSplit: false,
  },
})
