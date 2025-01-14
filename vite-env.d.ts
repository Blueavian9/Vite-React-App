/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string; // OpenAI API key
  readonly VITE_MODEL?: string; // Optional AI model
  readonly VITE_MAX_TOKENS?: string; // Optional max tokens
  readonly VITE_TEMPERATURE?: string; // Optional temperature setting
  readonly MODE: string; // Environment mode
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
