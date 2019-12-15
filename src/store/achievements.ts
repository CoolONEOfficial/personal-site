import firebase from 'firebase'
import { TimelineAchievement } from '~/types/items/achievement'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import Timestamp = firebase.firestore.Timestamp
import { PAGINATION_COUNT } from '~/util/constants'
import { Item } from '~/types/types'

export const state = () => ({
  achievements: [],
  currentPage: 0,
  docsCount: 0
})

export const mutations = {
  updateAchievements(state, payload) {
    state.achievements = payload
  },
  updateDocsCount(state, payload) {
    state.docsCount = payload
  }
}

const queryRef = (that) =>
  that.$fireStore.collection('achievements').orderBy('date', 'desc')

async function getDocsCount(that) {
  const sizeDoc = await that.$fireStore
    .collection('sizes')
    .doc('achievements')
    .get()
  return sizeDoc.data()['numberOfDocs']
}

function parseQuery(that, ss: QuerySnapshot) {
  return Promise.all(
    ss.docs.map(async (mDoc) => {
      return (await TimelineAchievement.fromDoc(that, mDoc)) as never
    })
  )
}

async function getAchievements(that) {
  return parseQuery(
    that,
    await queryRef(that)
      .limit(PAGINATION_COUNT)
      .get()
  )
}

async function nextPage(that, achievements: TimelineAchievement[]) {
  return parseQuery(
    that,
    await queryRef(that)
      .startAfter(
        Timestamp.fromDate(achievements[achievements.length - 1].date)
      )
      .limit(PAGINATION_COUNT)
      .get()
  )
}

async function prevPage(that, achievements) {
  return parseQuery(
    that,
    await queryRef(that)
      .endBefore(Timestamp.fromMillis(achievements[0].date))
      .limitToLast(PAGINATION_COUNT)
      .get()
  )
}

export const actions = {
  async loadAchievements({ commit }) {
    commit('updateDocsCount', await getDocsCount(this))
    commit('updateAchievements', await getAchievements(this))
  },

  async nextPage({ commit, getters }) {
    commit('updateAchievements', await nextPage(this, getters.getAchievements))
  },

  async prevPage({ commit, getters }) {
    commit('updateAchievements', await prevPage(this, getters.getAchievements))
  }
}

export const getters = {
  getAchievements(state) {
    return state.achievements
  },
  getDocsCount(state) {
    return state.docsCount
  },
  getCurrentPage(state) {
    return state.currentPage
  }
}
