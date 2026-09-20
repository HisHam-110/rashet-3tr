import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'

// Fix Node.js EAI_AGAIN DNS resolution timeout on Windows/Node 17+ by prioritizing IPv4
try {
  dns.setDefaultResultOrder('ipv4first')
} catch {}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/public/icons/**'],
    },
    proxy: {
      '/api': {
        target: 'https://rashet-etr-hesham.growfet.com',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            // Gracefully handle proxy network/endpoint errors without crashing or logging verbose error in terminal
            if (res && !res.headersSent && typeof res.writeHead === 'function') {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Proxy service unavailable', message: err.message }));
            }
          });
        },
      },
    },
  },
})
