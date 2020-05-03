import 'firebase/firestore'
import { TimelineItem } from '~/types/timeline'
import { TIMELINE_TYPE_MAP } from "~/util/store";

export const state = () => ({
  timelineItems: [],
  hoveredItem: null,
  lastDate: null
})

export const mutations = {
  addTimelineItems(state, payload) {
    state.timelineItems.push(...payload)
  },
  updateLastDate(state, payload) {
    state.lastDate = payload
  },
  updateHoveredItem(state, hoveredItem) {
    state.hoveredItem = hoveredItem
  }
}

export const actions = {
  async loadTimelineItems({ commit, getters }) {
    const queryRef = (this as any).$fireStore
      .collection('timeline')
      .orderBy('date', 'desc')
    const timelineDocs = (
      await (getters.getLastDate != null
        ? queryRef.startAfter(getters.getLastDate)
        : queryRef
      )
        .limit(10)
        .get()
    ).docs

    const timelineData: TimelineItem[] = []

    for (const mDoc of timelineDocs) {
      const mDocType = mDoc.data().timelineType

      timelineData.push((await TIMELINE_TYPE_MAP[mDocType].fromDoc(this, mDoc)) as never)
    }

    if (timelineData.length > 0) {
      commit('updateLastDate', timelineData[timelineData.length - 1].date)

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
            date:
              prevYear - currentYear > 1
                ? `${currentYear + 1} — ${prevYear}`
                : prevYear,
            _type: 'years'
          } as never)
          index++
        }
      }

      commit('addTimelineItems', timelineData)
    }

    return timelineData
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
  },
  getLastDate(state) {
    return state.lastDate
  }
}
