<template>
  <Videos :page-item="getProjectPage" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import Description from '~/components/hero/Description.vue'
import Photos from '~/components/hero/Photos.vue'
import Videos from '~/components/hero/Videos.vue'
import { VUEX_NAMES } from "~/util/constants";

const vuexModule = namespace(VUEX_NAMES.PROJECTS)

@Component({
  components: { Videos, Photos, Description }
})
export default class extends Vue {
  @vuexModule.Getter
  getProjectPage
}
</script>
