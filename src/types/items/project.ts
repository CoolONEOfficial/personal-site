import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export class TimelineProject extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public category: string
  ) {
    super(title, date, images, singleImage, description, _type, _doc)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<TimelineProject> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new TimelineProject(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
      data.category
    )
  }
}

export class PageProject extends TimelineProject {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    category,
    public github: string,
    public platform: string
  ) {
    super(title, date, images, singleImage, description, _type, _doc, category)
  }

  static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<PageProject> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new PageProject(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
      item.category,
      data.github,
      data.platform
    )
  }
}
