/// <reference types="vite/client" />



declare module '@dataview/datav-vue3';
interface ImportMetaEnv {
  [key: string]: any
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
  VITE_TD_KEY: string
}
