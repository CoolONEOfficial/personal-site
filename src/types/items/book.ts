import { PageItem, TimelineItem } from '~/types/timeline'

interface Book {
  author: string
}

export interface PageBook extends PageItem, Book {
  author: string
  description: string
}

export interface TimelineBook extends TimelineItem, Book {}
