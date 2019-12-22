import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { PLACEHOLDER_IMAGE } from '~/util/constants'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import DocumentData = firebase.firestore.DocumentData

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
    doc: DocumentSnapshot
  ): Promise<TimelineAchievement> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

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
    tags,
    public url
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

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageAchievement> {
    console.log(`path: ${doc.ref.path}`);
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageAchievement(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item._type,
      item._doc,
      item.type,
      item.logo,
      item.organisation,
      item.tags,
      data.url
    )
  }
}
