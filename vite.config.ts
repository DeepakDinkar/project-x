import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sass from 'vite-plugin-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sass({
    preProcessor: 'scss',
    include: ['./src/styles/variables.scss'],
  })],
})
