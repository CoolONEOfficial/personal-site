<template>
  <div class="timeline-item">
    <div :class="['timeline-marker', { 'is-image is-32x32': Boolean(icon) }]">
      <img
        :src="`icons/black/icons8-${icon}-50.png`"
        style="transform: translateY(-4px) scale(0.9)"
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
      <h2 class="subtitle is-size-7">{{ item.author }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineHack } from '~/types/timeline'
import { enUS, ru } from 'date-fns/locale'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineHack

  locales = {
    en: enUS,
    ru
  }

  get icon() {
    switch (this.item.place) {
      case 1:
        return 'gold-medal'
      case 2:
        return 'silver-medal'
      case 3:
        return 'bronze-medal'
    }
    return
  }
}
</script>

<style scoped lang="scss"></style>
