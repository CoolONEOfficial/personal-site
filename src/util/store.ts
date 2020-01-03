import { PAGINATION_COUNT } from '~/util/constants'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import firebase from 'firebase/app'
import 'firebase/firestore'
import Timestamp = firebase.firestore.Timestamp
import { TimelineItem } from '~/types/timeline'
import { DocumentSnapshotBuilder } from '~/node_modules/@google-cloud/firestore/build/src/document'

const queryRef = (that, collName) =>
  that.$fireStore
    .collection(collName)
    .doc('doc')
    .collection('timeline')
    .orderBy('date', 'desc')

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
  const ss = await queryRef(that, collName)
    .limit(PAGINATION_COUNT)
    .get()
  return parseQuery(that, ss, timelineType)
}

export async function getItemPage(that, doc, collName, pageType) {
  const docRef = that.$fireStore
    .collection(collName)
    .doc('doc')
    .collection('timeline')
    .doc(doc)

  return pageType.fromDocs(
    that,
    await docRef.get(),
    await docRef
      .collection('page')
      .doc('doc')
      .get()
  )
}

export async function nextPage(
  that,
  collName,
  items: TimelineItem[],
  timelineType
) {
  return parseQuery(
    that,
    await queryRef(that, collName)
      .startAfter(
        Timestamp.fromMillis(items[items.length - 1].date.getTime())
      )
      .limit(PAGINATION_COUNT)
      .get(),
    timelineType
  )
}

export async function prevPage(
  that,
  collName,
  items: TimelineItem[],
  timelineType
) {
  return parseQuery(
    that,
    await queryRef(that, collName)
      .endBefore(Timestamp.fromMillis(items[0].date.getTime()))
      .limitToLast(PAGINATION_COUNT)
      .get(),
    timelineType
  )
}
