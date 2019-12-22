import { COLL_NAMES } from '~/util/constants'

import {
  getDocsCount,
  getItemPage,
  getItems,
  nextPage,
  prevPage
} from '~/util/store'
import { PageBook, TimelineBook } from '~/types/items/book'

const COLL_NAME = COLL_NAMES.BOOKS

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
    commit('updateDocsCount', await getDocsCount(this, COLL_NAME))
    commit('updateBooks', await getItems(this, COLL_NAME, TimelineBook))
  },

  async loadBookPage({ commit }, doc) {
    commit('updateBookPage', await getItemPage(this, doc, COLL_NAME, PageBook))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateBooks',
      await nextPage(this, COLL_NAME, getters.getBooks, TimelineBook)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateBooks',
      await prevPage(this, COLL_NAME, getters.getBooks, TimelineBook)
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
