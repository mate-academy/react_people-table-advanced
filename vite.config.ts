import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const alias = {
  '@app': path.resolve(__dirname, 'src/app'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@widgets': path.resolve(__dirname, 'src/widgets'),
  '@entities': path.resolve(__dirname, 'src/entities'),
  '@shared': path.resolve(__dirname, 'src/shared'),
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react()],
  resolve: { alias },
  base: '/react_people-table-advanced/',
})
