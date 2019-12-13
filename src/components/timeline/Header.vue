<template>
  <div :class="['timeline-header', { 'left-position': $device.isMobile }]">
    <div class="tag is-medium is-primary">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {}
</script>

<style scoped lang="scss">
.left-position {
  position: relative;
  left: 55px;
}
</style>
