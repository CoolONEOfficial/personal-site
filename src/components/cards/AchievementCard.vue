<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="itemImage" class="achievement-image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="item.logo" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ item.title[$i18n.locale] }}</p>
          <p class="subtitle is-6">{{ item.organisation }}</p>
        </div>
      </div>

      <div class="content">
        <div
          class="description"
          v-html="$md.render(item.description[$i18n.locale])"
        />
        <br />
        <nav class="level">
          <div class="level-left">
            <time :datetime="item.date.toDateString()">{{
              $dateFns.format(item.date.getTime(), 'd MMMM yyyy', {
                locale: locales[$i18n.locale]
              })
            }}</time>
          </div>
          <div class="level-right">
            <b-taglist attached class="is-marginless">
              <b-tag
                class="hover-dark is-marginless"
                v-for="(i, index) of item.tags"
                :key="index"
              >
                {{ i }}
              </b-tag>
            </b-taglist>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'
import { TimelineAchievement } from '~/types/items/achievement'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ required: true })
  item!: TimelineAchievement

  locales = {
    en: enUS,
    ru
  }

  get itemImage() {
    if (this.item.singleImage) return this.item.singleImage.small

    if (this.item.images) return this.item.images[0].small

    return
  }

  onCardClicked() {
    this.$router.push(this.localePath(`/achievements/${this.item._doc}`))
  }
}
</script>

<style scoped lang="scss">
.achievement-image {
  object-fit: cover;
}
</style>
