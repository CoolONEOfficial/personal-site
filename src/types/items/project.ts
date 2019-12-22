import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData;
import { deepMerge } from "~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils";

export class TimelineProject extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    _type,
    _doc,
    public category: string
  ) {
    super(title, date, images, singleImage, description, _type, _doc)
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
      item._type,
      item._doc,
      data.category
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
    _type,
    _doc,
    category,
    public github,
    public platform
  ) {
    super(title, date, images, singleImage, description, _type, _doc, category)
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
      item._type,
      item._doc,
      item.description,
      data.github,
      data.platform
    )
  }
}
