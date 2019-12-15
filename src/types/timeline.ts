import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { Item } from '~/types/types'

export class TimelineItem extends Item {
  public _orderId!: number

  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    public _type: string,
    public _doc: string
  ) {
    super(title, date, images, singleImage, description)
  }

  static async fromDoc(
    that,
    doc: QueryDocumentSnapshot
  ): Promise<TimelineItem> {
    const item = await super.fromDoc(that, doc)

    return new TimelineItem(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      doc.ref.parent.path,
      doc.id
    )
  }
}

export function isRtl(context, item: TimelineItem) {
  return !context.$device.isMobile && item._orderId % 2 !== 0
}
