export default function(req, res, next) {
  if (req && req.url == '/') {
    const langHeader = req.headers['accept-language']
    const locale = langHeader
      ? langHeader
          .split(',')[0]
          .toLocaleLowerCase()
          .substring(0, 2)
      : 'en'
    console.log('browser locale: ', locale)

    res.writeHead(301, {
      Location: `/${locale in ['ru', 'en'] ? locale : 'en'}`
    })
    res.end()

    // if (params && Object.keys(params).length === 0 && params.constructor === Object) {
    //   redirect(app.localePath(app.getRouteBaseName()))
    // } else {
    //   redirect(app.localePath({name: app.getRouteBaseName(), params: params}))
    // }
  } else next()
}
