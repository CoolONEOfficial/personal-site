import 'firebase/firestore'
import { BASE_URL, FIREBASE_OPTIONS } from "./constants";
import { db, storage } from "../nuxt.config";
import { convertToHTML } from "./md";

const title = {
  'en': 'Nikolay Trukhin\'s website',
  'ru': 'Cайт Николая Трухина'
}

const description = {
  'en': 'Here you can find information about all the projects and events I\'ve had the opportunity to participate in, as well as books I\'ve read.',
  'ru': 'Здесь доступна информация о всех проектах и событиях в которых мне довелось поучаствовать, а также книгах которые мне довелось прочитать'
}

function imageHtml(src: string, alt = '') {
  return  `<img src='${src}' alt='${alt}'><br/>`
}

module.exports = async () => {
  const feedList = []

  for (const lang of ['ru', 'en']) {
    feedList.push({
      path: `/${lang}.xml` as never,
      // @ts-ignore
      async create(feed) {
        const timeline = await db.collection('timeline')
          .orderBy('date', "desc")
          .get()

        feed.options = {
          title: title[lang],
          link: `${BASE_URL}/${lang}.xml`,
          description: description[lang],
          language: lang,
          image: `${BASE_URL}/favicon.jpg`,
          updated: timeline.docs[0].data()['date'].toDate(),
        }

        for (const doc of timeline.docs) {
          const data = doc.data();
          const page = await doc.ref
            .collection('page')
            .doc('doc')
            .get();
          const pageData = page.data();
          if (pageData) {
            const key = 'singleImage' in data && data['singleImage']
              ? 'singleImage'
              : 'logo';
            let content = imageHtml(
                await storage
                  .child(`timeline/${doc.id}/${key}/1${
                    data[key]}`)
                  .getDownloadURL()
              ) + convertToHTML(pageData.description[lang]);
            if ("images" in data && data["images"]) {
              const list = (
                await storage
                  .child(`timeline/${doc.id}/images`)
                  .list()
              ).items;

              for (let i = 0; i < list.length; i += 2) {
                content += imageHtml(await list[i].getDownloadURL())
              }
            }
            feed.addItem({
              title: data.title[lang],
              id: data.urlName,
              link: BASE_URL + '/' + data.timelineType + '/' + data.urlName,
              description: convertToHTML(data.description[lang]),
              content: content,
              date: data['date'].toDate()
            })
          }
        }

        feed.addCategory('IT/Portfolio/Blog/Programming')

        feed.addContributor({
          name: 'Nikolay Trukhin',
          email: 'coolone.official@gmail.com',
          link: BASE_URL
        })
      },
      cacheTime: 1000 * 60 * 15 as never,
      type: 'rss2' as never
    })
  }

  return feedList;
}
