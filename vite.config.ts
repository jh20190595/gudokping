import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build : {
    cssCodeSplit : true
  },
  resolve: {
    tsconfigPaths: true  // 추가
  },
  server: {
    port: 3000
  }
})