import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: base path is set in CI via VITE_BASE_PATH (e.g. /Nexus-Education/)
const base = process.env.VITE_BASE_PATH ?? (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './')

export default defineConfig({
  plugins: [react()],
  base,
})
