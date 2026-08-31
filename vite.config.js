import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/public/icons/**'],
    },
    proxy: {
      '/api': {
        target: 'https://rashet-etr.growfet.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
