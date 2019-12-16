<template>
  <div>
    <Header />

    <section class="main-content">
      <div id="app">
        <nuxt />
      </div>
    </section>

    <Footer />
  </div>
</template>

<style lang="scss">
.main-content {
  min-height: calc(100vh - 6em);
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

@Component({
  components: { Footer, Header }
})
export default class extends Vue {
  head() {
    return {
      title: { locale: this.$i18n.locale }
    }
  }
}
</script>
