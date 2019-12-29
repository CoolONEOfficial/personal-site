import firebase from 'firebase/app'
import 'firebase/firestore'
import { Item } from '~/types/types'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot

export class TimelineItem extends Item {
  public _orderId!: number

  constructor(
    title,
    date,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    public _type: string,
    public _doc: string
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags
    )
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineItem> {
    const item = await super.fromDoc(that, doc)

    return new TimelineItem(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.logo,
      item.descriptionText,
      item.descriptionHtml,
      item.tags,
      doc.ref.parent.path,
      doc.id
    )
  }
}

export function isRtl(context, item: TimelineItem) {
  return !context.$device.isMobile && item._orderId % 2 !== 0
}
