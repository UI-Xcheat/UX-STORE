import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// base './' + singlefile: `npm run build` genera dist/index.html que abre con doble clic.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
