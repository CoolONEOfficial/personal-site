import { vuexfireMutations, firestoreAction } from 'vuexfire'

const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  countDocument: null,
  isConnected: false,
  message: null,
  nowPlaying: {},
  recentlyPlayed: {},
  trackProgress: 0,
  isPlaying: false
})

export const mutations = {
  ...vuexfireMutations,
  updateCountDocument(state, doc) {
    state.countDocument = doc
  },
  connectionChange(state, isConnected) {
    state.isConnected = isConnected
  },
  updateMessage(state, message) {
    state.message = message
  },
  nowPlayingChange(state, nowPlaying) {
    state.nowPlaying = nowPlaying
  },
  isPlayingChange(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  progressChange(state, { progress, duration }) {
    state.trackProgress = (progress / duration) * 100
  },
  recentlyPlayedChange(state, recentlyPlayed) {
    state.recentlyPlayed = recentlyPlayed
  }
}

export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    await dispatch('bindFirestoreRef')

    try {
      const redisUrl = `${clientUrl}/api/spotify/data/`
      const {
        data: { is_connected }
      } = await axios.get(`${redisUrl}is_connected`)

      commit('connectionChange', is_connected)

      if (Boolean(is_connected)) {
        const {
          data: { item, is_playing }
        } = await axios.get(`${clientUrl}/api/spotify/now-playing`)
        commit('nowPlayingChange', item)
        commit('isPlayingChange', is_playing)
      }
    } catch (err) {
      console.error(err)
    }
  },
  bindFirestoreRef: firestoreAction(async function({ bindFirestoreRef }) {
    ;(global as any).XMLHttpRequest = require('xhr2').XMLHttpRequest
    // @ts-ignore
    const ref = this.$fireStore
      .collection('countCollection')
      .doc('countDocument')
    await bindFirestoreRef('countDocument', ref, { wait: true })
  }),
  updateProgress: ({ commit, state }, props) => {
    commit('progressChange', props)
    return state.trackProgress
  },
  updateTrack: ({ commit, state }, nowPlaying) => {
    commit('nowPlayingChange', nowPlaying)
    return state.nowPlaying
  },
  updateStatus: ({ commit, state }, isPlaying) => {
    commit('isPlayingChange', isPlaying)
    return state.isPlaying
  },
  updateConnection: ({ commit, state }, isConnected) => {
    commit('connectionChange', isConnected)
    return state.isConnected
  }
}
export const getters = {
  getCountDocument(state) {
    return state.countDocument
  }
}
