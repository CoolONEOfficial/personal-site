import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { PLACEHOLDER_IMAGE } from '~/util/constants'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import DocumentData = firebase.firestore.DocumentData

export enum AchievementType {
  OTHER = 'other',
  DIPLOMA = 'diploma',
  CERTIFICATE = 'certificate',
}

export class TimelineAchievement extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    tags,
    _type,
    _doc,
    public type: AchievementType,
    public logo: string,
    public organisation: string
  ) {
    super(title, date, images, singleImage, description, tags, _type, _doc)
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
      item.tags,
      item._type,
      item._doc,
      data.type,
      process.env.NODE_ENV === 'production'
        ? await that.$fireStorage
            .ref()
            .child(`${item._type}/${item._doc}/logo_400x400.jpg`)
            .getDownloadURL()
        : PLACEHOLDER_IMAGE,
      data.organisation
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
    tags,
    _type,
    _doc,
    type,
    logo,
    organisation,
    public url
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      description,
      tags,
      _type,
      _doc,
      type,
      logo,
      organisation
    )
  }

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageAchievement> {
    const item = await super.fromDoc(that, doc)
    console.log('doc: ', doc.data(), '....... docPage: ', docPage.data());
    const data = deepMerge(doc.data(), docPage.data())
    console.log('result: ', data)

    return new PageAchievement(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      data.description,
      item.tags,
      item._type,
      item._doc,
      item.type,
      item.logo,
      item.organisation,
      data.url
    )
  }
}
