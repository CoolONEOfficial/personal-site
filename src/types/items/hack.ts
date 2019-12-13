import { Location, PageItem, TimelineItem } from '~/types/timeline'

interface Hack {
  place: number
}

export interface PageHack extends PageItem, Hack {
  location: Location
}

export interface TimelineHack extends TimelineItem, Hack {}
