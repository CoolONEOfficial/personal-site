<template>
  <div>
    <client-only placeholder="Loading...">
      <carousel
        class="carousel"
        :perPageCustom="[[1024, 3]]"
        :scroll-per-page="false"
        :pagination-enabled="false"
        :navigate-to="[
          itemRtl ? item.images.length - ($device.isMobile ? 2 : 3) : 0,
          false
        ]"
      >
        <slide
          v-for="(i, index) of itemRtl
            ? item.images.slice().reverse()
            : item.images"
          :key="index"
          @slide-click="onClickImage(index)"
        >
          <img class="item-image" :src="i.small" />
        </slide>
      </carousel>
      <b-modal :active.sync="isImageModalActive" animation="zoom-in">
        <carousel
          class="show-overflow"
          :navigate-to="navigateTo"
          :per-page="1"
          :pagination-enabled="false"
        >
          <slide
            v-for="(i, index) of itemRtl
              ? item.images.slice().reverse()
              : item.images"
            :key="index"
          >
            <img class="modal-image" :src="i.original" />
          </slide>
        </carousel>
      </b-modal>
    </client-only>
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

  isImageModalActive = false

  onClickImage(index) {
    this.navigateTo = [index, false]
    this.isImageModalActive = true
  }

  navigateTo: any = 0

  get itemRtl() {
    return !this.$device.isMobile && this.item.orderId % 2 !== 0
  }
}
</script>

<style scoped lang="scss">
.modal-image {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.item-image {
  object-fit: cover;
  height: 300px;
  width: 300px;
}

.carousel {
  background: $grey-lighter;
  height: 300px;
}
</style>
