<template>
  <div
    :class="
      $device.isMobile
        ? ['hero-head', 'has-padding-left-15', 'has-padding-right-15']
        : ['hero-body']
    "
  >
    <div :class="['container', { 'has-text-centered': !pageItem.singleImage }]">
      <div :class="['columns', 'is-multiline', { 'is-6': !$device.isMobile }]">
        <div
          :class="[
            'column',
            { 'small-width': !$device.isMobile && !pageItem.singleImage }
          ]"
        >
          <div :class="[{ columns: pageItem.singleImage }]">
            <Picture
              v-if="!$device.isMobile && pageItem.logo"
              v-model="pageItem.logo.small"
              :class="[
                'image',
                'is-128x128',
                'description-logo',
                'has-margin-bottom-30',
                { 'image-centered': !pageItem.singleImage }
              ]"
              fit="contain"
              alt="Hero description image"
            />

            <div class="column">
              <h1 class="title">
                {{ pageItem.title[$i18n.locale] }}
              </h1>
              <h2 v-if="subtitle" class="subtitle description-subtitle">
                {{ subtitle }}
              </h2>
            </div>
          </div>
          <div
            v-if="pageItem.descriptionHtml"
            class="has-text-justified markdown"
            v-html="pageItem.descriptionHtml[$i18n.locale]"
          />
          <br />
          <nav class="level" v-if="pageItem.descriptionHtml">
            <div class="level-left">
              <time :datetime="pageItem.date.toDateString()">{{
                $dateFns.format(pageItem.date.getTime(), 'd MMMM yyyy', {
                  locale: locales[$i18n.locale]
                })
              }}</time>
            </div>
            <div class="level-right">
              <b-taglist attached class="is-marginless">
                <Tag v-for="(i, index) of pageItem.tags" :key="index">
                  {{ i }}
                </Tag>
              </b-taglist>
            </div>
          </nav>
        </div>
        <div class="column" v-if="pageItem.singleImage">
          <Picture
            v-model="pageItem.singleImage.original"
            :class="[
              'description-image',
              { 'description-image-desktop': !$device.isMobile }
            ]"
            fit="contain"
            alt="Description page image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'
import Picture from '~/components/Picture.vue'
import Tag from '~/components/Tag.vue'

@Component({
  components: { Tag, Picture }
})
export default class extends Vue {
  @Prop({ required: true })
  pageItem

  @Prop({ required: true })
  subtitle

  locales = {
    en: enUS,
    ru
  }
}
</script>

<style lang="scss">
.description {
  &-image {
    object-fit: contain;
    max-height: 60vh;
    max-width: 40vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &-desktop {
      height: 80vh;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-subtitle {
    margin-bottom: 0.5rem !important;
  }
}

.small-width {
  max-width: 33vw !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
