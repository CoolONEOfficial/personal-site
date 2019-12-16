<template>
  <div :class="['container', { 'is-loading': isLoading }]">
    <div
      :class="[
        'columns',
        'is-multiline',
        `columns-${$device.isMobile ? 'mobile' : 'desktop'}`
      ]"
    >
      <div
        class="column is-one-third"
        v-for="(_, index) of new Array(paginationCount / 2)"
        :key="index"
        data-aos="fade"
      >
        <AchievementCard
          v-for="(i, cardIndex) of [
            getAchievements[index],
            getAchievements[paginationCount / 2 + index]
          ].filter(Boolean)"
          :key="cardIndex"
          :item="i"
          class="has-margin-top-20"
        />
      </div>
    </div>

    <b-pagination
      v-if="getDocsCount > paginationCount"
      :total="getDocsCount"
      :current.sync="currentPage"
      :per-page="paginationCount"
      order="is-centered"
      size="is-small"
    />
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue, Watch } from 'nuxt-property-decorator'
import AchievementCard from '~/components/cards/AchievementCard.vue'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import { PAGINATION_COUNT } from '~/util/constants'

const vuexModule = namespace('achievements')

@Component({
  components: { AchievementCard }
})
export default class extends Vue {
  @vuexModule.Getter
  getAchievements

  @vuexModule.Getter
  getDocsCount

  @vuexModule.Action
  nextPage

  @vuexModule.Action
  prevPage

  @Watch('currentPage')
  async onCurrentPageChanged(newVal, prevVal) {
    console.log('new curr: ', newVal, ', prev: ', prevVal)

    const diff = Math.abs(newVal - prevVal)

    this.isLoading = true
    for (let i = 0; i < diff; i++) {
      await (newVal > prevVal ? this.nextPage() : this.prevPage())
    }
    this.isLoading = false
  }

  currentPage = 1

  isLoading = false

  get paginationCount() {
    return PAGINATION_COUNT
  }

  @vuexModule.Getter
  getCurrentPage

  async fetch({ store, app }) {
    try {
      await store.dispatch('achievements/loadAchievements')
    } catch (e) {
      console.error('error! ', e)
    }
  }

  head() {
    return {
      title: { title: this.$t('title'), locale: this.$i18n.locale }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  transition: opacity 1s;
}
.is-loading {
  opacity: 0.5;
}

.columns-desktop {
  min-height: calc(100vh - 3.5rem - 80px);
}

.columns-mobile {
  min-height: calc(100vh - 5rem - 25px);
}
</style>

<i18n>
  {
    "en": {
      "title": "Achievements"
    },
    "ru": {
      "title": "Достижения"
    }
  }
</i18n>
