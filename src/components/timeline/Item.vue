<template>
  <div class="timeline-item onhover">
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
      <h2 v-show="Boolean(subtitle)" class="subtitle is-size-7">{{ subtitle }}</h2>
      <div class="anim">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'
import { TimelineItem } from '~/types/timeline'

@Component({})
export default class extends Vue {
  @Prop({ default: {} })
  item!: TimelineItem

  @Prop()
  subtitle!: string

  @Prop()
  icon!: string

  locales = {
    en: enUS,
    ru
  }
}
</script>

<style scoped lang="scss">
.anim {
  height: 0;
  opacity: 0;
  transition-duration: 1200ms;
  transition-property: height, opacity;
  /*&:hover {*/
  /*  opacity: 1;*/
  /*  height: 300px;*/
  /*}*/
  /*transition-delay: 200ms;*/
}

  .onhover:hover {
    .anim {
      height: 300px;
      opacity: 1;
    }
  }
</style>
