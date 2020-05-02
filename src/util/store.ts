import { PAGINATION_COUNT } from '~/util/constants'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import firebase from 'firebase/app'
import 'firebase/firestore'
import Timestamp = firebase.firestore.Timestamp
import { TimelineItem } from '~/types/timeline'

const queryRef = (that, collName) =>
  that.$fireStore
    .collection('timeline')
    .where('timelineType', '==', collName)
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
  let docRef, docData
  if(doc.length != 20) {
    let snapshot = await that.$fireStore
      .collection('timeline')
      .where('timelineType', '==', collName)
      .where('urlName', '==', doc)
      .limit(1)
      .get()
    docData = snapshot.docs[0]
    docRef = docData.ref
  } else {
    docRef = that.$fireStore
      .collection('timeline')
      .doc(doc)
    docData = await docRef.get()
  }

  return pageType.fromDocs(
    that,
    docData,
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
