import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  
  // server: {
  //       proxy: {
  //         // Proxy requests starting with '/api'
  //         '/api': {
  //           target: 'http://localhost:3000', // The URL of your backend server
  //           changeOrigin: true, // Important for changing the Host header
  //           // Optional: Rewrite the path before forwarding
  //           // rewrite: (path) => path.replace(/^\/api/, ''), 
  //         },
  //         // You can add multiple proxy rules
  //         // '/auth': {
  //         //   target: 'http://localhost:4000',
  //         //   changeOrigin: true,
  //         // },
  //       },
  //     },
  plugins: [tailwindcss(),react()],
})
