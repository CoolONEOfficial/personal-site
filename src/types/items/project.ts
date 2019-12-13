import { PageItem, TimelineItem } from '~/types/timeline'

interface Project {
  category: string
}

export interface PageProject extends PageItem, Project {
  github: string
  platform: string
}

export interface TimelineProject extends TimelineItem, Project {}
