import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) =>{
  const env = loadEnv(mode, process.cwd());

  const PORT = `${env.FRONTEND_PORT ?? 80}` // ili port iz env ili 80

  return {
    plugins: [react()],
    server: {
      port: PORT,
    }
  }
})
