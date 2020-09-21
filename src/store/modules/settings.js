import defaultSettings from '@/settings'
import variables from '@/styles/element-variables.scss'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  tagsView: tagsView,
  theme: variables.theme,
  sidebarLogo: sidebarLogo,
  fixedHeader: fixedHeader,
  showSettings: showSettings
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

