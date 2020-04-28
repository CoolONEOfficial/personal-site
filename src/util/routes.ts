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

  for (const mDoc of (
    await db.collection('timeline')
      .get()
  ).docs) {
    routes.push(`${mDoc.data().timelineType}/${mDoc.id}`)
  }

  console.log('dynamic routes:', routes)

  return routes
}
