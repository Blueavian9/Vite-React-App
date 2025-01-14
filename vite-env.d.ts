import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string; // OpenAI API key
    readonly MODE: string; // Environment mode
    // Add more environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  export default defineConfig({
    plugins: [react()],
  });