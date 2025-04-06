import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DevTools from 'vite-plugin-vue-devtools'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'
import { resolve } from 'node:path'
import VueRouter from 'unplugin-vue-router/vite'
import cesium from 'vite-plugin-cesium';

// https://vite.dev/config/
export default ({ mode }: any) => {
  loadEnv(mode, process.cwd());
  return defineConfig({
  resolve: {
    alias: {
      "~": resolve("./src")
    }
  },
  plugins: [
    VueRouter({
      exclude: ['**/components/*.vue'],
      extensions: ['.vue'],
    }),
    Vue(),
    Jsx(),
    cesium(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/types/auto-import.d.ts'
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/types/components.d.ts',
      directoryAsNamespace: true,
      resolvers: [
        IconResolver({
          prefix: 'icon',
          enabledCollections: ['mdi', 'ep'],
        }),
        {
          type: 'component',
          resolve: (name) => {
            if (name.startsWith('DataV'))
              return { as: name, name: name.replace("DataV", ""), from: '@kjgl77/datav-vue3' }
          },
        }
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    DevTools(),
  ],
})
}
