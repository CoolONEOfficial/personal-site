<template>
  <div>
    <img
      class="item-image"
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
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem

  isModalActive: boolean = false

  onImageClick() {
    this.isModalActive = true
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
</style>
