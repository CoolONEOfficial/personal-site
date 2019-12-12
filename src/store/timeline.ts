import { vuexfireMutations } from 'vuexfire'
import { GeoPoint, Image, TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import QuerySnapshot = firebase.firestore.QuerySnapshot

export const state = () => ({
  timelineItems: [],
  hoveredItem: null
})

export const mutations = {
  ...vuexfireMutations,
  updateTimelineItems(state, payload) {
    state.timelineItems = payload
  },
  updateHoveredItem(state, hoveredItem) {
    state.hoveredItem = hoveredItem
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
      .then(async (promiseResults: QuerySnapshot[]) => {
        const mergedData = []
        for (const snapshot of promiseResults) {
          for (const doc of snapshot.docs) {
            const data = doc.data()
            data['date'] = (data['date'] as Timestamp).toDate()
            data['_type'] = doc.ref.parent.path
            data['_doc'] = doc.id
            if (data['_type'] == 'hacks') {
              data['location']['geopoint'] = {
                latitude: data['location']['geopoint'].latitude,
                longitude: data['location']['geopoint'].longitude
              }
            }
            if (Boolean(data['images'])) {
              let images: Image[]

              if (process.env.NODE_ENV === 'production') {
                const list = (
                  await that.$fireStorage
                    .ref()
                    .child(`${data._type}/${data._doc}`)
                    .list()
                ).items

                images = []
                for (let i = 0; i < list.length; i += 2) {
                  images.push({
                    original: await list[i].getDownloadURL(),
                    small: await list[i + 1].getDownloadURL()
                  })
                }
              } else
                images = new Array(5).fill({
                  original: 'icon.png',
                  small: 'icon.png'
                })

              data['images'] = images
            } else if (Boolean(data['singleImage'])) {
              data['singleImage'] =
                process.env.NODE_ENV === 'production'
                  ? {
                      original: await that.$fireStorage
                        .ref()
                        .child(`${data._type}/${data._doc}/1.jpg`)
                        .getDownloadURL(),
                      small: await that.$fireStorage
                        .ref()
                        .child(`${data._type}/${data._doc}/1_400x400.jpg`)
                        .getDownloadURL()
                    }
                  : {
                      original: 'icon.png',
                      small: 'icon.png'
                    }
            }

            mergedData.push(data as never)
          }
        }
        return mergedData
      })

      // sort the results
      .then((mergedData) =>
        mergedData.sort(
          (a, b) => (b as TimelineItem).date - (a as TimelineItem).date
        )
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
              date: new Date(prevYear, 1, 1).getTime(),
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
      'hacks'
    )
    commit('updateTimelineItems', items)
    return items
  },
  updateHoveredItem: ({ commit, state }, hoveredItem) => {
    commit('updateHoveredItem', hoveredItem)
    return state.hoveredItem
  }
}

export const getters = {
  getTimelineItems(state) {
    return state.timelineItems
  },
  getHoveredItem(state) {
    return state.hoveredItem
  }
}
