<template>
  <div>
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

<style lang="scss">
#main-content {
  min-height: calc(100vh - 6em);
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Welcome from "~/components/Welcome.vue";

@Component({
  components: { Welcome, Footer, Header }
})
export default class extends Vue {
  get homepage() {
    console.log('page:', this.$nuxt.$route.path.substring(3))
    return this.$nuxt.$route.path.substring(3) === ''
  }

  head() {
    return {
      title: { locale: this.$i18n.locale }
    }
  }
}
</script>
