import { getToken, setToken, removeToken } from '@/utils/auth'
import { api_login, api_logout, api_getInfo } from '@/api/logon'

const state = {
  name: '', // 用户名
  role: '', // 用户角色
  todo: '', // 用户待办
  dept: '', // 用户部门
  avatar: '', // 用户头像
  token: getToken() // token
}

const mutations = {
  SET_NAME: (state, name) => { // 设置用户名
    state.name = name
  },
  SET_ROLE: (state, role) => { // 设置用户角色
    state.role = role
  },
  SET_DEPT: (state, dept) => { // 设置用户部门
    state.dept = dept
  },
  SET_TODO: (state, todo) => { // 设置用户部门
    state.todo = todo
  },
  SET_AVATAR: (state, avatar) => { // 设置用户头像
    state.avatar = avatar
  },
  SET_TOKEN: (state, token) => { // 设置 token
    state.token = token
  }
}

const actions = {
  login({ commit }, userInfo) { // 用户登录
    return new Promise((resolve, reject) => {
      G.$request(api_login(userInfo), token => {
        commit('SET_TOKEN', token) // 设置 token
        setToken(token) // 保存 token 至 cookie 浏览器关闭即清除
        resolve()
      }, { noLoading: true }).catch(error => reject(error))
    })
  },
  getInfo({ commit }) { // 获取用户信息
    return new Promise((resolve, reject) => {
      G.$request(api_getInfo(), ({ username, avatar, rolename, routes, deptname, todo }) => {
        commit('SET_TODO', todo) // 设置用户待办
        commit('SET_DEPT', deptname) // 设置用户部门
        commit('SET_NAME', username) // 设置用户名
        commit('SET_ROLE', rolename) // 设置用户角色
        commit('SET_AVATAR', avatar) // 设置用户头像
        resolve(routes) // 将路由表 resolve 给 store/permission/generateRoutes 处理路由
      }, { noLoading: true }).catch(error => reject(error))
    })
  },
  logout({ dispatch }) { // 用户退出登录
    return new Promise((resolve, reject) => {
      G.$request(api_logout(), () => {
        G.$resetRouter() // 删除 vue-router 中的路由
        dispatch('resetToken') // 删除登录状态
        dispatch('tagsView/delAllViews', null, { root: true }) // 删除已经打开和缓存的 tabs
        resolve()
      }, { noLoading: true }).catch(error => reject(error))
    })
  },
  resetToken({ commit }) { // 删除登录状态。用在退出登录，或 request 拦截器 token 过期后，或 permission 挂载路由失败
    removeToken() // 删除 cookie 上的 token
    commit('SET_TODO', '') // 删除用户待办
    commit('SET_DEPT', '') // 删除用户部门
    commit('SET_NAME', '') // 删除用户名
    commit('SET_ROLE', '') // 删除用户角色
    commit('SET_TOKEN', '') // 删除 vuex 中的 token
    commit('SET_AVATAR', '') // 删除用户头像
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
