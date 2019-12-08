import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import GeoPoint = firebase.firestore.GeoPoint;

export interface LocalizedString {
  en: string
  ru: string
}

export interface TimelineItem {
  title: LocalizedString
  date: Timestamp
  type: string
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

export interface TimelineHack extends TimelineItem {
  place: number
  location: GeoPoint
}
