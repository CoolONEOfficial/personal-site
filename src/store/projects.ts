import { COLL_NAMES } from '~/util/constants'

import {
  getDocsCount,
  getItemPage,
  getItems,
  nextPage,
  prevPage
} from '~/util/store'
import { PageProject, TimelineProject } from '~/types/items/project'

const COLL_NAME = COLL_NAMES.PROJECTS

export const state = () => ({
  books: [],
  bookPage: undefined,
  currentPage: 0,
  docsCount: 0
})

export const mutations = {
  updateProjectPage(state, payload) {
    state.bookPage = payload
  },
  updateProjects(state, payload) {
    state.books = payload
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload
  }
}

export const actions = {
  async loadProjects({ commit }) {
    commit('updateDocsCount', await getDocsCount(this, COLL_NAME))
    commit('updateProjects', await getItems(this, COLL_NAME, TimelineProject))
  },

  async loadProjectPage({ commit }, doc) {
    console.log('loading project page...')
    commit('updateProjectPage', await getItemPage(this, doc, COLL_NAME, PageProject))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateProjects',
      await nextPage(this, COLL_NAME, getters.getProjects, TimelineProject)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateProjects',
      await prevPage(this, COLL_NAME, getters.getProjects, TimelineProject)
    )
  }
}

export const getters = {
  getProjects(state) {
    return state.books
  },
  getProjectPage(state) {
    return state.bookPage
  },
  getDocsCount(state) {
    return state.docsCount
  },
  getCurrentPage(state) {
    return state.currentPage
  }
}
