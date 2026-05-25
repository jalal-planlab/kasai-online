import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT_FROM_ENV) || 7001

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: ['REACT_APP_'],
    server: { port },
    preview: { port },
  }
})
