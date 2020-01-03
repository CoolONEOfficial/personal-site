import firebase from 'firebase/app'
import 'firebase/firestore'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import { TimelineItem } from '~/types/timeline'
import { EventType } from '~/types/items/event'
import { TimelineProject } from '~/types/items/project'
import { TimelineBook } from '~/types/items/book'
import { TimelineAchievement } from '~/types/items/achievement'
import { TimelineHack } from '~/types/items/events/hack'

export const state = () => ({
  timelineItems: [],
  hoveredItem: null,
  imageItems: null
})

export const mutations = {
  updateTimelineItems(state, payload) {
    state.timelineItems = payload
  },
  updateHoveredItem(state, hoveredItem) {
    state.hoveredItem = hoveredItem
  },
  updateImageItems(state, payload) {
    state.imageItems = payload
  }
}

async function mergeAndSortItems(that, ...colNames: any) {
  // const cols = []
  // for (const mName of colNames) {
  //   const collRef = that.$fireStore.collection(mName)
  //   cols.push(
  //     mName == 'events'
  //       ? (collRef.where('type', '==', EventType.HACK).get() as never)
  //       : (collRef.get() as never)
  //   )
  // }
  const timelineDocs = (
    await that.$fireStore
      .collectionGroup('timeline')
      .orderBy('date', 'desc')
      .get()
  ).docs

  const timelineData = []

  for (const mDoc of timelineDocs) {
    const mDocType = mDoc.ref.parent.parent.parent.path
    const typeMap = {
      events: TimelineHack,
      projects: TimelineProject,
      books: TimelineBook,
      achievements: TimelineAchievement
    }
    timelineData.push((await typeMap[mDocType].fromDoc(that, mDoc)) as never)
  }

  for (const [mItemId, mItem] of (timelineData as TimelineItem[]).entries()) {
    mItem._orderId = mItemId + 1
  }

  for (let index = 1; index < timelineData.length; index++) {
    const prevYear = new Date(
      (timelineData[index - 1] as TimelineItem).date
    ).getFullYear()
    const currentYear = new Date(
      (timelineData[index] as TimelineItem).date
    ).getFullYear()
    if (prevYear > currentYear) {
      timelineData.splice(index, 0, {
        date:
          prevYear - currentYear > 1
            ? `${currentYear + 1} — ${prevYear}`
            : prevYear,
        _type: 'years'
      } as never)
      index++
    }
  }

  return timelineData
}

export const actions = {
  async loadTimelineItems({ commit }) {
    const items = await mergeAndSortItems(
      this,
      'projects',
      'books',
      'achievements',
      'events'
    )
    commit('updateTimelineItems', items)
    return items
  },
  updateHoveredItem: ({ commit, state }, hoveredItem) => {
    commit('updateHoveredItem', hoveredItem)
    return state.hoveredItem
  },
  initImageItems({ commit, state }) {
    commit(
      'updateImageItems',
      state.timelineItems.filter(
        (mItem) => mItem._type == 'events' && Boolean(mItem.images)
      )
    )
  }
}

export const getters = {
  getTimelineItems(state) {
    return state.timelineItems
  },
  getHoveredItem(state) {
    return state.hoveredItem
  },
  getImageItems(state) {
    return state.imageItems
  }
}
