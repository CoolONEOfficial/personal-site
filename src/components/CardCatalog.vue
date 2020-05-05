<template>
  <div :class="['container', { 'is-loading': isLoading }, `columns-${$device.isMobile ? 'mobile' : 'desktop'}`]">
    <div :class="['columns']">
      <div
        class="column is-one-third"
        v-for="(_, index) of Array(paginationCount / 2)"
        :key="index"
      >
        <Card
          v-for="(i, index) of [
                      items[index],
                      items[paginationCount / 2 + index]
                  ]"
          :key="index"
          v-if="i"
          :item="i"
          :subtitle="itemSubtitle(i)"
          :class="`has-margin-top-${$device.isMobile ? 10 : 25}`"
        />
      </div>
    </div>

    <b-pagination
      v-if="docsCount > paginationCount"
      :total="docsCount"
      :current.sync="currentPage"
      :per-page="paginationCount"
      order="is-centered"
      size="is-small"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PAGINATION_COUNT } from '~/util/constants'
import { Watch } from '~/node_modules/nuxt-property-decorator'
import Card from '~/components/Card.vue'
import { TIMELINE_SUBTITLE_MAP } from "~/util/store";

@Component({
  components: { Card }
})
export default class extends Vue {
  @Prop()
  items

  itemSubtitle(item) {
    return TIMELINE_SUBTITLE_MAP[item._type](this, item)
  }

  @Prop()
  docsCount

  @Prop()
  onNextPage

  @Prop()
  onPrevPage

  @Watch('currentPage')
  async onCurrentPageChanged(newVal, prevVal) {
    const diff = Math.abs(newVal - prevVal)

    this.isLoading = true
    for (let i = 0; i < diff; i++) {
      await (newVal > prevVal ? this.onNextPage() : this.onPrevPage())
    }
    this.isLoading = false
  }

  isLoading = false

  currentPage = 1

  get paginationCount() {
    return PAGINATION_COUNT
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

<i18n src="~/lang/projectsTypes.json" />

<i18n src="~/lang/eventsTypes.json" />
