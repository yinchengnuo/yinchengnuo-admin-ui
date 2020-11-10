import Vue from 'vue'
import Router from 'vue-router'

import asyncRoutes from './asyncRoutes'
import developerRoutes from './developerRoutes'
import constantRoutesHead from './constantRoutesHead'
import constantRoutesTail from './constantRoutesTail'

import { publicPath as base } from '@/settings'

const clearUndefined = routes => { // 清除路由列表中值为 undefined 的项。当 settings 中 showUI 为 false 时会出现这种情况
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i] === undefined) {
      routes.splice(i, 1)
    }
  }
}

clearUndefined(asyncRoutes)
clearUndefined(developerRoutes)
clearUndefined(constantRoutesHead)
clearUndefined(constantRoutesTail)

Vue.use(Router)

const createRouter = () => new Router({
  base,
  routes: constantRoutesHead,
  scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

export function resetRouter() {
  router.matcher = createRouter().matcher // 重置路由方法
}

export { asyncRoutes, developerRoutes, constantRoutesHead, constantRoutesTail }

export default router
