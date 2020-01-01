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

  for(const mDoc of timelineDocs) {
    const mDocType = mDoc.ref.parent.parent.parent.path
    const typeMap = {
      events: TimelineHack,
      projects: TimelineProject,
      books: TimelineBook,
      achievements: TimelineAchievement
    }
    timelineData.push((await typeMap[mDocType].fromDoc(that, mDoc)) as never)
  }

  for (const [
    mItemId,
    mItem
  ] of (timelineData as TimelineItem[]).entries()) {
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
        date: new Date(prevYear, 1, 1),
        _type: 'years'
      } as never)
      index++
    }
  }

  return timelineData

  // return (
  //   Promise.all(cols)
  //     // merge the results
  //     .then(async (promiseResults: QuerySnapshot[]) => {
  //       const mergedData = []
  //       for (const snapshot of promiseResults) {
  //         for (const doc of snapshot.docs) {
  //           const typeMap = {
  //             events: TimelineHack,
  //             projects: TimelineProject,
  //             books: TimelineBook,
  //             achievements: TimelineAchievement
  //           }
  //
  //           mergedData.push(
  //             (await typeMap[doc.ref.parent.parent.parent.path].fromDoc(that, doc)) as never
  //           )
  //         }
  //       }
  //       return mergedData
  //     })
  //
  //     // sort the results
  //     .then((mergedData) =>
  //       mergedData.sort((a, b) => {
  //         return (
  //           (b as TimelineItem).date.getTime() -
  //           (a as TimelineItem).date.getTime()
  //         )
  //       })
  //     )
  //
  //     .then((sortedData) => {
  //       // Reverse _orderId
  //       for (const [
  //         mItemId,
  //         mItem
  //       ] of (sortedData as TimelineItem[]).entries()) {
  //         mItem._orderId = mItemId + 1
  //       }
  //       return sortedData
  //     })
  //
  //     // add years
  //     .then((orderedData) => {
  //       for (let index = 1; index < orderedData.length; index++) {
  //         const prevYear = new Date(
  //           (orderedData[index - 1] as TimelineItem).date
  //         ).getFullYear()
  //         const currentYear = new Date(
  //           (orderedData[index] as TimelineItem).date
  //         ).getFullYear()
  //         if (prevYear > currentYear) {
  //           orderedData.splice(index, 0, {
  //             date: new Date(prevYear, 1, 1),
  //             _type: 'years'
  //           } as never)
  //           index++
  //         }
  //       }
  //       return orderedData
  //     })
  //
  //     // log any errors
  //     .catch((e) => console.error('error! ', e))
  // )
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
