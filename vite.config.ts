import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'front-end',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        sidepanel: path.resolve(__dirname, 'front-end/sidepanel.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './front-end/src')
    }
  }
})
