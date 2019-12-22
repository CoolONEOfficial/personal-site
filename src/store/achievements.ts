import { COLL_NAMES } from '~/util/constants'

import {
  getDocsCount,
  getItemPage,
  getItems,
  nextPage,
  prevPage
} from '~/util/store'
import { PageAchievement, TimelineAchievement } from '~/types/items/achievement'

const COLL_NAME = COLL_NAMES.ACHIEVEMENTS

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
    commit('updateDocsCount', await getDocsCount(this, COLL_NAME))
    commit(
      'updateAchievements',
      await getItems(this, COLL_NAME, TimelineAchievement)
    )
  },

  async loadAchievementPage({ commit }, doc) {
    commit(
      'updateAchievementPage',
      await getItemPage(this, doc, COLL_NAME, PageAchievement)
    )
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateAchievements',
      await nextPage(
        this,
        COLL_NAME,
        getters.getAchievements,
        TimelineAchievement
      )
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateAchievements',
      await prevPage(
        this,
        COLL_NAME,
        getters.getAchievements,
        TimelineAchievement
      )
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
