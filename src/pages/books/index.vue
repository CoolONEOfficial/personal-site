<template>
  <CardCatalog
    :docs-count="getDocsCount"
    :on-next-page="nextPage"
    :on-prev-page="prevPage"
    :items="getBooks"
    :item-subtitle="subtitle"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import Card from '~/components/Card.vue'
import CardCatalog from '~/components/CardCatalog.vue'
import { getMeta } from '~/util/seo'

const COLL_NAME = COLL_NAMES.BOOKS
const vuexModule = namespace(COLL_NAME)

@Component({
  components: { CardCatalog, Card }
})
export default class extends Vue {
  @vuexModule.Getter
  getBooks

  @vuexModule.Getter
  getDocsCount

  @vuexModule.Action
  nextPage

  @vuexModule.Action
  prevPage

  subtitle(item) {
    return item.author
  }

  async fetch({ store }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadBooks`)
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
      "title": "Books"
    },
    "ru": {
      "title": "Книги"
    }
  }
</i18n>
