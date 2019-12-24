<template>
  <transition name="fade" mode="out-in">
    <section aria-live="polite">
      <nuxt-link
        to="/"
        name="index"
        :aria-current="'/' === $nuxt.$route.path ? 'page' : false"
        >Close</nuxt-link
      >
      {{ message }}
    </section>
  </transition>
</template>

<script lang="ts">
  import { Component, Getter, State, Vue } from "nuxt-property-decorator";
import { namespace } from "~/node_modules/nuxt-property-decorator";

const vuexModule = namespace('music')

@Component({
  nuxtI18n: {
    seo: false
  }
})
export default class extends Vue {
  get isConnected() {
    return this.$store.state.isConnected
  }
  get message() {
    return this.$store.state.message
  }

  @vuexModule.Getter
  getIsConnected

  @vuexModule.Getter
  getMessage

  query
  spotifyUrl

  mounted() {
    if (
      !Boolean(this.query.success || this.query.error) &&
      !Boolean(this.isConnected)
    ) {
      window.location = this.spotifyUrl
    } else if (Boolean(Object.keys(this.query).length !== 0)) {
      window.history.replaceState({}, document.title, window.location.pathname)
      this.$store.commit(
        'updateMessage',
        this.query.success || this.query.error
      )
      if (Boolean(this.query.success)) {
        this.$store.dispatch('updateConnection', true)
      }
    }
    if (Boolean(this.isConnected)) {
      this.$store.commit('updateMessage', "⚡ We're Connected ⚡")
    }
  }

  asyncData({ env: { spotifyClientId, clientBaseUrl }, query, req }) {
    const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&scope=user-read-currently-playing,user-read-recently-played&redirect_uri=${clientBaseUrl}/api/v1/spotify/callback`
    return {
      spotifyUrl,
      query
    }
  }
}
</script>
