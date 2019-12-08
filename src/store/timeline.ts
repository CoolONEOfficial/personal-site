import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import LabelItem from '~/components/timeline/YearItem.vue'

export const state = () => ({
  timelineItems: []
})

export const mutations = {
  ...vuexfireMutations,
  updateTimelineItems(state, payload) {
    console.log('update items: ', payload)
    state.timelineItems = payload
  }
}

function mergeAndSortItems(that, ...colNames: any) {
  const cols = []
  for (const mName of colNames) {
    cols.push(that.$fireStore.collection(mName).get() as never)
  }

  return (
    Promise.all(cols)
      // merge the results
      .then((promiseResults) => {
        const mergedData = []
        promiseResults.forEach((snapshot: any) => {
          snapshot.forEach((doc) => {
            const data = doc.data()
            data['type'] = doc.ref.parent.path
            return mergedData.push(data as never)
          })
        })
        return mergedData
      })

      // sort the results
      .then((mergedData) =>
        mergedData.sort(
          (a, b) =>
            (b as TimelineItem).date.toMillis() -
            (a as TimelineItem).date.toMillis()
        )
      )

      // add years
      .then((sortedData) => {
        for (let index = 1; index < sortedData.length; index++) {
          const prevYear = new Date(
            (sortedData[index - 1] as TimelineItem).date.seconds * 1000
          ).getFullYear()
          const currentYear = new Date(
            (sortedData[index] as TimelineItem).date.seconds * 1000
          ).getFullYear()
          console.log('prev: ', prevYear, ', next: ', currentYear)
          if (prevYear > currentYear) {
            console.log('nextyear', currentYear)
            sortedData.splice(index, 0, {
              date: (sortedData[index - 1] as TimelineItem).date,
              type: 'years'
            } as never)
            index++
          }
        }
        return sortedData
      })

      // log any errors
      .catch((e) => console.error(e))
  )
}

export const actions = {
  async loadTimelineItems({ commit }) {
    commit(
      'updateTimelineItems',
      await mergeAndSortItems(
        this,
        'projects',
        'books',
        'achievements',
        'hacks'
      )
    )
  }
}

export const getters = {
  getTimelineItems(state) {
    return state.timelineItems
  }
}
