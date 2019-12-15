import { TimelineItem } from '~/types/timeline'
import { PageItem } from '~/types/page'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

interface Hack {
  place: number
  location: Location
}

export class PageHack extends PageItem implements Hack {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    public location: Location,
    public place: number
  ) {
    super(title, date, images, singleImage, description)
  }

  static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<PageHack> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new PageHack(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      data.location,
      data.place
    )
  }
}

export class TimelineHack extends TimelineItem implements Hack {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public location: Location,
    public place: number
  ) {
    super(title, date, images, singleImage, description, _type, _doc)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<TimelineHack> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data()

    return new TimelineHack(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
      data.location,
      data.place
    )
  }
}
