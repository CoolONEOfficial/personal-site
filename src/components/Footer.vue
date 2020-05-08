<template>
  <footer class="footer has-margin-top-10">
    <div class="content">
      <div class="columns is-multiline">
        <div class="column has-margin-top-30">
          <p :class="['subscribe-text', { 'subscribe-text-left': !$device.isMobile }]">
            {{ $t('subscribe-updates') }}
          </p>
          <div :class="['icons', 'icons-left', { 'icons-mobile': $device.isMobile }]">
            <a v-for="(i, index) of channels" :key="index" :href="i.url.replace(/LANG/gi, $i18n.locale)">
              <Icon
                class="image is-32x32 icons-icon icon-hover"
                :icon="i.icon"
                fit="contain"
                alt="Footer social icon"
              />
            </a>
          </div>
        </div>
        <div class="column has-text-centered subtitle is-6 footer-text-wrapper">
          <p :class="[{'footer-text': !$device.isMobile}]">
            <nuxt-link :to="localePath({ name: 'index' })">
              {{ $t('initials') }}
            </nuxt-link>
            <br />
            {{ $t('license-text') }}
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
            <br />
            {{ $t('icon8-license-text') }}
            <a href="https://icons8.com/">icon8.com</a>
          </p>
        </div>
        <div class="column has-margin-top-30">
          <p :class="['subscribe-text', { 'subscribe-text-right': !$device.isMobile }]">
            {{ $t('subscribe-me') }}
          </p>
          <div :class="['icons', `icons-right`, { 'icons-mobile': $device.isMobile }]">
            <a v-for="(i, index) of socials" :key="index" :href="i.url">
              <Icon
                class="image is-32x32 icons-icon icon-hover"
                :icon="i.icon"
                fit="contain"
                alt="Footer social icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import { SOCIAL_LINKS } from '~/util/constants'
import Icon from '~/components/Icon.vue'

@Component({
  components: { Icon }
})
export default class extends Vue {
  channels = [
    {
      icon: 'rss',
      url: '/LANG.xml'
    },
    {
      icon: 'telegram',
      url: 'https://teleg.run/coolone_LANG'
    }
  ]

  socials = [
    {
      icon: 'facebook',
      url: SOCIAL_LINKS.FB
    },
    {
      icon: 'skype',
      url: SOCIAL_LINKS.SKYPE
    },
    {
      icon: 'spotify',
      url: SOCIAL_LINKS.SPOTIFY
    },
    {
      icon: 'twitter-circled',
      url: SOCIAL_LINKS.TWITTER
    },
    {
      icon: 'telegram',
      url: SOCIAL_LINKS.TELEGRAM
    },
    {
      icon: 'medium-monogram',
      url: SOCIAL_LINKS.MEDIUM
    },
    {
      icon: 'linkedin',
      url: SOCIAL_LINKS.LINKEDIN
    },
    {
      icon: 'instagram',
      url: SOCIAL_LINKS.INSTAGRAM
    },
    {
      icon: 'vk-circled',
      url: SOCIAL_LINKS.VK
    },
    {
      icon: 'github',
      url: SOCIAL_LINKS.GH
    }
  ]

  @Getter
  getThemeInvert
}
</script>

<style lang="scss">
.icons {
  display: flex;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  &-left {
    flex-direction: row;
  }

  &-right {
    flex-direction: row-reverse;
  }

  &-mobile {
    justify-content: center !important;
    flex-flow: wrap-reverse;
    flex-wrap: wrap-reverse;
    max-width: calc(5 * (32px + 0.5rem));
    position: static;
    top: unset;
    transform: unset;
    margin-left: auto;
    margin-right: auto;
  }
}

.footer-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  &-wrapper {
    margin-bottom: 0 !important;
  }
}

.icons-icon {
  padding: 0 !important;
  margin: 0.25rem !important;
}

.subscribe-text {
  position: absolute;
  transform: translateY(-25px);
  left: 30px;
  right: 30px;
  text-align: center;

  &-right {
    left: unset !important;
  }

  &-left {
    right: unset !important;
  }
}
</style>

<i18n>
  {
    "en": {
      "initials": "Nikolay Trukhin's site",
      "license-text": "The source code is licensed",
      "icon8-license-text": "Icons by ",
      "subscribe-me": "Subscribe to me",
      "subscribe-updates": "Subscribe to updates"
    },
    "ru": {
      "initials": "Cайт Николая Трухина",
      "license-text": "Исходный код лицензирован",
      "icon8-license-text": "На сайте используются иконки от ",
      "subscribe-me": "Подпишитесь на меня",
      "subscribe-updates": "Подпишитесь на обновления"
    }
  }
</i18n>
