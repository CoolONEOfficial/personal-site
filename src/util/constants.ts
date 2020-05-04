export const PAGINATION_COUNT = 6
export const PRIMARY_COLOR = '#03A9F4'
export const PLACEHOLDER_IMAGE = '/icon.png'
export const LOGO_IMAGE = '/favicon.jpg'
export const BASE_URL = 'https://coolone.ru'
export const FIREBASE_OPTIONS_PROD = {
  projectId: 'personal-site-d9a58',
  storageBucket: 'personal-site-d9a58.appspot.com',
  apiKey: "AIzaSyBDVOdqcspdnve9eiRpR91mV6VSFZPMNFI",
  authDomain: "personal-site-d9a58.firebaseapp.com",
  databaseURL: "https://personal-site-d9a58.firebaseio.com",
  messagingSenderId: "296312063282",
  appId: "1:296312063282:web:d0da9be983c7eb90c7432b",
  measurementId: "G-9H4D1GY1VP"
}
export const FIREBASE_OPTIONS_DEV = {
  projectId: "personal-site-debug",
  storageBucket: "personal-site-debug.appspot.com",
  apiKey: "AIzaSyAXHCMrN49uB3CVc2_e1qdyOUshVdTCT-k",
  authDomain: "personal-site-debug.firebaseapp.com",
  databaseURL: "https://personal-site-debug.firebaseio.com",
  messagingSenderId: "164468905867",
  appId: "1:164468905867:web:130e7479ebac9603b0418e",
  measurementId: "G-S0XPH8NXLT"
}
export const IS_DEV = process.env.NODE_ENV !== 'production'
export const FIREBASE_OPTIONS = IS_DEV
  ? FIREBASE_OPTIONS_DEV
  : FIREBASE_OPTIONS_PROD
export const CAROUSEL_INTERVAL = 7000
export const ABOUT_DOCUMENT_ID = 'personal-site'
export const COLL_NAMES = {
  TIMELINE: 'timeline',
  SPOTIFY: 'spotify',
  SIZES: 'sizes'
}
export const TYPE_NAMES = {
  ACHIEVEMENTS: 'achievements',
  PROJECTS: 'projects',
  BOOKS: 'books',
  EVENTS: 'events'
}
export const VUEX_NAMES = {
  ACHIEVEMENTS: 'achievements',
  PROJECTS: 'projects',
  BOOKS: 'books',
  EVENTS: 'events',
  MUSIC: 'music',
  TAG_ITEMS: 'tag_items',
  TIMELINE: 'timeline'
}
export const SOCIAL_LINKS = {
  FB: 'https://www.facebook.com/coolone.official',
  SKYPE: 'https://join.skype.com/invite/oZ5zVVogLOtv',
  SPOTIFY:
    'https://open.spotify.com/user/cooloneofficial?si=hGzFbziRTcWYOCEGZwdREQ',
  LINKEDIN: 'https://www.linkedin.com/in/cooloneofficial/',
  INSTAGRAM: 'https://www.instagram.com/coolone.official/',
  TWITTER: 'https://twitter.com/CoolONEOfficial',
  VK: 'https://vk.com/cooloneofficial',
  GH: 'https://github.com/CoolONEOfficial',
  TELEGRAM: 'https://t.me/cooloneofficial',
  MEDIUM: 'https://medium.com/@coolone.official'
}
export const LOCALES = [
  {
    code: 'en',
    iso: 'en-US'
  },
  {
    code: 'ru',
    iso: 'ru-RU'
  }
]
