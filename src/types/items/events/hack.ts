import { TimelineEvent } from '~/types/items/event'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import firebase from 'firebase/app'
import 'firebase/firestore'
import DocumentData = firebase.firestore.DocumentData
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import { LocalizedString } from '~/types/types'

export class TimelineHack extends TimelineEvent {
  constructor(
    title,
    date,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    type,
    location,
    public place: String
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags,
      _type,
      _doc,
      type,
      location
    )
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineHack> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineHack(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.logo,
      item.descriptionText,
      item.descriptionHtml,
      item.tags,
      item._type,
      item._doc,
      item.type,
      item.location,
      data.place
    )
  }
}

export class PageHack extends TimelineHack {
  constructor(
    title,
    date,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    type,
    location,
    place,
    public videos,
    public site
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags,
      _type,
      _doc,
      type,
      location,
      place
    )
  }

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageHack> {
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageHack(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.logo,
      LocalizedString.mdToText(LocalizedString.fromMap(data.description)),
      LocalizedString.mdToHtml(LocalizedString.fromMap(data.description)),
      item.tags,
      item._type,
      item._doc,
      item.type,
      item.location,
      item.place,
      data.videos,
      data.site
    )
  }
}
