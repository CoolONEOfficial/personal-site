<template>
  <div class="timeline-item">
    <div class="timeline-marker is-image is-32x32">
      <img
        :src="`icons/black/icons8-${icon}-50.png`"
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
import { TimelineProject } from '~/types/timeline'
import { enUS, ru } from 'date-fns/locale'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineProject

  locales = {
    en: enUS,
    ru
  }

  get icon() {
    switch (this.item.category) {
      case 'game':
        return 'game-controller'
      case 'mobile_app':
        return 'smartphone-tablet'
    }
    return
  }
}
</script>

<style scoped lang="scss"></style>
