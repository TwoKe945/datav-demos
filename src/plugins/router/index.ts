import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function setupRouter(app: App) {
  app.use(router)
}
