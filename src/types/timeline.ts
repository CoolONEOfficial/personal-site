import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { Item } from '~/types/types'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class TimelineItem extends Item {
  public _orderId!: number

  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    tags,
    public _type: string,
    public _doc: string
  ) {
    super(title, date, images, singleImage, description, tags)
  }

  static async fromDoc(
    that,
    doc: DocumentSnapshot
  ): Promise<TimelineItem> {
    const item = await super.fromDoc(that, doc)

    return new TimelineItem(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item.tags,
      doc.ref.parent.path,
      doc.id
    )
  }
}

export function isRtl(context, item: TimelineItem) {
  return !context.$device.isMobile && item._orderId % 2 !== 0
}
