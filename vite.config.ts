const { resolve } = require('path')
import { defineConfig } from 'vite'
// ...
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'nested/index.html')
      }
    }
  },
  define: {
    'process.env': {}
  }
})