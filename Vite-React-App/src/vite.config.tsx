import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
});
