import Cookies from 'js-cookie'

const state = {
  sidebar: { // 侧边栏状态
    withoutAnimation: false, // 开关是否带有动画
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true // 是否打开
  },
  printing: false, // 是否正在打印状态
  newWindow: false, // 是否被 window.open 在一个新的 tab 打开
  device: 'desktop', // app 运行设备
  size: Cookies.get('size') || 'medium' // app 字体大小
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_PRINTING: (state, printing) => {
    state.printing = printing
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  NEW_WINDOW: (state) => {
    state.newWindow = true
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  newWindow({ commit }) {
    commit('NEW_WINDOW')
  },
  togglePrinting({ commit }, printing) {
    commit('TOGGLE_PRINTING', printing)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
