import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { PLACEHOLDER_IMAGE } from '~/util/constants'

export class TimelineAchievement extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public type: string,
    public logo: string,
    public organisation: string,
    public tags: string[]
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
      data.type,
      process.env.NODE_ENV === 'production'
        ? await that.$fireStorage
            .ref()
            .child(`${item._type}/${item._doc}/logo_400x400.jpg`)
            .getDownloadURL()
        : PLACEHOLDER_IMAGE,
      data.organisation,
      data.tags
    )
  }
}

export class PageAchievement extends TimelineAchievement {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    type,
    logo,
    organisation,
    tags
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      description,
      _type,
      _doc,
      type,
      logo,
      organisation,
      tags
    )
  }

  // static async fromDoc(
  //   that,
  //   doc: QueryDocumentSnapshot
  // ): Promise<PageAchievement> {
  //   const item = await super.fromDoc(that, doc)
  //
  //   return new PageAchievement(
  //     item.title,
  //     item.date,
  //     item.images,
  //     item.singleImage,
  //     item.description,
  //     item._type,
  //     item._doc,
  //     item.type
  //   )
  // }
}
