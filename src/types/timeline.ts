import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import FireGeoPoint = firebase.firestore.GeoPoint

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface TimelineItem {
  title: LocalizedString
  date: number
  type: string
  doc: string
  images?: boolean | any[]
  imagesPath?: string
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
  icon: string
}

export interface Location {
  title: LocalizedString
  geopoint: GeoPoint
}

export interface TimelineHack extends TimelineItem {
  place: number
  location: Location
}
