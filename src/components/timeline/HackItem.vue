<template>
  <Item
    :item="item"
    :icon="iconMap[item.place]"
    :subtitle="item.location.title[$i18n.locale]"
  >
    <client-only placeholder="Loading...">
      <carousel
        :perPageCustom="[
          [768, 3],
          [1024, 4]
        ]"
        :pagination-enabled="false"
      >
        <slide v-for="(i, index) of item.images" :key="index">
          <img :src="i" @click="onClickImage(index)" />
        </slide>
      </carousel>
      <b-modal :active.sync="isImageModalActive">
        <carousel
          class="show-overflow"
          center-mode
          :navigate-to="navigateTo"
          :per-page="1"
          :pagination-enabled="false"
        >
          <slide
            v-for="(i, index) of item.images"
            :key="index"
            class="is-center"
          >
            <img :src="i" @click="isImageModalActive = true" />
          </slide>
        </carousel>
      </b-modal>
    </client-only>
  </Item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineHack } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineHack

  isImageModalActive = false

  onClickImage(index) {
    this.navigateTo = [index, false]
    this.isImageModalActive = true
  }

  navigateTo: any = 0

  iconMap = {
    1: 'gold-medal',
    2: 'silver-medal',
    3: 'bronze-medal'
  }
}
</script>

<style scoped lang="scss"></style>
