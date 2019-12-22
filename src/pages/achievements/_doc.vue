<template>
  <Hero :doc="$route.params.doc" :item="getAchievementPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'

const vuexModule = namespace(COLL_NAMES.ACHIEVEMENTS)

@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getAchievementPage

  async fetch({ store, params }) {
    try {
      await store.dispatch(`achievements/loadAchievementPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: {
        title: this.getAchievementPage.title[this.$i18n.locale],
        locale: this.$i18n.locale
      }
    }
  }
}
</script>
