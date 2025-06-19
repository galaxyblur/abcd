import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
    open: false
  },
  publicDir: '../content',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        dataViz: resolve(__dirname, 'src/data-viz.html'),
        post: resolve(__dirname, 'src/post.html')
      }
    }
  }
})