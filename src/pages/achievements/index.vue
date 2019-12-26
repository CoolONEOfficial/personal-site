<template>
  <CardCatalog
    :docs-count="getDocsCount"
    :on-next-page="nextPage"
    :on-prev-page="prevPage"
    :items="getAchievements"
    :item-subtitle="subtitle"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Card from '~/components/Card.vue'
import CardCatalog from '~/components/CardCatalog.vue'
import { getMeta, getMetaPage } from '~/util/seo'

const COLL_NAME = COLL_NAMES.ACHIEVEMENTS
const vuexModule = namespace(COLL_NAME)

@Component({
  components: { CardCatalog, Card }
})
export default class extends Vue {
  @vuexModule.Getter
  getAchievements

  @vuexModule.Getter
  getDocsCount

  @vuexModule.Action
  nextPage

  @vuexModule.Action
  prevPage

  subtitle(item) {
    return item.organisation
  }

  async fetch({ store }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadAchievements`)
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

<i18n>
  {
    "en": {
      "title": "Achievements"
    },
    "ru": {
      "title": "Достижения"
    }
  }
</i18n>
