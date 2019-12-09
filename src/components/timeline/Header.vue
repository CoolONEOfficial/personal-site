<template>
  <div class="timeline-header">
    <div
      class="tag is-medium is-primary"
      :style="$device.isMobile ? 'position: relative; left: 30px' : ''"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {

}
</script>

<style scoped lang="scss"></style>
