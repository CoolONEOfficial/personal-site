import { TimelineItem } from '~/types/timeline'
import firebase from 'firebase/app'
import 'firebase/firestore'
import DocumentSnapshot = firebase.firestore.DocumentSnapshot
import DocumentData = firebase.firestore.DocumentData;
import { deepMerge } from "~/node_modules/@typescript-eslint/experimental-utils/dist/eslint-utils";
import { LocalizedString } from "~/types/types";

export enum EventType {
  OTHER = 'other',
  HACK = 'hack',
  MEETUP = 'meetup',
  CONFERENCE = 'conference',
  WEBINAR = 'webinar',
  LECTURE = 'lecture',
  TRAINING = 'training',
  MASTER_CLASS = 'master_class',
  FORUM = 'forum',
  TOURNAMENT = 'tournament',
  COMPETITION = 'competition',
  EXHIBITION = 'exhibition',
  FESTIVAL = 'festival',
  ROUND_TABLE = 'round_table',
  STUDY = 'study',
  EXCURSION = 'excursion'
}

export interface Geopoint {

  latitude, longitude: number
}

export interface Location {
  title: LocalizedString,
  geopoint: Geopoint
}

export class TimelineEvent extends TimelineItem {
  constructor(
    title,
    date,
    images,
    singleImage,
    description,
    tags,
    _type,
    _doc,
    public type: EventType,
    public location?: Location
  ) {
    super(title, date, images, singleImage, description, tags, _type, _doc)
  }

  static async fromDoc(that, doc: DocumentSnapshot): Promise<TimelineEvent> {
    const item = await super.fromDoc(that, doc)
    const data = doc.data() as DocumentData

    return new TimelineEvent(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item.tags,
      item._type,
      item._doc,
      data.type,
      data.location
    )
  }
}

export class PageEvent extends TimelineEvent {
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
    location,
    public videos
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
      location
    )
  }

  static async fromDocs(
    that,
    doc: DocumentSnapshot,
    docPage: DocumentSnapshot
  ): Promise<PageEvent> {
    const item = await super.fromDoc(that, doc)
    const data = deepMerge(doc.data(), docPage.data())

    return new PageEvent(
      item.title,
      item.date,
      item.images,
      item.singleImage,
      item.description,
      item.tags,
      item._type,
      item._doc,
      item.type,
      item.location,
      data.videos
    )
  }
}
