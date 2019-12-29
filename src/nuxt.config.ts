import { Configuration } from '@nuxt/types'
import { BASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, LOCALES, PRIMARY_COLOR } from "./util/constants";
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import path from 'path'
import purgecss from '@fullhuman/postcss-purgecss'
const getRoutes = require('./util/routes.ts')
const isDev = process.env.NODE_ENV !== 'production'

const whitelistPatterns: RegExp[] = [/mdi/, /icon/, /is-grouped/, /picture/]
const whitelistPatternsChildren: RegExp[] = [
  /navbar/,
  /modal/,
  /tag/,
  /image/,
  /taglist/,
  /plyr/,
  /VueCarousel/,
  /aos/
]

const config: Configuration = {
  modern: !isDev,
  debug: !isDev,
  dev: isDev,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  // @ts-ignore
  head: {
    // @ts-ignore
    titleTemplate: ({ title, locale }) => {
      const end = {
        ru: 'Cайт-портфолио Николая Трухина',
        en: 'Website portfolio of Nikolai Trukhin'
      }

      return title ? `${title} — ${end[locale]}` : end[locale]
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: PRIMARY_COLOR },
      { name: 'theme-color', content: PRIMARY_COLOR }
    ],
    link: [
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
    'bulma-helpers/css/bulma-helpers.min.css',
    'plyr/dist/plyr.css'
  ],
  styleResources: {
    scss: ['./assets/scss/buefy.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/aos', ssr: false },
    { src: '~/plugins/vue-carousel', ssr: false },
    { src: '~/plugins/vue-lazysizes', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/vue-plyr',
    '~/plugins/jsonld'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/date-fns',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    'nuxt-i18n',
    'nuxt-fire',
    'vue-scrollto/nuxt',
    '@nuxtjs/component-cache',
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/sitemap' // sitemap at end
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://coolone.ru/',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    publicPath: '/assets/',
    extractCSS: true,
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (!isDev && config.plugins != undefined) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body', 'nuxt-progress'],
            whitelistPatterns,
            whitelistPatternsChildren
          })
        )
      }
      if (isClient && vue != undefined && vue.transformAssetUrls != undefined) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    },
    postcss: isDev
      ? {}
      : {
          plugins: [
            purgecss({
              content: [
                './pages/**/*.vue',
                './layouts/**/*.vue',
                './components/**/*.vue'
              ],
              whitelist: ['html', 'body', 'nuxt-progress'],
              whitelistPatterns,
              whitelistPatternsChildren
            })
          ]
        }
  },
  env: {
    spotifyClientId:
      process.env.SPOTIFY_CLIENT_ID || 'c1a97fcc39184989b6ad7156730636e2',
    clientBaseUrl: process.env.API_URL || 'https://personal-site-d9a58.web.app'
  },
  manifest: {
    name: 'Website portfolio of Nikolai Trukhin',
    lang: 'en-US'
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  buefy: {
    css: false,
    materialDesignIcons: true
  },
  i18n: {
    locales: LOCALES,
    baseUrl: BASE_URL,
    defaultLocale: 'en',
    seo: false,
    strategy: 'prefix',
    vueI18n: { fallbackLocale: 'en' },
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: !isDev,
      fallbackLocale: 'en'
    }
  },
  fire: {
    config: {
      apiKey: 'AIzaSyBDVOdqcspdnve9eiRpR91mV6VSFZPMNFI',
      authDomain: 'personal-site-d9a58.firebaseapp.com',
      databaseURL: 'https://personal-site-d9a58.firebaseio.com',
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: '296312063282',
      appId: '1:296312063282:web:d0da9be983c7eb90c7432b',
      measurementId: 'G-9H4D1GY1VP'
    },
    services: {
      firestore: true,
      storage: true
    }
  },
  optimizedImages: {
    optimizeImages: true
  },
  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    exclude: ['/auth'],
    routes() {
      return getRoutes()
    }
  },
  googleAnalytics: {
    id: 'G-N84HJNQLWP'
  }
}

export default config
