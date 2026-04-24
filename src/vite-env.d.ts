/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_URL?: string;
  readonly GEMINI_API_KEY?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
