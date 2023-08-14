import type { App } from 'vue' // 这个是创建app以后返回的类型
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component) // 注册全局组件
  }
}

export default registerIcons
