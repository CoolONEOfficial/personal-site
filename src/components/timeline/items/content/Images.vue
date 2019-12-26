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
          <Picture
            class="item-image is-marginless"
            :src="i.small"
            fit="cover"
          />
        </slide>
      </carousel>
      <b-modal :active.sync="isModalActive" animation="zoom-in">
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
            <Picture class="modal-image" :src="i.original" fit="contain" />
          </slide>
        </carousel>
      </b-modal>
    </client-only>
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

  isModalActive = false

  onClickImage(index) {
    this.navigateTo = [index, false]
    this.isModalActive = true
  }

  navigateTo: any = 0

  get itemRtl() {
    return isRtl(this, this.item)
  }
}
</script>

<style scoped lang="scss">
.item-image {
  height: 100%;
  width: 100%;
}

.carousel {
  background: $grey-lighter;
  height: 280px;
}
</style>
