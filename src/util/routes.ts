import {
  FIREBASE_OPTIONS
} from "./constants";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from "../nuxt.config";

module.exports = async function getRoutes() {
  const routes: string[] = [];
  const tags: string[] = [];

  for (const mDoc of (
    await db.collection('timeline')
      .get()
  ).docs) {
    routes.push(`${mDoc.data().timelineType}/${
      'urlName' in mDoc.data()
        ? mDoc.data()['urlName']
        : mDoc.id
    }`)
    tags.push(...mDoc.data().tags)
  }

  const totalTags = Array.from(new Set(tags))
  for (const tag of totalTags) {
    routes.push(`tag/${tag}`)
  }

  console.log('dynamic routes:', routes)

  return routes
}
