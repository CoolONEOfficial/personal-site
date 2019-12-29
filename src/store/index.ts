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
    console.log('switching theme..')
    commit('updateTheme', getters.getThemeInvert)
  },

  initTheme({ commit, getters }) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
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
