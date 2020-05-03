import { TYPE_NAMES, VUEX_NAMES } from "~/util/constants";

import {
  getDocsCountByType,
  getItemPage,
  getItems,
  nextPage,
  prevPage, queryRefByType
} from "~/util/store";
import { PageAchievement, TimelineAchievement } from '~/types/items/achievement'

const TYPE_NAME = TYPE_NAMES.ACHIEVEMENTS

export const state = () => ({
  achievements: [],
  achievementPage: undefined,
  docsCount: 0
})

export const mutations = {
  updateAchievementPage(state, payload) {
    state.achievementPage = payload
  },
  updateAchievements(state, payload) {
    state.achievements = payload
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload
  }
}

export const actions = {
  async loadAchievements({ commit }) {
    commit('updateDocsCount', await getDocsCountByType(this, TYPE_NAME))
    commit(
      'updateAchievements',
      await getItems(this, queryRefByType(this, TYPE_NAME))
    )
  },

  async loadAchievementPage({ commit }, doc) {
    commit(
      'updateAchievementPage',
      await getItemPage(this, doc, TYPE_NAME, PageAchievement)
    )
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateAchievements',
      await nextPage(this, queryRefByType(this, TYPE_NAME), getters.getAchievements)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateAchievements',
      await prevPage(this, queryRefByType(this, TYPE_NAME), getters.getAchievements)
    )
  }
}

export const getters = {
  getAchievements(state) {
    return state.achievements
  },
  getAchievementPage(state) {
    return state.achievementPage
  },
  getDocsCount(state) {
    return state.docsCount
  }
}
