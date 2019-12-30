import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase/app'
import 'firebase/firestore'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import { LocalizedString } from "~/types/types";

export enum ProjectType {
  APP = 'app',
  GAME = 'game'
}

export enum ProjectPlatform {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  WEB = 'web',
  WINDOWS = 'windows',
  LINUX = 'linux',
  MACOSX = 'macosx',
  ANDROID = 'android',
  IOS = 'ios'
}

export class TimelineProject extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    public type: ProjectType,
    public platform: ProjectPlatform
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags,
      _type,
      _doc
    )
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineProject> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineProject(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.logo,
      item.descriptionText,
      item.descriptionHtml,
      item.tags,
      item._type,
      item._doc,
      data.type,
      data.platform
    )
  }
}

export class PageProject extends TimelineProject {
  constructor(
    title,
    date,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    type,
    platform,
    public github
  ) {
    super(
      title,
      date,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags,
      _type,
      _doc,
      type,
      platform
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
      item.logo,
      LocalizedString.mdToText(LocalizedString.fromMap(data.description)),
      LocalizedString.mdToHtml(LocalizedString.fromMap(data.description)),
      item.tags,
      item._type,
      item._doc,
      item.type,
      data.platform as ProjectPlatform,
      data.github
    )
  }
}
