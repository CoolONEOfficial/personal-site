<template>
  <div>
    <img
      :class="[
        'item-image',
        { 'right-inset': !$device.isMobile && itemRtl },
        { 'left-inset': !$device.isMobile && !itemRtl }
      ]"
      :src="item.singleImage.small"
      @click="onImageClick"
    />
    <b-modal :active.sync="isModalActive" animation="zoom-in">
      <img class="modal-image" :src="item.singleImage.original" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'
import { isRtl, TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem

  isModalActive: boolean = false

  onImageClick() {
    this.isModalActive = true
  }

  get itemRtl() {
    return isRtl(this, this.item)
  }
}
</script>

<style scoped lang="scss">
.item-image {
  object-fit: cover;
  height: 300px;
  width: 100%;
  overflow: hidden;
}

.right-inset {
  padding-right: 0.5em !important;
}

.left-inset {
  padding-left: 0.5em !important;
}
</style>
