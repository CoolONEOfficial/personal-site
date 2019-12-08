<template>
  <div class="timeline-item">
    <div class="timeline-marker is-image is-32x32">
      <img
        :src="`icons/black/icons8-${item.icon}-50.png`"
        style="transform: scale(0.6)"
      />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {{
          $dateFns.format(item.date.seconds * 1000, 'd MMMM yyyy', {
            locale: locales[$i18n.locale]
          })
        }}
      </p>
      <p>{{ item.title[$i18n.locale] }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineAchievement } from '~/types/timeline'
import { enUS, ru } from 'date-fns/locale'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineAchievement

  locales = {
    en: enUS,
    ru
  }
}
</script>

<style scoped lang="scss">
  .timeline-item {
    transition: 1s;
    will-change: height;
  }

  .timeline-item:hover {
    height: 300px;
  }
</style>
