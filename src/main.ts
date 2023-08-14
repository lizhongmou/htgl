import { createApp } from 'vue'
import registerIcons from '@/global/register-icons'
import router from '@/router/index'
// 在这里引入的并不是pinia，而是registerStore的返回值
import pinia from '@/store/index'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/index.less'

// console.log(HelloWorldVue);
const app = createApp(App)
registerIcons(app) // 这个的目的是为了直接调用这个函数就会把app在全局进行挂载并进行注册。封装进去了
app.use(router)
app.use(pinia)
app.mount('#app')
