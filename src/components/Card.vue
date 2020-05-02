<template>
  <div class="card">
    <div v-if="itemImage" class="card-image">
      <Picture
        v-model="itemImage.small"
        @click="isModalActive = true"
        alt="Card general image"
        fit="cover"
      />
      <b-modal
        :can-cancel="['escape', 'x']"
        :active.sync="isModalActive"
        trap-focus
        animation="zoom-in"
      >
        <Picture
          class="modal-image"
          v-model="itemImage.original"
          fit="contain"
          alt="Modal card image"
        />
      </b-modal>
    </div>
    <div
      :class="
        `card-content hover-${getTheme.name === 'white' ? 'dark' : 'light'}`
      "
    >
      <div class="media">
        <div class="media-left" v-if="item.logo">
          <Picture
            class="image is-48x48"
            v-model="item.logo.small"
            alt="Card logo image"
            fit="contain"
          />
        </div>
        <div class="media-content">
          <p class="title is-4">{{ item.title[$i18n.locale] }}</p>
          <p class="subtitle is-6">{{ subtitle }}</p>
        </div>
        <nuxt-link
          class="icon-wrapper"
          :to="
            localePath({
              name: `${item._type}-doc`,
              params: { doc: item.urlName ? item.urlName : item._doc }
            })
          "
        >
          <b-icon
            :class="['icon-hover']"
            :icon="`chevron-right`"
            size="is-medium"
          />
        </nuxt-link>
      </div>

      <div class="content">
        <div
          v-if="item.descriptionHtml"
          class="has-text-justified markdown"
          v-html="item.descriptionHtml[$i18n.locale]"
        />
        <br />
        <nav class="level is-mobile">
          <div class="level-left">
            <time :datetime="item.date.toDateString()">{{
              $dateFns.format(item.date.getTime(), 'd MMMM yyyy', {
                locale: locales[$i18n.locale]
              })
            }}</time>
          </div>
          <div class="level-right">
            <Tags v-model="item.tags" />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Prop, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'
import { TimelineAchievement } from '~/types/items/achievement'
import Picture from '~/components/Picture.vue'
import Tag from '~/components/Tag.vue'
import Tags from '~/components/Tags.vue'

@Component({
  components: { Tags, Tag, Picture }
})
export default class extends Vue {
  @Prop({ required: true })
  item!: TimelineAchievement

  @Getter
  getTheme

  @Prop({ required: true })
  subtitle!: String

  locales = {
    en: enUS,
    ru
  }

  isModalActive = false

  get itemImage() {
    if (this.item.singleImage) return this.item.singleImage

    if (this.item.images) return this.item.images[0]

    return
  }
}
</script>

<style lang="scss">
.icon-wrapper {
  margin-top: auto;
  margin-bottom: auto;
}

.card-image {
  max-height: 20vh;
  overflow: hidden;
}
</style>
