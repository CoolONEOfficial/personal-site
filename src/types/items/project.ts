import { TimelineItem } from '~/types/timeline'
import { PageItem } from '~/types/page'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

interface Project {
  category: string
}

export class PageProject extends PageItem implements Project {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    public category: string
  ) {
    super(title, date, images, singleImage, description)
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
      data.category
    )
  }
}

export class TimelineProject extends TimelineItem implements Project {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public category: string,
    public github: string,
    public platform: string
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
      data.category,
      data.location,
      data.place
    )
  }
}
