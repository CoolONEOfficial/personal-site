import {
  COLL_NAMES,
  LOCALES,
  FIREBASE_OPTIONS
} from "./constants";
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase
  .initializeApp(FIREBASE_OPTIONS)
  .firestore()

module.exports = async function getRoutes() {
  const routes: string[] = []

  for (const mColl of [
    COLL_NAMES.EVENTS,
    COLL_NAMES.BOOKS,
    COLL_NAMES.PROJECTS,
    COLL_NAMES.ACHIEVEMENTS
  ]) {
    for (const mDoc of (
      await db.collection(mColl)
        .doc('doc')
        .collection('timeline')
        .get()
    ).docs) {
      routes.push(`${mColl}/${mDoc.id}`)
    }
  }

  console.log('dynamic routes:', routes)

  return routes
}
