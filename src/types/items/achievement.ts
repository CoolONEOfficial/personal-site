import { TimelineItem } from '~/types/timeline'
import { PageItem } from '~/types/page'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

interface Achievement {
  type: string
}

export class PageAchievement extends PageItem implements Achievement {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    public type: string
  ) {
    super(title, date, images, singleImage, description)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<PageAchievement> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new PageAchievement(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      data.type
    )
  }
}

export class TimelineAchievement extends TimelineItem implements Achievement {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public type: string
  ) {
    super(title, date, images, singleImage, description, _type, _doc)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<TimelineAchievement> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new TimelineAchievement(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
      data.type
    )
  }
}
