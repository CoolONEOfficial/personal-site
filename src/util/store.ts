import { PAGINATION_COUNT } from '~/util/constants'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import firebase from 'firebase/app'
import 'firebase/firestore'
import Timestamp = firebase.firestore.Timestamp
import { TimelineItem } from "~/types/timeline";

const queryRef = (that, collName) =>
  that.$fireStore.collection(collName).orderBy('date', 'desc')

export async function getDocsCount(that, collName) {
  const sizeDoc = await that.$fireStore
    .collection('sizes')
    .doc(collName)
    .get()
  return sizeDoc.data()['numberOfDocs']
}

export function parseQuery(that, ss: QuerySnapshot, timelineType) {
  return Promise.all(
    ss.docs.map(async (mDoc) => {
      return (await timelineType.fromDoc(that, mDoc)) as never
    })
  )
}

export async function getItems(that, collName, timelineType) {
  return parseQuery(
    that,
    await queryRef(that, collName)
      .limit(PAGINATION_COUNT)
      .get(),
    timelineType
  )
}

export async function getItemPage(that, doc, collName, pageType) {
  const docRef = that.$fireStore.collection(collName).doc(doc)

  return pageType.fromDocs(
    that,
    await docRef.get(),
    await docRef
      .collection('page')
      .doc('doc')
      .get()
  )
}

export async function nextPage(that, collName, items: TimelineItem[], timelineType) {
  return parseQuery(
    that,
    await queryRef(that, collName)
      .startAfter(Timestamp.fromDate(items[items.length - 1].date))
      .limit(PAGINATION_COUNT)
      .get(),
    timelineType,
  )
}

export async function prevPage(that, collName, items, timelineType) {
  return parseQuery(
    that,
    await queryRef(that, collName)
      .endBefore(Timestamp.fromMillis(items[0].date))
      .limitToLast(PAGINATION_COUNT)
      .get(),
    timelineType
  )
}
