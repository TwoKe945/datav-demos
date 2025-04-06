import { createApp } from 'vue'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import { setupPlugins } from './plugins'

createApp(App)
  .use(setupPlugins)
  .mount('#app')
