import type { App } from 'vue';
import { setupRouter } from './router';

export function setupPlugins(app: App) {
  setupRouter(app)
}
