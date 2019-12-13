import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import FireGeoPoint = firebase.firestore.GeoPoint

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface Image {
  original: string
  small: string
}

export interface TimelineItem {
  title: LocalizedString
  date: number
  images?: Image[]
  singleImage?: Image
  description?: string

  _type: string
  _doc: string
  _orderId: number
}

export interface LocalizedString {
  en: string
  ru: string
}

export interface TimelineProject extends TimelineItem {
  github: string
  platform: string
  category: string
}

export interface TimelineBook extends TimelineItem {
  author: string
}

export interface TimelineAchievement extends TimelineItem {
  type: string
}

export interface Location {
  title: LocalizedString
  geopoint: GeoPoint
}

export interface TimelineHack extends TimelineItem {
  place: number
  location: Location
}
