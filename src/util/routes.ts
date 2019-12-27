import {
  COLL_NAMES,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET
} from './constants'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase
  .initializeApp({
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET
  })
  .firestore()

module.exports = async function getRoutes() {
  const routes: string[] = []

  for (const mColl of [
    COLL_NAMES.EVENTS,
    COLL_NAMES.BOOKS,
    COLL_NAMES.PROJECTS,
    COLL_NAMES.ACHIEVEMENTS
  ]) {
    for (const mDoc of (await db.collection(mColl).get()).docs) {
      routes.push(`${mColl}/${mDoc.id}`)
    }
  }
  console.log('test routes!', routes)

  return routes
}
