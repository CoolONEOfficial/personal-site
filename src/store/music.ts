import DocumentData = firebase.firestore.DocumentData
import { Track } from "~/types/music";

const apiUrl = process.env.clientBaseUrl

export const state = () => ({
  isConnected: false,
  message: null,
  track: null,
  trackProgress: 0,
  isPlaying: false
})

export const mutations = {
  updateMessage(state, payload) {
    state.message = payload
  },
  updateIsConnected(state, payload) {
    state.isConnected = payload
  },
  updateIsPlaying(state, payload) {
    state.isPlaying = payload
  },
  updateTrack(state, payload) {
    state.track = payload
  },
  updateTrackProgress(state, payload) {
    state.trackProgress = payload
  }
}

export const actions = {
  async loadMusic({ commit }) {
    const doc = await (this as any).$fireStore
      .collection('spotify')
      .doc('doc')
      .get()
    const docData: DocumentData = doc.exists ? doc.data() : null
    const isConnected: boolean =
      docData != null && Boolean(docData.is_connected)
    console.log('is connected status: ', isConnected)
    commit('updateIsConnected', isConnected)

    if (isConnected) {
      const resp = await (this as any).$axios.$get(
        `${apiUrl}/api/v1/spotify/now-playing`
      )
      console.log('resp: ', resp)
      commit('updateTrack', Track.fromMap(resp['item']))
      commit('updateIsPlaying', resp['is_playing'])
      commit('updateTrackProgress', resp['progress_ms'])
    }
  }
}

export const getters = {
  getTrack(state) {
    return state.track
  },
  getTrackProgress(state) {
    return state.trackProgress
  },
  getIsPlaying(state) {
    return state.isPlaying
  },
  getIsConnected(state) {
    return state.isConnected
  },
}
