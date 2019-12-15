import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { PageItem } from "~/types/page";

interface Book {
  author: string
}

export class PageBook extends PageItem implements Book {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    public author: string
  ) {
    super(title, date, images, singleImage, description)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<PageBook> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new PageBook(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      data.author
    )
  }
}

export class TimelineBook extends TimelineItem implements Book {
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
