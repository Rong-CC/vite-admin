import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/index.less'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
