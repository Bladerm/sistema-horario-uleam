import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// SOLO importar el CSS unificado
import './assets/Sistemas.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')