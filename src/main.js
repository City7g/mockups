import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import '@/assets/scss/main.scss'
import Maska from 'maska'
import BaseButton from './components/Base/BaseButton'
import BaseLoader from './components/Base/BaseLoader'

const pinia = createPinia()
const app = createApp(App)

app.component('BaseButton', BaseButton)
app.component('BaseLoader', BaseLoader)

app.use(Maska)
app.use(pinia)

app.mount('#app')
