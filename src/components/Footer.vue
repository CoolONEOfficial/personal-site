<template>
  <footer class="footer has-margin-top-10">
    <div class="content">
      <div class="columns is-multiline">
        <div v-if="!$device.isMobile" class="column">
          <!--TODO-->
        </div>
        <div class="column has-text-centered subtitle is-6 footer-text-wrapper">
          <p :class="[{'footer-text': !$device.isMobile}]">
            <nuxt-link :to="localePath({ name: 'index' })">{{
              $t('initials')
            }}</nuxt-link
            >.<br />{{ $t('license-text') }}
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a
            >.<br />{{ $t('icon8-license-text') }}
            <a href="https://icons8.com/">icon8.com</a>.
          </p>
        </div>
        <div class="column">
          <div :class="['socials', { 'socials-mobile': $device.isMobile }]">
            <a v-for="(i, index) of socials" :key="index" :href="i.url">
              <Icon
                class="image is-32x32 social icon-hover"
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
.socials {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  &-mobile {
    justify-content: center;
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

.social {
  padding: 0 !important;
  margin: 0.25rem !important;
}
</style>

<i18n>
  {
    "en": {
      "initials": "Website portfolio of Nikolai Trukhin",
      "license-text": "The source code is licensed",
      "icon8-license-text": "Icons by "
    },
    "ru": {
      "initials": "Cайт-портфолио Николая Трухина",
      "license-text": "Исходный код лицензирован",
      "icon8-license-text": "На сайте используются иконки от "
    }
  }
</i18n>
