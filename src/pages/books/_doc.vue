<template>
  <Hero :doc="$route.params.doc" :item="getBookPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'

const COLL_NAME = COLL_NAMES.BOOKS
const vuexModule = namespace(COLL_NAME)

@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getBookPage

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadBookPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: {
        title: this.getBookPage.title[this.$i18n.locale],
        locale: this.$i18n.locale
      }
    }
  }
}
</script>
