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

function mergeAndSortItems(that, ...colNames: any) {
  const cols = []
  for (const mName of colNames) {
    const collRef = that.$fireStore.collection(mName)
    cols.push(
      mName == 'events'
        ? (collRef.where('type', '==', EventType.HACK).get() as never)
        : (collRef.get() as never)
    )
  }
  return (
    Promise.all(cols)
      // merge the results
      .then(async (promiseResults: QuerySnapshot[]) => {
        const mergedData = []
        for (const snapshot of promiseResults) {
          for (const doc of snapshot.docs) {
            const typeMap = {
              events: TimelineHack,
              projects: TimelineProject,
              books: TimelineBook,
              achievements: TimelineAchievement
            }

            mergedData.push(
              (await typeMap[doc.ref.parent.path].fromDoc(that, doc)) as never
            )
          }
        }
        return mergedData
      })

      // sort the results
      .then((mergedData) =>
        mergedData.sort((a, b) => {
          return (
            (b as TimelineItem).date.getTime() -
            (a as TimelineItem).date.getTime()
          )
        })
      )

      .then((sortedData) => {
        // Reverse _orderId
        for (const [
          mItemId,
          mItem
        ] of (sortedData as TimelineItem[]).entries()) {
          mItem._orderId = mItemId + 1
        }
        return sortedData
      })

      // add years
      .then((orderedData) => {
        for (let index = 1; index < orderedData.length; index++) {
          const prevYear = new Date(
            (orderedData[index - 1] as TimelineItem).date
          ).getFullYear()
          const currentYear = new Date(
            (orderedData[index] as TimelineItem).date
          ).getFullYear()
          if (prevYear > currentYear) {
            orderedData.splice(index, 0, {
              date: new Date(prevYear, 1, 1),
              _type: 'years'
            } as never)
            index++
          }
        }
        return orderedData
      })

      // log any errors
      .catch((e) => console.error('error! ', e))
  )
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
      state.timelineItems.filter((mItem) => Boolean(mItem.images))
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
