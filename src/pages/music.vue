<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title has-margin-bottom-20">
          {{ $t(getIsPlaying ? 'now' : 'last_played') }}
        </p>
        <figure
          :class="[
            'image',
            'image-centered',
            'has-margin-bottom-20',
            'music-image',
            { 'music-image-mobile': $device.isMobile }
          ]"
        >
          <Picture :src="getTrack.album.image" alt="Album picture" />
          <div
            style="display: flex"
            v-show="getIsPlaying && progress"
            :class="[
              'music-progress-wrapper'
            ]"
          >
            <div
              class="music-progress-start"
              :style="
                `width: ${(getTrackProgress / getTrack.durationMs) * 100}%;`
              "
            ></div>
            <div
              class="music-progress"
              :style="`animation-duration: ${getTrack.durationMs}ms`"
            />
          </div>
        </figure>
        <p class="title music-title">
          <a :href="getTrack.url">
            {{ getTrack.name }}
          </a>
        </p>
        <p class="subtitle">
          <a :href="i.url" v-for="(i, index) of getTrack.artists" :key="index">
            {{ index < getTrack.artists.length - 1 ? i.name + ', ' : i.name }}
          </a>
        </p>
        <vue-plyr
          :class="['music-play', {'music-play-disabled': !Boolean(getTrack.previewUrl)}]"
          :options="{
            controls: ['play']
          }"
        >
          <audio :src="getTrack.previewUrl" type="audio/mp3">
          </audio>
        </vue-plyr>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { COLL_NAMES } from '~/util/constants'
import { Track } from '~/types/music'
import { getMeta } from "~/util/seo";
import Picture from "~/components/Picture.vue";

const COLL_NAME = COLL_NAMES.MUSIC
const vuexModule = namespace(COLL_NAME)

@Component({
  components: { Picture }
})
export default class extends Vue {
  @vuexModule.Getter
  getTrack!: Track

  @vuexModule.Getter
  getTrackProgress

  @vuexModule.Getter
  getIsPlaying

  @vuexModule.Getter
  getIsConnected

  @vuexModule.Action
  loadMusic

  progress = true

  timer

  mounted() {
    this.updateData()
  }

  updateData() {
    const time = this.getIsPlaying
      ? this.getTrack.durationMs - this.getTrackProgress
      : 15000
    console.log('interval: ', time)
    const that = this
    this.timer = setTimeout(async function tick() {
      clearTimeout(that.timer)
      console.log('timer action!')
      that.progress = false
      await that.loadMusic()
      that.progress = true
      that.updateData()
    }, time)
  }

  async fetch({ store, params }) {
    try {
      await store.dispatch(`${COLL_NAME}/loadMusic`)
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: { title: this.$t('title'), locale: this.$i18n.locale },
      meta: getMeta(
        this.$i18n.locale,
        this.getTrack.album.image,
        this.$t('title') as string,
        undefined
      )
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes progressAnim {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.music {
  &-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  &-image {
    width: 40vh;
    height: 40vh;

    &-mobile {
      width: 30vh;
      height: 30vh;
    }
  }

  &-play {
    overflow: hidden;
    width: 52px;
    position: relative;
    left: 50%;
    transform: translateX(-50%) scale(2);
    transition: opacity 1s linear;

    &-disabled {
      opacity: .6;
      pointer-events: none;
    }
  }

  &-progress,
  &-progress-start {
    height: 5px;
    background-color: $primary;
  }

  &-progress {
    margin-left: -1px;
    animation-name: progressAnim;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
}
</style>

<i18n>
  {
    "en": {
      "title": "Music",
      "now": "Real time playable track",
      "last_played": "Last track played"
    },
    "ru": {
      "title": "Музыка",
      "now": "Этот трек я слушаю в данный момент",
      "last_played": "Последний прослушанный трек"
    }
  }
</i18n>
