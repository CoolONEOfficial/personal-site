<template>
  <Description :page-item="getBookPage" :subtitle="getBookPage.author" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import Description from '~/components/hero/Description.vue'
import { VUEX_NAMES } from "~/util/constants";
const vuexModule = namespace(VUEX_NAMES.BOOKS)

@Component({
  components: { Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getBookPage
}
</script>

<style scoped lang="scss"></style>
