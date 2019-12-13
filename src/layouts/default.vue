<template>
  <div>
    <Header />

    <section class="main-content">
      <div id="app">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from "~/components/Header.vue";

@Component({
  components: { Header }
})
export default class extends Vue {}
</script>
