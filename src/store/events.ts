import { COLL_NAMES } from '~/util/constants'

import {
  getDocsCount,
  getItemPage,
  getItems,
  nextPage,
  prevPage
} from '~/util/store'
import { PageEvent, TimelineEvent } from '~/types/items/event'

const COLL_NAME = COLL_NAMES.EVENTS

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
    commit('updateDocsCount', await getDocsCount(this, COLL_NAME))
    commit('updateEvents', await getItems(this, COLL_NAME, TimelineEvent))
  },

  async loadEventPage({ commit }, doc) {
    commit('updateEventPage', await getItemPage(this, doc, COLL_NAME, PageEvent))
  },

  async nextPage({ commit, getters }) {
    commit(
      'updateEvents',
      await nextPage(this, COLL_NAME, getters.getEvents, TimelineEvent)
    )
  },

  async prevPage({ commit, getters }) {
    commit(
      'updateEvents',
      await prevPage(this, COLL_NAME, getters.getEvents, TimelineEvent)
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
