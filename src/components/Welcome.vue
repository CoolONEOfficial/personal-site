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
        data-aos="fade"
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
            fit="cover"
            :limit-dialog-height="false"
            :alt="`Background image of welcome screen №${index + 1}`"
          />
        </slide>
      </carousel>
    </client-only>
    <div class="hero-head" data-aos="fade-down" data-aos-delay="2600">
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
    <div class="hero-body">
      <div :class="['container', { 'has-text-centered': $device.isMobile }]">
        <div class="columns">
          <client-only>
            <carousel
              :data-aos="$device.isMobile ? 'fade' : 'fade-right'"
              data-aos-delay="1000"
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
                  v-model="i.small"
                  fit="cover"
                  :alt="`Carousel image of welcome screen №${index + 1}`"
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
            <p class="title has-margin-top-30" data-aos="fade" data-aos-delay="2000">{{ $t('initials') }}</p>
            <p class="subtitle" data-aos="fade" data-aos-delay="2400">{{ $t('developer') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <a href="#" v-scroll-to="'#main-content'">
        <b-icon
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-delay="2600"
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
import { CAROUSEL_INTERVAL, IS_DEV, LOGO_IMAGE, VUEX_NAMES } from "~/util/constants";
import Picture from '~/components/Picture.vue'
import Icon from '~/components/Icon.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import ListResult = firebase.storage.ListResult;

const vuexModule = namespace(VUEX_NAMES.TIMELINE)

@Component({
  components: { ThemeSwitcher, LangSwitcher, Icon, Picture }
})
export default class extends Vue {
  carouselModel = 0

  navigateTo: any = 0

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

  mounted() {
    if(process.env.NODE_ENV === 'production') {
      (this as any).$fireStorage
        .ref()
        .child(`avatars`)
        .list().then(async (res: ListResult) => {

        const pairs = res.items.reduce(function(result, value, index, array) {
          if (index % 2 === 0)
            result.push(array.slice(index, index + 2) as never);
          return result;
        }, [])

        for (const item of pairs) {
          this.images.push({
            original: await (item[0] as any).getDownloadURL(),
            small: await (item[1] as any).getDownloadURL()
          })
        }
      })
    }
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
    left: calc(50% - 16px);
    bottom: 2rem;
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
        height: 100%;
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
        height: 100%;
      }
    }

    &-mobile {
      position: relative;
      left: calc(50% - 64px);
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
      "initials": "Nikolay Trukhin",
      "developer": "Web & Mobile developer"
    },
    "ru": {
      "initials": "Николай Трухин",
      "developer": "Web & Mobile разработчик"
    }
  }
</i18n>
