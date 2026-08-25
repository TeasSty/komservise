import react from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://<user>.github.io/komservise/
export default defineConfig({
  base: '/komservise/',
  plugins: [react(), netlify()],
})
