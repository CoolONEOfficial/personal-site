import { Configuration } from "@nuxt/types";
import {
  BASE_URL,
  FIREBASE_OPTIONS,
  FIREBASE_OPTIONS_DEV,
  FIREBASE_OPTIONS_PROD,
  IS_DEV,
  LOCALES,
  PRIMARY_COLOR
} from "./util/constants";
import glob from "glob-all";
import path from "path";
import firebase from "firebase";
import 'firebase/storage';
;(global as any).XMLHttpRequest = require('xhr2')
const app = !firebase.apps.length ? firebase.initializeApp(FIREBASE_OPTIONS) : firebase.app()

export const db = app.firestore()
export const storage = app.storage().ref()

const getRoutes = require("./util/routes.ts");
const isDev = IS_DEV;

const whitelistPatterns: RegExp[] = [/mdi/, /icon/, /is-grouped/, /picture/, /-dark/, /-light/];
const whitelistPatternsChildren: RegExp[] = [
  /navbar/,
  /modal/,
  /tag/,
  /image/,
  /taglist/,
  /plyr/,
  /VueCarousel/,
  /aos/,
  /pagination/,
  /button/,
  /icons/,
  /footer/
];

const config: Configuration = {
  modern: !isDev,
  debug: !isDev,
  dev: isDev,
  target: "static",
  /*
   ** Headers of the page
   */
  // @ts-ignore
  head: {
    // @ts-ignore
    titleTemplate: ({ title, locale }) => {
      const end = {
        ru: "Cайт-портфолио Николая Трухина",
        en: "Nikolay Trukhin's site"
      };

      return title ? `${title} — ${end[locale]}` : end[locale];
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msapplication-TileColor", content: PRIMARY_COLOR },
      { name: "theme-color", content: PRIMARY_COLOR }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: PRIMARY_COLOR },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Cайт-портфолио Николая Трухина",
        href: "/ru.xml"
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Nikolay Trukhin's site",
        href: "/en.xml"
      }
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
    "./assets/scss/buefy.scss",
    "./assets/scss/vue-carousel.scss",
    "./assets/scss/styles.scss",
    "bulma-helpers/css/bulma-helpers.min.css",
    "plyr/dist/plyr.css"
  ],
  styleResources: {
    scss: ["./assets/scss/buefy.scss"]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/aos", ssr: false },
    { src: "~/plugins/vue-carousel", ssr: false },
    { src: "~/plugins/vue-lazysizes", ssr: false },
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/vue-infinite-loading", ssr: false },
    "~/plugins/vue-plyr",
    "~/plugins/jsonld"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/dotenv",
    "@nuxtjs/date-fns",
    "@nuxtjs/google-analytics"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "@nuxtjs/device",
    "nuxt-i18n",
    "@nuxtjs/firebase",
    "nuxt-ssr-cache",
    "vue-scrollto/nuxt",
    "@nuxtjs/component-cache",
    "@bazzite/nuxt-optimized-images",
    '@nuxtjs/feed',
    "@nuxtjs/sitemap" // sitemap at end
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": {
      target: "https://coolone.ru/",
      pathRewrite: { "^/api/": "" },
      changeOrigin: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    publicPath: "/assets/",
    extractCSS: true,
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient && vue != undefined && vue.transformAssetUrls != undefined) {
        vue.transformAssetUrls.img = ["data-src", "src"];
        vue.transformAssetUrls.source = ["data-srcset", "srcset"];
      }
    }
  },
  env: {
    spotifyClientId:
      process.env.SPOTIFY_CLIENT_ID || "c1a97fcc39184989b6ad7156730636e2",
    clientBaseUrl: process.env.API_URL || "https://personal-site-d9a58.web.app"
  },
  manifest: {
    name: "Nikolay Trukhin's site",
    lang: "en-US"
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  buefy: {
    css: false,
    materialDesignIcons: true
  },
  purgeCSS: {
    mode: "webpack",
    paths: glob.sync([
      path.join(__dirname, "./pages/**/*.vue"),
      path.join(__dirname, "./layouts/**/*.vue"),
      path.join(__dirname, "./components/**/*.vue")
    ]),
    whitelist: ["html", "body", "nuxt-progress"],
    whitelistPatterns,
    whitelistPatternsChildren
  },
  i18n: {
    locales: LOCALES,
    baseUrl: BASE_URL,
    defaultLocale: "en",
    seo: false,
    strategy: "no_prefix",
    vueI18n: { fallbackLocale: "en" },
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en"
    }
  },
  firebase: {
    config: {
      production: FIREBASE_OPTIONS_PROD,
      development: FIREBASE_OPTIONS_DEV
    },
    services: {
      firestore: true,
      storage: true
    }
  },
  optimizedImages: {
    optimizeImages: true
  },
  feed: require("./util/rss.ts"),
  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    exclude: ["/auth"],
    routes() {
      return getRoutes();
    }
  },
  googleAnalytics: {
    id: "G-N84HJNQLWP"
  },
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [/^\/$/],

    store: {
      type: "memory",
      ttl: 60,
      max: 100
    }
  }
};

export default config;
