const app = (module.exports = require('express')())

app.all('/test', (_, res) => {
  res.send('Success! 🎉\n')
})
