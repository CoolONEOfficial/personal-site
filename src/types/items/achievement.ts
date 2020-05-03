import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase/app'
import 'firebase/firestore'

import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import { deepMerge } from '~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils'
import DocumentData = firebase.firestore.DocumentData
import { LocalizedString } from "~/types/types";

export enum AchievementType {
  OTHER = 'other',
  DIPLOMA = 'diploma',
  CERTIFICATE = 'certificate'
}

export class TimelineAchievement extends TimelineItem {
  constructor(
    title,
    date,
    urlName,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    public type: AchievementType,
    public organisation: string
  ) {
    super(
      title,
      date,
      urlName,
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

  static async fromDoc(
    that,
    doc: DocumentSnapshot
  ): Promise<TimelineAchievement> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineAchievement(
      item.title,
      item.date,
      item.urlName,
      item.images,
      item.singleImage,
      item.logo,
      item.descriptionText,
      item.descriptionHtml,
      item.tags,
      item._type,
      item._doc,
      data.type,
      data.organisation
    )
  }
}

export class PageAchievement extends TimelineAchievement {
  constructor(
    title,
    date,
    urlName,
    images,
    singleImage,
    logo,
    descriptionText,
    descriptionHtml,
    tags,
    _type,
    _doc,
    type,
    organisation,
    public videos,
    public site
  ) {
    super(
      title,
      date,
      urlName,
      images,
      singleImage,
      logo,
      descriptionText,
      descriptionHtml,
      tags,
      _type,
      _doc,
      type,
      organisation
    )
  }

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageAchievement> {
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageAchievement(
      item.title,
      item.date,
      item.urlName,
      item.images,
      item.singleImage,
      item.logo,
      LocalizedString.mdToText(LocalizedString.fromMap(data.description)),
      LocalizedString.mdToHtml(LocalizedString.fromMap(data.description)),
      item.tags,
      item._type,
      item._doc,
      item.type,
      item.organisation,
      data.videos,
      data.site
    )
  }
}
