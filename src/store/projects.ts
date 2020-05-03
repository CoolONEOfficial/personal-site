import { COLL_NAMES, TYPE_NAMES } from "~/util/constants";

import {
  getDocsCountByType,
  getItemPage,
  getItems,
  nextPage,
  prevPage, queryRefByType
} from "~/util/store";
import { PageProject, TimelineProject } from '~/types/items/project'

const TYPE_NAME = TYPE_NAMES.PROJECTS

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
    commit('updateDocsCount', await getDocsCountByType(this, TYPE_NAME))
    commit('updateProjects', await getItems(this, queryRefByType(this, TYPE_NAME)))
  },

  async loadProjectPage({ commit }, doc) {
    console.log('loading project page...')
    commit('updateProjectPage', await getItemPage(this, doc, TYPE_NAME, PageProject))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateProjects',
      await nextPage(this, queryRefByType(this, TYPE_NAME), getters.getProjects)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateProjects',
      await prevPage(this, queryRefByType(this, TYPE_NAME), getters.getProjects)
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
