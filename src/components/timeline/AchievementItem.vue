<template>
  <Item :item="item" :icon="item.icon">
    achievement content
  </Item>
  <!--  <div class="timeline-item">-->
  <!--    <div class="timeline-marker is-image is-32x32">-->
  <!--      <img-->
  <!--        :src="`icons/black/icons8-${item.icon}-50.png`"-->
  <!--        style="transform: scale(0.6)"-->
  <!--      />-->
  <!--    </div>-->
  <!--    <div class="timeline-content">-->

  <!--      <p class="heading">-->
  <!--        {{-->
  <!--          $dateFns.format(item.date.seconds * 1000, 'd MMMM yyyy', {-->
  <!--            locale: locales[$i18n.locale]-->
  <!--          })-->
  <!--        }}-->
  <!--      </p>-->
  <!--      <p>{{ item.title[$i18n.locale] }}</p>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineAchievement } from '~/types/timeline'
import Item from '~/components/timeline/Item.vue'

@Component({
  components: { Item }
})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineAchievement
}
</script>

<style scoped lang="scss"></style>
