import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'esnext',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'FilterBar',
      fileName: () => 'filterbar.js',
      formats: ['es'],
    },
    rollupOptions: {
      // @jogalanza/ui-kit-core is workspace-private and intentionally NOT external — it gets
      // bundled into this package's dist so consumers never need to know it exists.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'radix-ui',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
    },
    cssCodeSplit: false,
  },
})
