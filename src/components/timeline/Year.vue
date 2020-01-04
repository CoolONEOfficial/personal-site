<template>
  <header
    :class="['timeline-header', { 'left-position': $device.isMobile && item.date.length > 4 }]"
  >
    <span :class="['tag']">{{ item.date }}</span>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem
}
</script>

<style scoped lang="scss">
.left-position {
  position: relative;
  left: 24px;
}
</style>
