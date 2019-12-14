// const { db } = require('./index')

// const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebaseHelper = require('firebase-functions-helper/dist')
const request = require('request-promise')

require('dotenv').config()

const app = (module.exports = require('express')())

// admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

// Express app

function checkKey(key) {
  if (key === ('refresh_token' || 'access_token'))
    throw { error: '🔒 Cannot get protected stores. 🔒' }
}

app.get('/spotify/data/:key', async ({ params: { key } }, res) => {
  try {
    checkKey(key)
    const reply = await firestoreGet(key)
    res.json({ [key]: reply })
  } catch (err) {
    console.error(`\n🚨 There was an error at /test/get: ${err} 🚨\n`)
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
})

app.patch(
  '/spotify/data/:key/:value',
  async ({ params: { key, value } }, res) => {
    try {
      checkKey(key)
      const reply = await firestoreUpdate({ [key]: value })
      res.json({ [key]: reply })
    } catch (err) {
      console.error(`\n🚨 There was an error at /test/get: ${err} 🚨\n`)
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
    }
  }
)

const coll = 'spotify'
const doc = 'doc'

function firestoreUpdate(data) {
  return firebaseHelper.firestore.updateDocument(db, coll, doc, data)
}

function firestoreGetAll() {
  return firebaseHelper.firestore.getDocument(db, coll, doc)
}

async function firestoreGet(key) {
  return (await firestoreGetAll())[key]
}

app.get('/spotify/callback', async ({ query: { code } }, res) => {
  try {
    console.debug(
      'process.env.SPOTIFY_CLIENT_ID:',
      process.env.SPOTIFY_CLIENT_ID
    )
    console.debug(
      'process.env.SPOTIFY_CLIENT_SECRET:',
      process.env.SPOTIFY_CLIENT_SECRET
    )
    console.debug('process.env.CLIENT_URL:', process.env.CLIENT_URL)
    console.debug('code:', code)

    const data = await getSpotifyToken({
      code,
      grant_type: 'authorization_code'
    })
    if("error" in data) {
      throw data.error;
    }
    const { access_token, refresh_token, expires_in } = data
    const {
      id
    } = await getUserData(access_token)

    if (id !== process.env.SPOTIFY_USER_ID)
      throw "🤖 You aren't the droid we're looking for. 🤖"

    await firestoreUpdate({
      is_connected: true,
      refresh_token: refresh_token,
      access_token: access_token,
      expire_time: admin.firestore.Timestamp.fromMillis(Date.now() + expires_in * 1000)
    })

    const success = '🎉 Welcome Back 🎉'
    res.redirect(`/en/auth?success=${success}`)
  } catch (err) {
    console.error(
      `\n🚨 There was an error at /api/v1/spotify/callback: ${err} 🚨\n`
    )
    res.redirect(`/en/auth?message=${err}`)
  }
})

const getSpotifyToken = (props = {}) =>
  request({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      redirect_uri: `${process.env.CLIENT_URL}/api/v1/spotify/callback`,
      ...props
    },
    json: true
  })

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

const getUserData = (access_token) =>
  request.get(`${spotifyBaseUrl}me`, {
    headers: {
      withCredentials: true,
      Authorization: `Bearer ${access_token}`
    },
    json: true
  })

async function getAccessToken() {
  let { access_token, expire_time } = await firestoreGetAll()
  if (Date.now() > expire_time.toMillis()) {
    const refresh_token = await firestoreGet('refresh_token')
    const {
      access_token: new_access_token,
      expires_in
    } = await getSpotifyToken({
      refresh_token,
      grant_type: 'refresh_token'
    })
    await firestoreUpdate({
      expires_in: expires_in,
      expire_time: admin.firestore.Timestamp.fromMillis(Date.now() + expires_in * 1000),
      access_token: new_access_token
    })
    access_token = new_access_token
  }
  return access_token
}

app.get('/spotify/now-playing/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const data = await request.get(
      `${spotifyBaseUrl}me/player/currently-playing?market=US`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        },
        json: true
      }
    )
    await setLastPlayed(access_token, data)
    const reply = await firestoreGet('last_played')
    res.json({
      item: reply,
      is_playing: data !== undefined ? Boolean(data.is_playing) : false,
      progress_ms: data !== undefined ? data.progress_ms || 0 : 0
    })
  } catch (err) {
    console.error(err)
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
})

async function setLastPlayed(access_token, item) {
  if (!Boolean(item)) {
    const data = await request.get(
      `${spotifyBaseUrl}me/player/recently-played?market=US`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        },
        json: true
      }
    )
    await postStoredTrack(data.items[0].track)
  } else {
    await postStoredTrack(item.item)
  }
}

function postStoredTrack(props) {
  return firestoreUpdate({ last_played: props })
}
