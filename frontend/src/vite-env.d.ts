/// <reference types="vite/client" />

declare module 'react-syntax-highlighter'
declare module 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ImportMetaEnv {
  readonly VITE_WORKER_URL: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
