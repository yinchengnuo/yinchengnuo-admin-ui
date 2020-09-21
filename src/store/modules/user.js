import { getToken, setToken, removeToken } from '@/utils/auth'
import { api_login, api_logout, api_getInfo } from '@/api/logon'

const state = {
  name: '', // 用户名
  role: '', // 用户角色
  level: '', // 用户角色等级
  avatar: '', // 用户头像
  introduction: '', // 用户简介
  token: getToken() // token
}

const mutations = {
  SET_NAME: (state, name) => { // 设置用户名
    state.name = name
  },
  SET_ROLE: (state, role) => { // 设置用户角色
    state.role = role
  },
  SET_LEVEL: (state, level) => { // 设置用户角色等级
    state.level = level
  },
  SET_AVATAR: (state, avatar) => { // 设置用户头像
    state.avatar = avatar
  },
  SET_TOKEN: (state, token) => { // 设置 token
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => { // 设置用户简介
    state.introduction = introduction
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
      G.$request(api_getInfo(), ({ username, avatar, introduction, rolename, routes, level }) => {
        commit('SET_LEVEL', level) // 设置用户角色等级
        commit('SET_NAME', username) // 设置用户名
        commit('SET_ROLE', rolename) // 设置用户角色
        commit('SET_AVATAR', avatar) // 设置用户头像
        commit('SET_INTRODUCTION', introduction) // 设置用户简介
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
    commit('SET_TOKEN', '') // 删除 vuex 中的 token
    commit('SET_LEVEL', '') // 删除用户角色等级
    commit('SET_NAME', '') // 删除用户名
    commit('SET_ROLE', '') // 删除用户角色
    commit('SET_AVATAR', '') // 删除用户头像
    commit('SET_INTRODUCTION', '') // 删除用户简介
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
