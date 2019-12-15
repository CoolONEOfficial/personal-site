import { enUS } from "date-fns/locale";import { ru } from "date-fns/locale";
<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="itemImage" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">John Smith</p>
          <p class="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br />
        <time :datetime="item.date.toDateString()">{{
          $dateFns.format(item.date.getTime(), 'd MMMM yyyy', {
            locale: locales[$i18n.locale]
          })
        }}</time>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TimelineItem } from '~/types/timeline'
import { enUS, ru } from 'date-fns/locale'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  item!: TimelineItem

  locales = {
    en: enUS,
    ru
  }

  get itemImage() {
    if (this.item.singleImage) return this.item.singleImage.small

    if (this.item.images) return this.item.images[0].small

    return
  }
}
</script>

<style scoped lang="scss"></style>
