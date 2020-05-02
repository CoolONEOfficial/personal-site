<template>
  <div
    :class="['timeline-item', { hovered: hovered }]"
    @mouseenter="onItemHover"
  >
    <div class="timeline-marker is-image is-32x32">
      <Icon :icon="icon" fit="contain" alt="Item icon" />
    </div>
    <div class="timeline-content">
      <div
        :class="[
          'columns',
          'is-marginless',
          'is-paddingless',
          'head-content',
          { reverse: itemRtl }
        ]"
      >
        <div class="column is-marginless is-paddingless">
          <p class="heading">
            {{
              $dateFns.format(item.date.getTime(), 'd MMMM yyyy', {
                locale: locales[$i18n.locale]
              })
            }}
          </p>
          <h2 :class="`has-margin-${itemRtl ? 'left' : 'right'}-45`">
            {{ item.title[$i18n.locale] }}
          </h2>
          <p
            v-show="Boolean(subtitle)"
            class="subtitle is-size-7 has-margin-bottom-10"
          >
            {{ subtitle }}
          </p>
        </div>
        <div class="column is-marginless is-paddingless is-narrow">
          <nuxt-link
            :to="
              localePath({
                name: `${item._type}-doc`,
                params: { doc: item.urlName ? item.urlName : item._doc }
              })
            "
          >
            <b-icon
              :class="[
                'icon-open',
                `icon-open-${itemRtl ? 'left' : 'right'}`,
                'icon-hover'
              ]"
              :icon="`chevron-${itemRtl ? 'left' : 'right'}`"
              size="is-medium"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="content reverse">
        <div
          :class="[
            { 'columns justify-center': item.singleImage },
            { reverse: !$device.isMobile && item.singleImage && itemRtl },
            'is-marginless-horizontal'
          ]"
        >
          <Images
            :item="item"
            v-if="item.images"
            :class="{ 'content-item': item.singleImage && !$device.isMobile }"
          />
          <SingleImage
            :item="item"
            v-else-if="item.singleImage"
            :class="[
              {
                'has-padding-top-20 has-padding-bottom-20 content-item':
                  item.singleImage && !$device.isMobile
              }
            ]"
          />
          <div
            :class="[
              {
                'text-vertical-center content-item':
                  item.singleImage && !$device.isMobile
              }
            ]"
          >
            <Description v-if="item.descriptionHtml" :item="item" />
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, State, Vue } from 'nuxt-property-decorator'
import { enUS, ru } from 'date-fns/locale'
import { isRtl, TimelineItem } from '~/types/timeline'
import { namespace } from '~/node_modules/nuxt-property-decorator'
import SingleImage from '~/components/timeline/items/content/SingleImage.vue'
import Images from '~/components/timeline/items/content/Images.vue'
import Description from '~/components/timeline/items/content/Description.vue'
import Picture from '~/components/Picture.vue'
import Icon from '~/components/Icon.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { Icon, Picture, Description, Images, SingleImage }
})
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

  @vuexModule.State
  getState

  @vuexModule.Action
  updateHoveredItem

  get hovered() {
    return (
      this.$vnode.componentInstance &&
      this.$store.state.timeline.hoveredItem ==
        (this.$vnode.componentInstance as any)._uid
    )
  }

  onItemHover() {
    const key = (this.$vnode.componentInstance as any)._uid
    this.updateHoveredItem(key)
  }

  get itemRtl() {
    return isRtl(this, this.item)
  }
}
</script>

<style scoped lang="scss">
.head-content {
  width: 100%;
}

.text-vertical-center {
  margin-top: auto;
  margin-bottom: auto;
}

.icon-open {
  position: absolute;
  top: 2rem;
  opacity: 0;
  cursor: pointer;

  &-left {
    left: calc(1rem);
  }

  &-right {
    right: calc(1rem);
  }
}

.content {
  margin-left: -31px;

  width: calc(100vw - 33px);
  @media only screen and (min-width: 769px) {
    width: calc(50vw);
  }
  max-height: 0;
  opacity: 0;
  overflow: hidden;

  transition: max-height 1.2s 0.2s, opacity 0.2s linear 0s;

  &-item {
    max-width: 50%;
  }
}

.timeline {
  &-marker {
    margin-top: 1em;

    & .picture {
      position: relative;
      top: 55%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) scale(0.75);
    }
  }

  &-item {
    @media only screen and (min-width: 769px) {
      &:nth-of-type(even) {
        .content {
          margin-right: calc(-29.5px - 2em);
        }
      }

      &:nth-of-type(odd) {
        .content {
          margin-left: calc(-29.5px - 2em);
        }
      }
    }

    box-shadow: inset 0 8px 0 0 var(--background-color),
      inset 0 -8px 0 0 var(--background-color);

    transition-duration: 1200ms;
    transition-property: padding-left, padding-right, background-color;

    &.hovered {
      @media only screen and (min-width: 769px) {
        padding-left: 30px;
        padding-right: 30px;
      }
      background-color: rgba($white-ter, var(--timeline-background-opacity));

      .content {
        max-height: 500px;
        opacity: 1;
        transition: max-height 1.2s 0s, opacity 0.5s linear 0.5s;
      }

      .icon-open {
        opacity: 0.6;
      }
    }
  }
}
</style>
