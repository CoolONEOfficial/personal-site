import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'

export enum ProjectType {
  MOBILE_APP = 'other',
  GAME = 'hackathon'
}

export class TimelineProject extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    tags,
    _type,
    _doc,
    public type: ProjectType
  ) {
    super(title, date, images, singleImage, description, tags, _type, _doc)
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineProject> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineProject(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item.tags,
      item._type,
      item._doc,
      data.type
    )
  }
}

export class PageProject extends TimelineProject {
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
    public github,
    public platform
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
      type
    )
  }

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageProject> {
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageProject(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item.tags,
      item._type,
      item._doc,
      item.type,
      data.github,
      data.platform
    )
  }
}
