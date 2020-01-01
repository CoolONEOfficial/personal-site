<template>
  <div>
    <Picture
      :class="[
        'item-image',
        'is-marginless',
        { 'right-inset': !$device.isMobile && itemRtl },
        { 'left-inset': !$device.isMobile && !itemRtl }
      ]"
      v-model="item.singleImage.small"
      fit="cover"
      @click="onImageClick"
      alt="Timeline image"
    />
    <b-modal :active.sync="isModalActive" trap-focus animation="zoom-in">
      <Picture
        class="modal-image"
        v-model="item.singleImage.original"
        fit="cover"
        alt="Timeline modal image"
      />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'
import { isRtl, TimelineItem } from '~/types/timeline'
import Picture from '~/components/Picture.vue'

@Component({
  components: { Picture }
})
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
  height: 280px;
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
