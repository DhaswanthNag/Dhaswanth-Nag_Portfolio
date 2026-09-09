import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Dhaswanth-Nag_Portfolio/',
  server: {
    open: true,
  },
  plugins: [react(), tailwindcss()],
})
