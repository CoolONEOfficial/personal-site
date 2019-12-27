<template>
  <section class="hero is-fullheight">
    <b-modal :active.sync="isModalActive" animation="zoom-in">
      <carousel
        class="show-overflow"
        :navigate-to="navigateTo"
        :per-page="1"
        :pagination-enabled="false"
      >
        <slide v-for="(i, index) of images" :key="index">
          <img class="modal-image" :src="i.original" />
        </slide>
      </carousel>
    </b-modal>
    <client-only>
      <carousel
        v-model="carouselModel"
        class="welcome-background"
        :perPage="1"
        :scroll-per-page="true"
        :pagination-enabled="false"
      >
        <slide v-for="(i, index) of images" :key="index">
          <Picture
            class="welcome-background-image"
            :src="i.small"
            :alt="`Background image of welcome screen №${index + 1}`"
          />
        </slide>
      </carousel>
    </client-only>
    <div class="hero-body">
      <div :class="['container', { 'has-text-centered': $device.isMobile }]">
        <div class="columns">
          <client-only>
            <carousel
              v-model="carouselModel"
              :class="[
                'welcome-carousel',
                { 'welcome-carousel-mobile': $device.isMobile }
              ]"
              :perPage="1"
              :scroll-per-page="true"
              :pagination-enabled="false"
              :autoplay="autoplay"
              :autoplay-timeout="CAROUSEL_INTERVAL"
              :autoplay-hover-pause="true"
              :loop="true"
            >
              <slide
                v-for="(i, index) of images"
                :key="index"
                @slide-click="onImageClick(index)"
              >
                <Picture
                  class="image is-128x128 welcome-carousel-image"
                  :src="i.small"
                  :alt="`Carousel image of welcome screen №${index + 1}`"
                />
              </slide>
            </carousel>
          </client-only>
          <div
            :class="[
              'welcome-text',
              { 'has-margin-left-20': !$device.isMobile }
            ]"
          >
            <p class="title has-margin-top-30">{{ $t('initials') }}</p>
            <p class="subtitle">{{ $t('developer') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <a href="#" v-scroll-to="'#main-content'">
        <b-icon
          :class="['welcome-scroll', 'icon-hover', 'has-margin-bottom-15']"
          icon="chevron-down"
          size="is-medium"
        />
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { CAROUSEL_INTERVAL, LOGO_IMAGE } from "~/util/constants";
import Picture from '~/components/Picture.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { Picture }
})
export default class extends Vue {
  @vuexModule.Action
  initImageItems

  @vuexModule.Getter
  getImageItems

  carouselModel = 0

  navigateTo: any = 0

  get autoplay() {
    return !this.isModalActive
  }

  isModalActive = false

  images = [
    {
      original: LOGO_IMAGE,
      small: LOGO_IMAGE
    }
  ]

  onImageClick(index) {
    this.navigateTo = [index, false]
    this.isModalActive = true
  }

  get CAROUSEL_INTERVAL() {
    return CAROUSEL_INTERVAL
  }

  randomInt(limit) {
    return Math.floor(Math.random() * limit)
  }

  randomItem(arr: any[]) {
    return arr[this.randomInt(arr.length)]
  }

  // @Watch('carouselModel')
  // onCarouselModelChanged(newVal, prevVal) {
  //   if (this.interval != undefined) clearInterval(this.interval)
  //   this.interval = setInterval(this.addRandomImage, CAROUSEL_INTERVAL)
  // }

  addRandomImage() {
    this.images.push(
      this.randomItem(this.randomItem(this.getImageItems).images)
    )
    this.carouselModel = this.images.length - 1
  }

  mounted() {
    this.initImageItems()

    for (let i = 0; i < 5; i++) this.addRandomImage()
  }
}
</script>

<style scoped lang="scss">
.welcome {
  &-scroll {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  &-background {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    &-image {
      width: 100vw !important;
      height: 100vh !important;

      & img {
        object-fit: cover;
      }
      filter: blur(15px) grayscale(50%) opacity(25%);
    }
  }

  &-carousel {
    width: 128px;
    height: 128px;
    clip-path: circle(50% at 50% 50%);

    &-image {
      clip-path: circle(50% at 50% 50%);
      border-radius: 50%;

      & img {
        object-fit: cover;
      }
    }

    &-mobile {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &-text {
    position: relative;
    top: 50%;
  }
}
</style>

<i18n>
  {
    "en": {
      "initials": "Nickolay Trukhin",
      "developer": "Web & Mobile developer"
    },
    "ru": {
      "initials": "Николай Трухин",
      "developer": "Web & Mobile разработчик"
    }
  }
</i18n>
