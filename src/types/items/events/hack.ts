import { TimelineEvent } from '~/types/items/event'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import firebase from 'firebase'
import DocumentData = firebase.firestore.DocumentData;

export class TimelineHack extends TimelineEvent {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    location,
    public place: String
  ) {
    super(title, date, images, singleImage, description, _type, _doc, location)
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineHack> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineHack(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
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

  // static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<PageEvent> {
  //   const item = await super.fromDoc(that, doc)
  //
  //   return new PageEvent(
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
