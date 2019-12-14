import { Configuration } from '@nuxt/types'
import { PRIMARY_COLOR } from './util/constants'

const isDev = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  modern: !isDev,
  debug: true,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Personal site of CoolONEOfficial',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'msapplication-TileColor', content: PRIMARY_COLOR },
      { name: 'theme-color', content: PRIMARY_COLOR }
    ],
    link: [
      { rel: 'canonical', href: 'https://coolone.ru/' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: PRIMARY_COLOR }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: PRIMARY_COLOR },
  /*
   ** Global CSS
   */
  css: [
    './assets/scss/buefy.scss',
    './assets/scss/vue-carousel.scss',
    './assets/scss/styles.scss',
    'bulma-helpers/css/bulma-helpers.min.css'
  ],
  styleResources: {
    scss: ['./assets/scss/buefy.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/aos', ssr: false },
    { src: '~/plugins/vue-carousel', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/date-fns'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    'nuxt-i18n',
    'nuxt-fire',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(/* config, ctx */) {}
  },
  env: {
    spotifyClientId:
      process.env.SPOTIFY_CLIENT_ID || 'c1a97fcc39184989b6ad7156730636e2',
    clientBaseUrl: process.env.CLIENT_URL || 'https://coolone.ru'
  },
  manifest: {
    name: 'Personal site of CoolONEOfficial',
    lang: 'en-US'
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  buefy: {
    css: false,
    materialDesignIcons: false
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: { fallbackLocale: 'en' },
    vueI18nLoader: true
  },
  fire: {
    config: {
      apiKey: 'AIzaSyBDVOdqcspdnve9eiRpR91mV6VSFZPMNFI',
      authDomain: 'personal-site-d9a58.firebaseapp.com',
      databaseURL: 'https://personal-site-d9a58.firebaseio.com',
      projectId: 'personal-site-d9a58',
      storageBucket: 'personal-site-d9a58.appspot.com',
      messagingSenderId: '296312063282',
      appId: '1:296312063282:web:d0da9be983c7eb90c7432b',
      measurementId: 'G-9H4D1GY1VP'
    },
    services: {
      firestore: true,
      storage: true
    }
  },
  markdownit: {
    injected: true
  }
}

export default config
