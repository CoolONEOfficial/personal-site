const functions = require("firebase-functions");
const express = require("express");
const { Nuxt } = require("nuxt");

const app = express();
const nuxt = new Nuxt({
  dev: false,
  debug: true,
  // buildDir: 'nuxt',
  // build: {
  //     publicPath: '/assets/'
  // }
  modern: true,
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Personal site of CoolONEOfficial",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["./assets/scss/buefy.scss"],
  styleResources: {
    scss: []
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "nuxt-i18n"
    // 'nuxt-fire'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/",
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(/* config, ctx */) {}
  },
  manifest: {
    name: "Personal site of CoolONEOfficial",
    lang: "en-US"
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
    locales: ["en", "ru"],
    defaultLocale: "en",
    vueI18n: { fallbackLocale: "en" },
    vueI18nLoader: true
  }
});

function handleRequest(req, res) {
  res.set("Cache-Control", "public, max-age=10, s-maxage=10");
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject);
    });
  });
}

app.use(handleRequest);
exports.ssrapp = functions.https.onRequest(app);
