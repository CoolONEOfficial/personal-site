import { COLL_NAMES, TYPE_NAMES, VUEX_NAMES } from "~/util/constants";

import {
  getDocsCountByType,
  getItemPage,
  getItems,
  nextPage,
  prevPage, queryRefByType
} from "~/util/store";
import { PageBook, TimelineBook } from '~/types/items/book'

const TYPE_NAME = TYPE_NAMES.BOOKS

export const state = () => ({
  books: [],
  bookPage: undefined,
  currentPage: 0,
  docsCount: 0
})

export const mutations = {
  updateBookPage(state, payload) {
    state.bookPage = payload
  },
  updateBooks(state, payload) {
    state.books = payload
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload
  }
}

export const actions = {
  async loadBooks({ commit }) {
    commit('updateDocsCount', await getDocsCountByType(this, TYPE_NAME))
    commit('updateBooks', await getItems(this, queryRefByType(this, TYPE_NAME)))
  },

  async loadBookPage({ commit }, doc) {
    commit('updateBookPage', await getItemPage(this, doc, TYPE_NAME, PageBook))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateBooks',
      await nextPage(this, queryRefByType(this, TYPE_NAME), getters.getBooks)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateBooks',
      await prevPage(this, queryRefByType(this, TYPE_NAME), getters.getBooks)
    )
  }
}

export const getters = {
  getBooks(state) {
    return state.books
  },
  getBookPage(state) {
    return state.bookPage
  },
  getDocsCount(state) {
    return state.docsCount
  },
  getCurrentPage(state) {
    return state.currentPage
  }
}
