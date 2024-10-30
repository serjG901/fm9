/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
interface ImportMetaEnv {
  readonly VITE_APP_IS_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
