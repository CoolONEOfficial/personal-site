import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase/app'
import 'firebase/firestore'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData
import { LocalizedString } from "~/types/types";

export class TimelineBook extends TimelineItem {
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
    public author: string
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
      _doc
    )
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineBook> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineBook(
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
      data.author
    )
  }
}

export class PageBook extends TimelineBook {
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
    author,
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
      author
    )
  }

  static async fromDocs(
    that,
    doc: QueryDocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageBook> {
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageBook(
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
      item.author,
      data.site
    )
  }
}
