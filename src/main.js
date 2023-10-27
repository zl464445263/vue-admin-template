import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //持久化存储
import App from './App.vue'
import router from './router/index.js'
const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(store).use(router).mount('#app')
