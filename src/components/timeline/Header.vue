<template>
  <div class="timeline-header">
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
@media only screen and (max-width: 768px) {
  position: relative;
  left: 55px;
}
</style>
