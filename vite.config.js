import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For user/organization GitHub Pages (username.github.io), base should be '/'
// For project pages, use '/repository-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})

