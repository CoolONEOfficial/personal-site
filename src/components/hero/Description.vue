<template>
  <div
    :class="
      $device.isMobile
        ? [
            'hero-head',
            'has-padding-left-15',
            'has-padding-right-15',
            'has-margin-bottom-10'
          ]
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
          <div
            :class="['has-margin-bottom-20', { columns: pageItem.singleImage }]"
          >
            <Picture
              v-if="!$device.isMobile && pageItem.logo"
              v-model="pageItem.logo.small"
              :class="[
                'image',
                'is-128x128',
                'description-logo',
                { 'has-margin-bottom-30': !pageItem.singleImage },
                { 'image-centered': !pageItem.singleImage }
              ]"
              fit="contain"
              alt="Hero description image"
            />

            <div class="column">
              <h1 class="title">
                {{ pageItem.title[$i18n.locale] }}
              </h1>
              <h2 v-if="subtitle" class="subtitle">
                {{ subtitle }}
              </h2>
              <div
                :class="[
                  'description-links',
                  'columns',
                  'is-marginless',
                  'is-mobile',
                  {
                    'description-links-left':
                      pageItem.singleImage && !$device.isMobile
                  },
                  { 'is-centered': !pageItem.singleImage || $device.isMobile }
                ]"
              >
                <a
                  v-for="([key, value], index) of Object.entries(linksMap)"
                  :key="index"
                  :href="pageItem[key]"
                  v-if="pageItem[key]"
                  :class="{ 'has-margin-bottom-20': !pageItem.singleImage }"
                >
                  <Icon
                    class="image is-32x32 icon-hover description-icon"
                    :icon="value"
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            v-if="pageItem.descriptionHtml"
            class="has-text-justified markdown has-padding-bottom-20"
            v-html="pageItem.descriptionHtml[$i18n.locale]"
          />
          <nav class="level is-mobile" v-if="pageItem.descriptionHtml">
            <div class="level-left">
              <time :datetime="pageItem.date.toDateString()"
                >{{
                  $dateFns.format(pageItem.date.getTime(), 'd MMMM yyyy', {
                    locale: locales[$i18n.locale]
                  })
                }}
              </time>
            </div>
            <div class="level-right">
              <Tags v-model="pageItem.tags" :max="$device.isMobile ? 2 : 4" />
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
import Icon from '~/components/Icon.vue'
import Tags from '~/components/Tags.vue'

@Component({
  components: { Tags, Icon, Tag, Picture }
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

  linksMap = {
    github: 'octocat',
    googlePlay: 'google-play',
    appStore: 'apple-app-store',
    site: 'website'
  }
}
</script>

<style lang="scss">
.description {
  &-links {
    margin-top: 1rem !important;

    &-left {
      margin-left: -0.25rem !important;
      margin-top: -1rem !important;
    }
  }

  &-image {
    object-fit: contain;
    max-height: 60vh;
    max-width: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    &-desktop {
      margin-left: 2rem;
      height: 80vh;
      max-width: 40vw;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-icon {
    padding: 0 !important;
    margin: 0.25em !important;
  }
}

.small-width {
  max-width: 33vw !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
