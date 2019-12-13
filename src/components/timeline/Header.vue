<template>
  <div :class="['timeline-header', { 'timeline-header-top': emojiTop }]">
    <div
      :class="[
        'tag',
        'hover-dark',
        'is-medium',
        'is-primary',
        { 'left-position': $device.isMobile }
      ]"
    >
      <span :class="['emoji', { 'emoji-top': emojiTop }]">
        {{ emoji }}
      </span>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  emoji!: string

  @Prop({ default: false })
  emojiTop!: boolean
}
</script>

<style scoped lang="scss">
.left-position {
  padding-left: 0 !important;
  position: absolute;
  left: 30px;
}

.timeline-header {
  height: 30px;

  &-top {
    height: 20px;
  }
}

.emoji {
  font-size: 2.5rem;
  margin-right: 12px;
  margin-left: -18px;

  &-top {
    margin-bottom: 20px;
  }
}
</style>
