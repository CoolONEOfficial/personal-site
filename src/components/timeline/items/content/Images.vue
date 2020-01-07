<template>
  <div>
    <client-only placeholder="Loading...">
      <carousel
        class="images-carousel"
        :perPageCustom="item.images.length > 2 ? [[1024, 3]] : []"
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
            class="images-image is-marginless"
            v-model="i.small"
            fit="cover"
            :alt="`Timeline carousel image №${index + 1}`"
          />
        </slide>
      </carousel>
      <b-modal :can-cancel="['escape', 'x']" :active.sync="isModalActive" trap-focus animation="zoom-in">
        <carousel
          class="show-overflow"
          :navigate-to="navigateTo"
          :per-page="1"
          :pagination-enabled="false"
        >
          <slide
            class="images-slide"
            v-for="(i, index) of itemRtl
              ? item.images.slice().reverse()
              : item.images"
            :key="index"
          >
            <Picture
              class="modal-image"
              v-model="i.original"
              fit="contain"
              :alt="`Timeline modal image №${index + 1}`"
            />
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
.images {
  &-carousel {
    background: rgba(127, 127, 127, .25);
    height: 280px;
  }

  &-image {
    height: 280px;
    width: 100%;
  }
}
</style>
