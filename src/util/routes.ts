import {
  COLL_NAMES,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  LOCALES
} from './constants'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase
  .initializeApp({
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET
  })
  .firestore()
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

module.exports = async function getRoutes() {
  const routes: string[] = []

  for (const mLocale of LOCALES) {
    for (const mColl of [
      COLL_NAMES.EVENTS,
      COLL_NAMES.BOOKS,
      COLL_NAMES.PROJECTS,
      COLL_NAMES.ACHIEVEMENTS
    ]) {
      for (const mDoc of (await db.collection(mColl).get()).docs) {
        routes.push(`${mLocale.code}/${mColl}/${mDoc.id}`)
      }
    }
  }
  console.log('dynamic routes:', routes)

  return routes
}
