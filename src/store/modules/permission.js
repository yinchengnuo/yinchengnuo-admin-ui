import { deepClone } from '@/utils'
import { asyncRoutes, developerRoutes, constantRoutesHead, constantRoutesTail } from '@/router'

const state = {
  routes: [], // 用户的所有路由
  addRoutes: [], // 用户需要通过 router.addRoutes 挂载的路由
  permissionRoutes: [] // 自己的权限路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.permissionRoutes = routes
    state.addRoutes = routes.concat(constantRoutesTail)
    state.routes = constantRoutesHead.concat(routes).concat(constantRoutesTail)
  },
  SET_ROOT_ROUTES: (state, routes) => {
    state.permissionRoutes = routes
    state.addRoutes = routes.concat(developerRoutes).concat(constantRoutesTail)
    state.routes = constantRoutesHead.concat(routes).concat(developerRoutes).concat(constantRoutesTail)
  }
}

const actions = {
  generateRoutes({ state, commit, rootState: { user: { role }}}, routes) { // 根据角色序列化路由
    return new Promise(resolve => {
      if (role === 'root') {
        const routes = deepClone(asyncRoutes)
        const setButtons = routes => routes.forEach(route => {
          if (route.children) {
            setButtons(route.children)
          }
          if (route.buttons) {
            route.meta.buttons = route.buttons.map(button => button.name)
          }
        })
        setButtons(routes)
        commit('SET_ROOT_ROUTES', routes)
      } else {
        const reductionRoutes = (target, origin) => {
          origin.forEach(originItem => {
            target.forEach(targetItem => {
              if (originItem.path === targetItem.path) {
                Object.keys(originItem).forEach(originItemKey => {
                  if (originItemKey !== 'children') { // 不转换 children
                    if (originItemKey === 'buttons') {
                      if (targetItem.buttons) {
                        targetItem.meta.buttons = targetItem.buttons // 将按钮权限放置于 meta 中用于自定义指定获取
                        targetItem.buttons = originItem.buttons.filter(button => targetItem.buttons.includes(button.name))
                      }
                    } else {
                      targetItem[originItemKey] = originItem[originItemKey]
                    }
                  }
                })
                if (originItem.children && targetItem.children) {
                  reductionRoutes(targetItem.children, originItem.children)
                }
              }
            })
          })
        }
        reductionRoutes(routes, asyncRoutes) // 根据后端路由表还原前端路由
        commit('SET_ROUTES', routes)
      }
      resolve(state.addRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
