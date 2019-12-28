<template>
  <div
    :class="[
      'videos-wrapper',
      'hero-body',
      'has-padding-left-15',
      'has-padding-right-15'
    ]"
  >
    <client-only placeholder="Loading...">
      <carousel
        class="videos-carousel show-overflow"
        :per-page="1"
        :scroll-per-page="false"
        :pagination-enabled="true"
        pagination-active-color="#4a4a4a"
      >
        <slide v-for="(i, index) of pageItem.videos" :key="index">
          <vue-plyr :class="[{ 'videos-plyr-margins': $device.isDesktop }]">
            <div data-plyr-provider="youtube" :data-plyr-embed-id="i"></div>
          </vue-plyr>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from '~/node_modules/nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  pageItem

  onSlideClick(e) {
    e.preventDefault()
  }
}
</script>

<style lang="scss">
.videos {
  &-wrapper {
    min-width: 100%;
  }

  &-carousel {
    width: 100%;
  }

  &-plyr-margins {
    max-width: 60vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
