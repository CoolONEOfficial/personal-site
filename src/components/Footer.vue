<template>
  <footer class="footer has-margin-top-25">
    <div class="content">
      <div class="columns">
        <div class="column">
          <!--TODO-->
        </div>
        <div class="column has-text-centered subtitle is-6 footer-text-wrapper">
          <p class="footer-text">
            <a href="https://coolone.ru">{{ $t('initials') }}</a
            >.<br />{{ $t('license-text') }}
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
        </div>
        <div class="column">
          <div :class="['socials', { 'socials-mobile': $device.isMobile }]">
            <figure
              class="image is-32x32 social"
              v-for="(i, index) of socials"
              :key="index"
            >
              <a :href="i.url">
                <img :src="`/icons/black/icons8-${i.icon}-50.png`" />
              </a>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  socials = [
    {
      icon: 'facebook',
      url: 'https://www.facebook.com/coolone.official'
    },
    {
      icon: 'skype',
      url: 'https://join.skype.com/invite/oZ5zVVogLOtv'
    },
    {
      icon: 'spotify',
      url:
        'https://open.spotify.com/user/cooloneofficial?si=hGzFbziRTcWYOCEGZwdREQ'
    },
    {
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/cooloneofficial/'
    },
    {
      icon: 'instagram',
      url: 'https://www.instagram.com/coolone.official/'
    },
    {
      icon: 'vk-circled',
      url: 'https://vk.com/cooloneofficial'
    }
  ]
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
  opacity: 0.6;
  transition: opacity 300ms linear;

  &:hover {
    opacity: 1;
  }

  margin: 0 0 0 1em !important;

  &:last-child {
    margin-left: 0 !important;
  }
}
</style>

<i18n>
  {
    "en": {
      "initials": "Website portfolio of Nikolai Trukhin",
      "license-text": "The source code is licensed"
    },
    "ru": {
      "initials": "Cайт-портфолио Николая Трухина",
      "license-text": "Исходный код лицензирован"
    }
  }
</i18n>
