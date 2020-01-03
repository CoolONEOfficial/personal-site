<template>
  <div id="main-layout" :style="themeStyle">
    <Welcome v-if="homepage" />

    <Header :homepage="homepage" />

    <section id="main-content">
      <div id="app">
        <nuxt />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Welcome from '~/components/Welcome.vue'
import { getMeta } from '~/util/seo'
import { Jsonld } from '~/node_modules/nuxt-jsonld'

@Jsonld
@Component({
  components: { Welcome, Footer, Header }
})
export default class extends Vue {
  get homepage() {
    const page = this.$nuxt.$route.name
    console.log('page name:', page)
    return page && page.includes('index')
  }

  head() {
    const locale = this.$i18n.locale
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      title: { locale },
      // @ts-ignore
      meta: [...getMeta(locale), ...i18nSeo.meta]
    }
  }

  @Getter
  getTheme

  get themeStyle() {
    const theme = this.getTheme
    return {
      '--background-color': theme.schemeColor,
      '--text-color': theme.textColor,
      '--timeline-background-opacity': theme.timelineBackgroundOpacity,
      '--timeline-line': theme.timelineItemLine,
      '--navbar-background': theme.navbarBackground,
      '--pagination-current-background': theme.paginationCurrentBackground
    }
  }

  @Action
  initTheme

  mounted() {
    this.initTheme()
  }
}
</script>

<style lang="scss">
#main {
  &-content {
    min-height: calc(100vh - 6em);
    padding-top: 5rem;
  }

  &-layout {
    transition: background-color 250ms;
    background-color: var(--background-color);
  }
}
</style>
