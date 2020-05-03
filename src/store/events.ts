import { TYPE_NAMES } from "~/util/constants";
import {
  getDocsCountByType,
  getItemPage,
  getItems,
  nextPage,
  prevPage,
  queryRefByType
} from '~/util/store'
import { PageEvent } from '~/types/items/event'

const TYPE_NAME = TYPE_NAMES.EVENTS

export const state = () => ({
  events: [],
  eventPage: undefined,
  currentPage: 0,
  docsCount: 0
})

export const mutations = {
  updateEventPage(state, payload) {
    state.eventPage = payload
  },
  updateEvents(state, payload) {
    state.events = payload
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload
  }
}

export const actions = {
  async loadEvents({ commit, getters }) {
    commit('updateDocsCount', await getDocsCountByType(this, TYPE_NAME))
    commit('updateEvents', await getItems(this, queryRefByType(this, TYPE_NAME)))
  },

  async loadEventPage({ commit }, doc) {
    commit('updateEventPage', await getItemPage(this, doc, TYPE_NAME, PageEvent))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateEvents',
      await nextPage(this, queryRefByType(this, TYPE_NAME), getters.getEvents)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateEvents',
      await prevPage(this, queryRefByType(this, TYPE_NAME), getters.getEvents)
    )
  }
}

export const getters = {
  getEvents(state) {
    return state.events
  },
  getEventPage(state) {
    return state.eventPage
  },
  getDocsCount(state) {
    return state.docsCount
  },
  getCurrentPage(state) {
    return state.currentPage
  }
}
