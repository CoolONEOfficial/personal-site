import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import { PLACEHOLDER_IMAGE } from '~/util/constants'

export class Item {
  constructor(
    public title: LocalizedString,
    public date: Date,
    public images?: Image[],
    public singleImage?: Image,
    public description?: LocalizedString
  ) {}

  static async fromDoc(that, doc: QueryDocumentSnapshot): Promise<Item> {
    const data = doc.data()

    if (Boolean(data.images)) {
      let images: Image[]

      if (process.env.NODE_ENV === 'production') {
        const list = (
          await that.$fireStorage
            .ref()
            .child(`${doc.ref.parent.path}/${doc.id}/images`)
            .list()
        ).items

        images = []
        for (let i = 0; i < list.length; i += 2) {
          images.push({
            original: await list[i].getDownloadURL(),
            small: await list[i + 1].getDownloadURL()
          })
        }
      } else
        images = new Array(5).fill({
          original: PLACEHOLDER_IMAGE,
          small: PLACEHOLDER_IMAGE
        })

      data['images'] = images
    }

    if (Boolean(data.singleImage)) {
      data.singleImage =
        process.env.NODE_ENV === 'production'
          ? {
              original: await that.$fireStorage
                .ref()
                .child(`${doc.ref.parent.path}/${doc.id}/singleImage/1.jpg`)
                .getDownloadURL(),
              small: await that.$fireStorage
                .ref()
                .child(
                  `${doc.ref.parent.path}/${doc.id}/singleImage/1_400x400.jpg`
                )
                .getDownloadURL()
            }
          : {
              original: PLACEHOLDER_IMAGE,
              small: PLACEHOLDER_IMAGE
            }
    }

    return new Item(
      data.title,
      (data.date as Timestamp).toDate(),
      data.images,
      data.singleImage,
      data.description
    )
  }
}

export interface LocalizedString {
  en: string
  ru: string
}

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface Image {
  original: string
  small: string
}

export interface Location {
  title: LocalizedString
  geopoint: GeoPoint
}
