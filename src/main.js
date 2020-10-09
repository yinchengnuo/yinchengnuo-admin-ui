import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import plugin from '@/plugin'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import PortalVue from 'portal-vue'
import { mock, errorLog } from '@/settings'

import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/styles/element-variables.scss'

import '@/icons'
import '@/permission'

Vue.use(plugin) // 挂载全局指令/过滤器/原型方法
Vue.use(PortalVue) // 挂载 PortalVue
Vue.use(Element, { size: Cookies.get('size') || 'medium' }) // 挂载 ElementUI

if (mock && process.env.NODE_ENV === 'production') { // 本项目目前是纯前端项目
  require('../mock').mockXHR() // 生产环境也是用 mock 模拟数据
}

if (errorLog === '*' || errorLog === process.env.NODE_ENV) { // 判断是否进行错误监听
  Vue.config.errorHandler = function(err, vm, info) { // 添加 vue errorHandler
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', { err, vm, info, url: window.location.href }) // 保存错误并显示
      process.env.NODE_ENV !== 'production' && console.error(err, info) // 非生产环境下打印
    })
  }
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
