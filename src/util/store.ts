import { COLL_NAMES, PAGINATION_COUNT } from "~/util/constants";
import QuerySnapshot = firebase.firestore.QuerySnapshot
import firebase from 'firebase/app'
import 'firebase/firestore'
import Timestamp = firebase.firestore.Timestamp
import { TimelineItem } from '~/types/timeline'
import { TimelineHack } from "~/types/items/events/hack";
import { TimelineProject } from "~/types/items/project";
import { TimelineBook } from "~/types/items/book";
import { TimelineAchievement } from "~/types/items/achievement";

export const TIMELINE_TYPE_MAP = {
  events: TimelineHack,
  projects: TimelineProject,
  books: TimelineBook,
  achievements: TimelineAchievement
}

export const TIMELINE_SUBTITLE_MAP = {
  events: (that, item) => that.$t(item.type),
  projects: (that, item) => TimelineProject.getSubtitle(
    that.$t(item.type),
    that.$t('for'),
    that.$t(item.platform),
    item.platform
  ),
  books: (that, item) => item.author,
  achievements: (that, item) => item.organisation,
}

export const queryRefByType = (that, typeName) =>
  that.$fireStore
    .collection('timeline')
    .where('timelineType', '==', typeName)
    .orderBy('date', 'desc')

export const queryRefByTag = (that, tagName) =>
  that.$fireStore
    .collection('timeline')
    .where('tags', 'array-contains', tagName)
    .orderBy('date', 'desc')

export async function getDocsCountByType(that, typeName) {
  const sizeDoc = await that.$fireStore
    .collection(COLL_NAMES.SIZES)
    .doc('timelineType')
    .get()
  return sizeDoc.data()[typeName]
}

export async function getDocsCountByTag(that, tagName) {
  const sizeDoc = await that.$fireStore
    .collection(COLL_NAMES.SIZES)
    .doc('tags')
    .get()
  return sizeDoc.data()[tagName]
}

export function parseQuery(that, ss: QuerySnapshot) {
  return Promise.all(
    ss.docs.map(async (mDoc) => {
      const mDocType = mDoc.data().timelineType
      return (await TIMELINE_TYPE_MAP[mDocType].fromDoc(that, mDoc)) as never
    })
  )
}

export async function getItems(
  that,
  queryRef
) {
  const ss = await queryRef
    .limit(PAGINATION_COUNT)
    .get()
  return parseQuery(that, ss)
}

export async function getItemPage(that, urlName, timelineType, pageType) {
  let snapshot = await queryRefByType(that, timelineType)
    .where('urlName', '==', urlName)
    .limit(1)
    .get()
  let docData = snapshot.docs[0]

  return pageType.fromDocs(
    that,
    docData,
    await docData.ref
      .collection('page')
      .doc('doc')
      .get()
  )
}

export async function nextPage(
  that,
  queryRef,
  items: TimelineItem[]
) {
  return parseQuery(
    that,
    await queryRef
      .startAfter(
        Timestamp.fromMillis(items[items.length - 1].date.getTime())
      )
      .limit(PAGINATION_COUNT)
      .get()
  )
}

export async function prevPage(
  that,
  queryRef,
  items: TimelineItem[]
) {
  return parseQuery(
    that,
    await queryRef
      .endBefore(Timestamp.fromMillis(items[0].date.getTime()))
      .limitToLast(PAGINATION_COUNT)
      .get()
  )
}
