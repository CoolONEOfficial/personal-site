<template>
  <b-navbar
    id="nav"
    :class="[
      'header',
      'is-fixed-top',
      { 'is-transparent header-homepage': homepage }
    ]"
  >
    <template slot="brand">
      <b-navbar-item @click="onLogoClicked">
        <Picture
          v-model="headerSrc"
          alt="Header logo image"
          class="header-logo has-margin-right-10"
        />
        <div>
          <h1 class="title is-5">{{ $t('initials') }}</h1>
          <div class="columns is-marginless header-subtitle">
            <b-taglist attached class="is-marginless">
              <b-tag class="hover-light is-marginless" type="is-dark"
                >Web
              </b-tag>
              <b-tag class="hover-dark is-marginless" type="is-primary"
                >Mobile
              </b-tag>
            </b-taglist>
            <div class="tag-text">
              {{ $t('developer') }}
            </div>
          </div>
        </div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <HeaderItem v-for="(i, index) of items" :key="index" :item="i" />
    </template>
    <template slot="end">
      <b-navbar-item class="header-switcher-item header-switcher-item-mobile">
        <ThemeSwitcher class="header-switcher" />
        <LangSwitcher class="header-switcher" />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HeaderItem from '~/components/HeaderItem.vue'
import Picture from '~/components/Picture.vue'
import { Action } from '~/node_modules/nuxt-property-decorator'
import Icon from '~/components/Icon.vue'
import { ABOUT_DOCUMENT_ID } from '~/util/constants'
import ThemeSwitcher from "~/components/ThemeSwitcher.vue";
import LangSwitcher from "~/components/LangSwitcher.vue";

@Component({
  components: { LangSwitcher, ThemeSwitcher, Icon, Picture, HeaderItem }
})
export default class extends Vue {
  @Prop()
  homepage!: boolean

  get headerSrc() {
    return '/favicon.jpg'
  }

  items = [
    {
      title: 'achievements',
      icon: 'certificate',
      to: 'achievements'
    },
    {
      title: 'projects',
      icon: 'octocat',
      to: 'projects'
    },
    {
      title: 'books',
      icon: 'book',
      to: 'books'
    },
    {
      title: 'events',
      icon: 'calendar',
      to: 'events'
    },
    {
      title: 'music',
      icon: 'music',
      to: 'music'
    },
    {
      title: 'about',
      icon: 'info',
      to: {
        name: `projects-doc`,
        params: { doc: ABOUT_DOCUMENT_ID }
      }
    }
  ]

  mounted() {
    if (this.homepage)
      this.$nextTick(function() {
        window.addEventListener('scroll', function() {
          let navbar = document.getElementById('nav')
          let nav_classes = navbar!.classList
          if (document.documentElement.scrollTop >= window.innerHeight) {
            if (!nav_classes.contains('shrink')) {
              nav_classes.toggle('shrink')
            }
          } else {
            if (nav_classes.contains('shrink')) {
              nav_classes.toggle('shrink')
            }
          }
        })
      })
  }

  onLogoClicked() {
    this.$router.push(this.localePath('index'))
  }
}
</script>

<style lang="scss">
.header {
  position: relative;
  transition: top 1s, opacity 1s linear;

  &-switcher {
    margin: 1rem;

    &-item {
      background: unset !important;

      &-mobile {
        display: flex !important;
        justify-content: center;
      }
    }
  }

  &-homepage {
    top: -100% !important;
    opacity: 0 !important;

    &.shrink {
      top: 0 !important;
      opacity: 1 !important;
    }
  }

  .title {
    margin-bottom: 5px !important;
  }

  .last-tag {
    margin-right: 0.5rem !important;
  }

  .tag-text {
    color: var(--text-color) !important;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.6 !important;
  }

  &-logo {
    clip-path: circle(50% at 50% 50%);
    height: 56px;
    width: 56px;
  }

  &-subtitle {
    display: flex;
  }
}
</style>

<i18n>
  {
    "en": {
      "initials": "Nickolay Trukhin",
      "developer": "developer"
    },
    "ru": {
      "initials": "Николай Трухин",
      "developer": "разработчик"
    }
  }
</i18n>
