/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_IS_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
