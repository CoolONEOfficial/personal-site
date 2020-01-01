<template>
  <section class="hero is-fullheight">
    <b-modal :active.sync="isModalActive" trap-focus animation="zoom-in">
      <carousel
        class="show-overflow"
        :navigate-to="navigateTo"
        :per-page="1"
        :pagination-enabled="false"
      >
        <slide v-for="(i, index) of images" :key="index">
          <Picture
            class="modal-image"
            v-model="i.original"
            fit="contain"
            :alt="`Modal welcome image №${index + 1}`"
          />
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
        :touch-drag="false"
        :mouse-drag="false"
      >
        <slide v-for="(i, index) of images" :key="index">
          <Picture
            class="welcome-background-image"
            v-model="i.small"
            :alt="`Background image of welcome screen №${index + 1}`"
            data-aos="fade"
          />
        </slide>
      </carousel>
    </client-only>
    <div class="hero-head">
      <div
        :class="[
          'columns',
          'is-mobile',
          'welcome-switcher-wrapper',
          { 'is-centered': $device.isMobile },
          { 'welcome-switcher-wrapper-desktop': !$device.isMobile }
        ]"
      >
        <ThemeSwitcher class="welcome-switcher" />
        <LangSwitcher class="welcome-switcher" />
      </div>
    </div>
    <div class="hero-body" data-aos="fade" data-aos-delay="1000">
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
              <slide v-for="(i, index) of images" :key="index">
                <Picture
                  class="image is-128x128 welcome-carousel-image"
                  v-model="i.small"
                  :alt="`Carousel image of welcome screen №${index + 1}`"
                  @click="onImageClick(index)"
                />
              </slide>
            </carousel>
          </client-only>
          <div
            :class="[
              'welcome-text',
              { 'has-margin-left-50': !$device.isMobile }
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
          :class="['welcome-scroll', 'icon-hover']"
          icon="chevron-down"
          size="is-medium"
          :color="getThemeInvert.textColor"
        />
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Getter, Vue, Watch } from 'nuxt-property-decorator'
import { Action, namespace } from '~/node_modules/nuxt-property-decorator'
import { CAROUSEL_INTERVAL, LOGO_IMAGE } from '~/util/constants'
import Picture from '~/components/Picture.vue'
import Icon from '~/components/Icon.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { ThemeSwitcher, LangSwitcher, Icon, Picture }
})
export default class extends Vue {
  carouselModel = 0

  navigateTo: any = 0

  @vuexModule.Action
  initImageItems

  @vuexModule.Getter
  getImageItems

  @Getter
  getTheme

  @Getter
  getThemeInvert

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
  &-switcher {
    margin: 1rem;

    &-wrapper {
      margin: 1rem !important;

      &-desktop {
        justify-content: flex-end;
      }
    }
  }

  &-scroll {
    position: relative;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
  }

  &-background {
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
