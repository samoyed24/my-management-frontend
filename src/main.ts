import { createPinia } from 'pinia'
import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

// const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
