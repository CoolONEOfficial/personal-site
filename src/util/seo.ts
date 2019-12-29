import { TimelineItem } from '~/types/timeline'
const { LOGO_IMAGE, SOCIAL_LINKS } = require('./constants.ts')
import { baseUrl } from '../.nuxt/nuxt-i18n/options'
import { BASE_URL } from '~/util/constants'

export const JSON_LD = {
  PERSON: {
    '@type': 'Person',
    name: 'Nickolay Trukhin',
    image: LOGO_IMAGE,
    sameAs: [
      SOCIAL_LINKS.VK,
      SOCIAL_LINKS.FB,
      SOCIAL_LINKS.INSTAGRAM,
      SOCIAL_LINKS.LINKEDIN,
      SOCIAL_LINKS.SKYPE,
      SOCIAL_LINKS.SPOTIFY,
      SOCIAL_LINKS.TWITTER,
      SOCIAL_LINKS.GH
    ],
    jobTitle: 'Software developer',
    url: 'https://coolone.ru'
  }
}

interface Breadcrumb {
  name: string
  url: string
}

export function getLdBreadcrumbs(breadcrumbList: Breadcrumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList.map((mBreadcrumb, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': mBreadcrumb.url,
          name: mBreadcrumb.name
        }
      }
    })
  }
}

export function getArticle(
  that,
  locale,
  collName,
  page: TimelineItem | any,
  mainEntity: object
) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'ItemPage',
    breadcrumb: getLdBreadcrumbs([
      {
        name: that.$t('title') as string,
        url: `${baseUrl}${that.localePath({
          name: collName
        })}`
      },
      {
        name: page.title[locale],
        url: `${baseUrl}${that.$route.fullPath}`
      }
    ]),
    mainEntity: {
      ...mainEntity,
      name: page.title[locale],
      description: page.descriptionText ? page.descriptionText[locale] : ''
    },
    name: page.title[locale],
    author: JSON_LD.PERSON
  }
}

export function getTitle(locale, title) {
  return title ? `${title} — ${titleMap[locale]}` : titleMap[locale]
}

export function getMetaPage(locale, item: TimelineItem | any) {
  return getMeta(
    locale,
    Boolean(item.photos)
      ? item.photos[0].small
      : Boolean(item.singleImage)
      ? item.singleImage.small
      : undefined,
    item.title[locale],
    item.descriptionText[locale]
  )
}

const descriptionMap = {
  ru:
    'Портфолио Mobile/Web разработчика, где Вы можете увидеть технические достижения, прочитанные книги, прослушать музыку и многое другое.',
  en:
    'A portfolio of a mobile/web developer, where you can see technical achievements, read books, listen to music and much more.'
}
const titleMap = {
  ru: 'Cайт-портфолио Николая Трухина',
  en: 'Website portfolio of Nikolai Trukhin'
}

export function getMeta(
  locale,
  image?: string,
  title?: string,
  description?: string
) {
  if (title) title = getTitle(locale, title)
  return [
    {
      hid: 'description',
      name: 'description',
      content: description || descriptionMap[locale]
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: title || titleMap[locale]
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title || titleMap[locale]
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description || descriptionMap[locale]
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title || titleMap[locale]
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description || descriptionMap[locale]
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: image || BASE_URL + LOGO_IMAGE
    }
  ]
}
