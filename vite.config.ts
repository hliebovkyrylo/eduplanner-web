import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@icons'     : path.resolve(__dirname, 'src/assets/icons/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages'     : path.resolve(__dirname, 'src/pages/'),
      '@redux'     : path.resolve(__dirname, 'src/redux/'),
      '@typings'   : path.resolve(__dirname, 'src/typings/'),
      '@assets'    : path.resolve(__dirname, 'src/assets/'),
      '@hocs'      : path.resolve(__dirname, 'src/hocs/'),
    }
  }
})
