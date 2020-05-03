<template>
  <CardCatalog
    :docs-count="getDocsCount"
    :on-next-page="nextPage"
    :on-prev-page="prevPage"
    :items="getEvents"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES, VUEX_NAMES } from "~/util/constants";
import Card from '~/components/Card.vue'
import CardCatalog from '~/components/CardCatalog.vue'
import { getMeta } from '~/util/seo'

const VUEX_NAME = VUEX_NAMES.EVENTS
const vuexModule = namespace(VUEX_NAME)

@Component({
  components: { CardCatalog, Card }
})
export default class extends Vue {
  @vuexModule.Getter
  getEvents

  @vuexModule.Getter
  getDocsCount

  @vuexModule.Action
  nextPage

  @vuexModule.Action
  prevPage

  async fetch({ store }) {
    try {
      await store.dispatch(`${VUEX_NAME}/loadEvents`)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: { title: this.$t('title'), locale: this.$i18n.locale },
      meta: getMeta(
        this.$i18n.locale,
        undefined,
        this.$t('title') as string,
        undefined
      )
    }
  }
}
</script>

<i18n src="~/lang/events.json" />
