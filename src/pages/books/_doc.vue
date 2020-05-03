<template>
  <Hero :doc="$route.params.doc" :item="getBookPage">
    <nuxt />
  </Hero>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Hero from '~/components/Hero.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES, LOGO_IMAGE, TYPE_NAMES, VUEX_NAMES } from "~/util/constants";
import {
  getArticle,
  getLdBreadcrumbs,
  getMeta,
  getMetaPage,
  JSON_LD
} from '~/util/seo'
import { Jsonld } from '~/node_modules/nuxt-jsonld'
import { PageBook } from '~/types/items/book'

const VUEX_NAME = VUEX_NAMES.BOOKS
const vuexModule = namespace(VUEX_NAME)

@Jsonld
@Component({
  components: { Hero }
})
export default class extends Vue {
  @vuexModule.Getter
  getBookPage!: PageBook

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${VUEX_NAME}/loadBookPage`, params.doc)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: {
        title: this.getBookPage.title[this.$i18n.locale],
        locale: this.$i18n.locale
      },
      meta: getMetaPage(this.$i18n.locale, this.getBookPage)
    }
  }

  jsonld() {
    return getArticle(this, this.$i18n.locale, VUEX_NAME, this.getBookPage, {
      '@type': 'Book',
      author: this.getBookPage.author
    })
  }
}
</script>

<i18n src="~/lang/books.json" />
