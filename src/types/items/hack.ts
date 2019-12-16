import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

interface Hack {
  place: number
  location: Location
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

export class PageHack extends TimelineHack {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    location,
    place
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      description,
      _type,
      _doc,
      location,
      place
    )
  }

  // static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<PageHack> {
  //   const item = await super.fromDoc(that, doc)
  //
  //   return new PageHack(
  //     item.title,
  //     item.date,
  //     item.images,
  //     item.singleImage,
  //     item.description,
  //     item._type,
  //     item._doc,
  //     item.location,
  //     item.place
  //   )
  // }
}
