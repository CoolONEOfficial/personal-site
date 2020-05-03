<template>
  <CardCatalog
    :docs-count="getDocsCount"
    :on-next-page="nextPage"
    :on-prev-page="prevPage"
    :items="this.getItems"
    :item-subtitle="subtitle"
  />
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
  import { namespace } from '~/node_modules/nuxt-property-decorator'
  import { VUEX_NAMES } from "~/util/constants";
  import Card from '~/components/Card.vue'
  import CardCatalog from '~/components/CardCatalog.vue'
  import { getMeta } from "~/util/seo";

  const VUEX_NAME = VUEX_NAMES.TAG_ITEMS
  const vuexModule = namespace(VUEX_NAME)

  @Component({
    components: { CardCatalog, Card }
  })
  export default class extends Vue {
    @vuexModule.Getter
    getDocsCount

    @vuexModule.Getter
    getItems

    @vuexModule.Action
    loadItems

    @vuexModule.Action
    nextPage

    @vuexModule.Action
    prevPage

    async fetch({ store, params }) {
      try {
        await store.dispatch(`${VUEX_NAME}/loadItems`, params.tag)
      } catch (e) {
        console.error('error! ', e)
      }
    }

    head() {
      const title = this.$t('title') + this.$route.params.tag
      return {
        title: { title: title, locale: this.$i18n.locale },
        meta: getMeta(
          this.$i18n.locale,
          undefined,
          title as string,
          undefined
        )
      }
    }
  }
</script>

<i18n src="~/lang/tag_items.json" />
