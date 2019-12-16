import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

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

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<TimelineBook> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

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
    author
  ) {
    super(title, date, images, singleImage, description, _type, _doc, author)
  }

  // static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<PageBook> {
  //   const item = await super.fromDoc(that, doc)
  //
  //   return new PageBook(
  //     item.title,
  //     item.date,
  //     item.images,
  //     item.singleImage,
  //     item.description,
  //     item._type,
  //     item._doc,
  //     item.author
  //   )
  // }
}
