import { TimelineItem } from '~/types/timeline'

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
    item.title,
    item.description
  )
}

export function getMeta(
  locale,
  image?: string,
  title?: string,
  description?: string
) {
  title = getTitle(locale, title)
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
      content: image || '/favicon.jpg'
    }
  ]
}
