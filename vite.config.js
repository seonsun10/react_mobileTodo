import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todo': {
        target: 'http://localhost:5174', // 서버 주소
        changeOrigin: true,
      },
    },
    hmr: true,
  },
})
