import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todo': {
        target: "https://running-stace-seonsun10-a588ed5f.koyeb.app", // 서버 주소
        changeOrigin: true,
      },
    },
    hmr: true,
  },
})
