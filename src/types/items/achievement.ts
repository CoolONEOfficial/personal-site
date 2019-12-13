import { PageItem, TimelineItem } from '~/types/timeline'

interface Achievement {
  type: string
}

export interface PageAchievement extends PageItem, Achievement {}

export interface TimelineAchievement extends TimelineItem, Achievement {}
