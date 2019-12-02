import { vuexfireMutations, firestoreAction } from 'vuexfire'
export const state = () => ({
  countDocument: null
})
export const mutations = {
  ...vuexfireMutations,
  updateCountDocument(state, doc) {
    state.countDocument = doc
  }
}
export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('bindFirestoreRef')
  },
  bindFirestoreRef: firestoreAction(async function({ bindFirestoreRef }) {
    ;(global as any).XMLHttpRequest = require('xhr2').XMLHttpRequest
    // @ts-ignore
    const ref = this.$fireStore
      .collection('countCollection')
      .doc('countDocument')
    await bindFirestoreRef('countDocument', ref, { wait: true })
  })
}
export const getters = {
  getCountDocument(state) {
    return state.countDocument
  }
}
