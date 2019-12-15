export interface Item {
  title: LocalizedString
  date: number
  images?: Image[]
  singleImage?: Image
  description?: LocalizedString
}

export interface PageItem extends Item {
}

export interface TimelineItem extends Item {
  _type: string
  _doc: string
  _orderId: number
}

export function isRtl(context, item: TimelineItem) {
  return !context.$device.isMobile && item._orderId % 2 !== 0
}

export interface LocalizedString {
  en: string
  ru: string
}

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface Image {
  original: string
  small: string
}

export interface Location {
  title: LocalizedString
  geopoint: GeoPoint
}
