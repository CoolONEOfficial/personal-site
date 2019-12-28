import { invertTheme, THEMES } from '~/types/theme'

export const state = () => ({
  theme: THEMES.WHITE
})

export const mutations = {
  updateTheme(state, payload) {
    state.theme = payload
  }
}

export const actions = {
  nuxtServerInit() {
    ;(global as any).XMLHttpRequest = require('xhr2')
  },

  switchTheme({ commit, getters }) {
    commit('updateTheme', getters.getThemeInvert)
  }
}

export const getters = {
  getTheme(state) {
    return state.theme
  },

  getThemeInvert(state) {
    return invertTheme(state.theme)
  }
}
