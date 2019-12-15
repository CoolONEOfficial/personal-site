<template>
  <div
    :class="['timeline-item', { hovered: hovered }]"
    @mouseenter="onItemHover"
  >
    <div class="timeline-marker is-image is-32x32" style="margin-top: 1em">
      <img
        :src="`icons/black/icons8-${icon}-50.png`"
        style="transform: scale(0.6)"
      />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {{
          $dateFns.format(item.date.getTime(), 'd MMMM yyyy', {
            locale: locales[$i18n.locale]
          })
        }}
      </p>
      <p>{{ item.title[$i18n.locale] }}</p>
      <h2
        v-show="Boolean(subtitle)"
        class="subtitle is-size-7 has-margin-bottom-10"
      >
        {{ subtitle }}
      </h2>
      <div class="content reverse">
        <div
          :class="[
            { columns: item.singleImage },
            { reverse: !$device.isMobile && item.singleImage && itemRtl },
            'is-marginless-horizontal'
          ]"
        >
          <div class="column is-paddingless">
            <Images :item="item" v-if="item.images" />
            <SingleImage :item="item" v-else-if="item.singleImage" />
          </div>
          <div class="column is-paddingless">
            <Description v-if="item.description" :item="item" />
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
import { isRtl, TimelineItem } from "~/types/timeline";
import { namespace } from '~/node_modules/nuxt-property-decorator'
import SingleImage from '~/components/timeline/items/content/SingleImage.vue'
import Images from '~/components/timeline/items/content/Images.vue'
import Description from '~/components/timeline/items/content/Description.vue'

const vuexModule = namespace('timeline')

@Component({
  components: { Description, Images, SingleImage }
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
.reverse {
  flex-direction: row-reverse;
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
}

.timeline-item {
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

  box-shadow: inset 0 8px 0 0 white, inset 0 -8px 0 0 white;

  transition-duration: 1200ms;
  transition-property: padding-left, padding-right, background-color;

  &.hovered {
    @media only screen and (min-width: 769px) {
      padding-left: 30px;
      padding-right: 30px;
    }
    background-color: $white-ter;
    .content {
      max-height: 400px;
      opacity: 1;
      transition: max-height 1.2s 0s, opacity 0.5s linear 0.5s;
    }
  }
}
</style>
