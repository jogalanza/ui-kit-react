import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'DataTable',
      fileName: () => 'data-table.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'radix-ui',
        'lucide-react',
        '@radix-ui/react-icons',
        '@tanstack/react-table',
      ],
    },
    cssCodeSplit: false,
  },
})
