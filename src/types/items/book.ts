import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData;

export class TimelineBook extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public author: string
  ) {
    super(title, date, images, singleImage, description, _type, _doc)
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineBook> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineBook(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
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
    description,
    _type,
    _doc,
    author,
    public url: String
  ) {
    super(title, date, images, singleImage, description, _type, _doc, author)
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
      item.description,
      item._type,
      item._doc,
      item.author,
      data.url as String
    )
  }
}
