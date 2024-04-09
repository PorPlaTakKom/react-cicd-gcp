import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = process.env.PORT || 8080; // Default to port 3000 if PORT environment variable is not set

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: port, // Use the port specified by the PORT environment variable or fallback to 3000
  }
})
