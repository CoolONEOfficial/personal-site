const axios = require('axios')
const express = require('express')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebaseHelper = require('firebase-functions-helper/dist')
const request = require('request-promise')

require('dotenv').config()

const app = (module.exports = require('express')())
// app.use(express.json())

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

// Redis

// function connectToRedis() {
//   const redisClient = redis.createClient(process.env.REDIS_URL)
//   redisClient.on('connect', () => {
//     console.log('\n🎉 Redis client connected 🎉\n')
//   })
//   redisClient.on('error', err => {
//     console.error(`\n🚨 Redis client could not connect: ${err} 🚨\n`)
//   })
//   return redisClient
// }

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

// app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {
//   try {
//     const { value } = query
//     const reply = value
//       ? await firestoreUpdate({ key: value })
//       : await firestoreGet(key) //await callStorage(...storageArgs(key, { value }))
//     res.send({ [key]: reply ?? 'none' })
//   } catch (err) {
//     console.error(`\n🚨 There was an error at /api/v1/spotify/data: ${err} 🚨\n`)
//     res.send(err)
//   }
// })

// function storageArgs(key, props) {
//   const { expires, body, value } = props
//   const val = Boolean(body) ? JSON.stringify(body) : value
//   return [
//     Boolean(val) ? 'set' : 'get',
//     key,
//     val,
//     Boolean(expires) ? 'EX' : null,
//     expires
//   ].filter((arg) => Boolean(arg))
// }

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

// async function callStorage(method, ...args) {
//   const redisClient = connectToRedis()
//   const response = await redisClient[method](...args)
//   redisClient.quit()
//   return response
// }

// app.post('/contacts', (req, res) => {
//   res.send('fsfs')
//   // try {
//   //   const contact = {
//   //     firstName: req.body['firstName'],
//   //     lastName: req.body['lastName'],
//   //     email: req.body['email']
//   //   }
//   //
//   //   res.status(201).send(`Created a new contact: ${contact.email}`);
//   // } catch (error) {
//   //   res.status(400).send(`Contact should only contains firstName, lastName and email!!!`)
//   // }
// })

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
      data: { id }
    } = await getUserData(access_token)

    if (id !== process.env.SPOTIFY_USER_ID)
      throw "🤖 You aren't the droid we're looking for. 🤖"

    await firestoreUpdate({
      is_connected: true,
      refresh_token: refresh_token,
      access_token: access_token,
      expire_time: admin.firestore.Timestamp.fromMillis(Date.now() + expires_in * 60000)
    })

    // callStorage(...storageArgs('is_connected', { value: true }))
    // callStorage(...storageArgs('refresh_token', { value: refresh_token }))
    // callStorage(
    //   ...storageArgs('access_token', {
    //     value: access_token,
    //     expires: expires_in
    //   })
    // )

    const success = '🎉 Welcome Back 🎉'
    res.redirect(`/en/inspire?success=${success}`)
  } catch (err) {
    console.error(
      `\n🚨 There was an error at /api/v1/spotify/callback: ${err} 🚨\n`
    )
    res.redirect(`/en/inspire?message=${err}`)
  }
})
//
// function encodeToBase64(str) {
//   return Buffer.from(str).toString('base64')
// }

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
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    json: true
  })

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

const getUserData = (access_token) =>
  axios.get(`${spotifyBaseUrl}me`, {
    headers: {
      withCredentials: true,
      Authorization: `Bearer ${access_token}`
    }
  })

async function getAccessToken() {
  //const redisClient = connectToRedis()
  let { access_token, expire_time } = await firestoreGetAll()
  // let accessToken = { value: await firestoreGet('access_token') }
  if (Date.now() > expire_time.toMillis()) {
    const refresh_token = await firestoreGet('refresh_token')
    const {
      data: { new_access_token, expires_in }
    } = await getSpotifyToken({
      refresh_token,
      grant_type: 'refresh_token'
    })
    await firestoreUpdate({
      expires_in: expires_in,
      access_token: new_access_token
    })
    access_token = new_access_token
    // Object.assign(accessTokenObj, {
    //   value: access_token,
    //   expires: expires_in
    // })
    //callStorage(...storageArgs('access_token', { ...accessTokenObj }))
  }
  return access_token
}

app.get('/spotify/now-playing/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const response = await request.get(
      `${spotifyBaseUrl}me/player/currently-playing?market=US`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        },
        json: true
      }
    )
    const data = response
    await setLastPlayed(access_token, data)
    const reply = await firestoreGet('last_played')
    res.json({
      item: reply,
      is_playing: Boolean(data.is_playing),
      progress_ms: data.progress_ms || 0
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
  // callStorage(
  //   ...storageArgs('last_played', {
  //     body: props
  //   })
  // )
}

// // const app = (module.exports = require('express')())
// //
// // app.all('/test', (_, res) => {
// //   res.send('Success! 🎉\n')
// // })
//
// // import express from 'express'
// // import redis from 'async-redis'
// // import axios from 'axios'
// // import * as functions from 'firebase-functions'
// // import * as admin from 'firebase-admin'
// // import * as firebaseHelper from 'firebase-functions-helper/dist'
//
// const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const firebaseHelper = require('firebase-functions-helper/dist')
//
// // require('dotenv').config()
//
// admin.initializeApp(functions.config().firebase)
// const db = admin.firestore()
//
// const app = (module.exports = require('express')())
// // app.use(express.json())
//
// // Redis
//
// // function connectToRedis() {
// //   const redisClient = redis.createClient(process.env.REDIS_URL)
// //   redisClient.on('connect', () => {
// //     console.log('\n🎉 Redis client connected 🎉\n')
// //   })
// //   redisClient.on('error', (err) => {
// //     console.error(`\n🚨 Redis client could not connect: ${err} 🚨\n`)
// //   })
// //   return redisClient
// // }
//
// // Express app
//
// // // Add new contact
// // app.post('/contacts', async (req, res) => {
// //   try {
// //     const contact: Contact = {
// //       firstName: req.body['firstName'],
// //       lastName: req.body['lastName'],
// //       email: req.body['email']
// //     }
// //
// //     const newDoc = await firebaseHelper.firestore
// //       .createNewDocument(db, contactsCollection, contact);
// //     res.status(201).send(`Created a new contact: ${newDoc.id}`);
// //   } catch (error) {
// //     res.status(400).send(`Contact should only contains firstName, lastName and email!!!`)
// //   }
// // })
//
// // interface Contact {
// //   firstName: String
// //   lastName: String
// //   email: String
// // }
// const contactsCollection = 'contacts';
//
// app.all('/test', async (req, res) => {
//   try {
//     const contact = {
//       firstName: 're',
//       lastName: 'sd',
//       email: 'sdf'
//     }
//
//     const newDoc = await firebaseHelper.firestore.createNewDocument(
//       db,
//       contactsCollection,
//       contact
//     )
//     res.status(201).send(`Created a new contact: ${newDoc.id}`)
//   } catch (error) {
//     res
//       .status(400)
//       .send(`Contact should only contains firstName, lastName and email!!!`)
//   }
//
//   res.send('Successdfsd! 🎉\n')
// })
// //
// // app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {
// //   try {
// //     if (key === ('refresh_token' || 'access_token'))
// //       throw { error: '🔒 Cannot get protected stores. 🔒' }
// //     const { value } = query
// //     const reply = await callStorage(...storageArgs(key, { value }))
// //     res.send({ [key]: reply })
// //   } catch (err) {
// //     console.error(`\n🚨 There was an error at /api/v1/spotify/data: ${err} 🚨\n`)
// //     res.send(err)
// //   }
// // })
// //
// // function storageArgs(key?, props?) {
// //   const { expires, body, value } = props
// //   const val = body ? JSON.stringify(body) : value
// //   return [
// //     val ? 'set' : 'get',
// //     key,
// //     val,
// //     expires ? 'EX' : null,
// //     expires
// //   ].filter((arg) => Boolean(arg))
// // }
// //
// // async function callStorage(method?, ...args) {
// //   const redisClient = connectToRedis()
// //   const response = await redisClient[method](...args)
// //   redisClient.quit()
// //   return response
// // }
// //
// // app.get('/spotify/callback', async ({ query: { code } }, res) => {
// //   try {
// //     const { data } = await getSpotifyToken({
// //       code,
// //       grant_type: 'authorization_code'
// //     })
// //     const { access_token, refresh_token, expires_in } = data
// //     const {
// //       data: { id }
// //     } = await getUserData(access_token)
// //
// //     if (id !== process.env.SPOTIFY_USER_ID)
// //       throw "🤖 You aren't the droid we're looking for. 🤖"
// //
// //     callStorage(...storageArgs('is_connected', { value: true }))
// //     callStorage(...storageArgs('refresh_token', { value: refresh_token }))
// //     callStorage(
// //       ...storageArgs('access_token', {
// //         value: access_token,
// //         expires: expires_in
// //       })
// //     )
// //
// //     const success = '🎉 Welcome Back 🎉'
// //     res.redirect(`/auth?success=${success}`)
// //   } catch (err) {
// //     console.error(
// //       `\n🚨 There was an error at /api/v1/spotify/callback: ${err} 🚨\n`
// //     )
// //     res.redirect(`/auth?message=${err}`)
// //   }
// // })
// //
// // const getSpotifyToken = (props = {}) =>
// //   axios({
// //     method: 'post',
// //     url: 'https://accounts.spotify.com/api/token',
// //     params: {
// //       client_id: process.env.SPOTIFY_CLIENT_ID,
// //       client_secret: process.env.SPOTIFY_CLIENT_SECRET,
// //       redirect_uri: `${process.env.CLIENT_URL}/api/v1/spotify/callback`,
// //       ...props
// //     },
// //     headers: {
// //       'Content-Type': 'application/x-www-form-urlencoded'
// //     }
// //   })
// //
// // const spotifyBaseUrl = 'https://api.spotify.com/v1/'
// //
// // const getUserData = (access_token) =>
// //   axios.get(`${spotifyBaseUrl}me`, {
// //     headers: {
// //       withCredentials: true,
// //       Authorization: `Bearer ${access_token}`
// //     }
// //   })
// //
// // async function getAccessToken() {
// //   const redisClient = connectToRedis()
// //   const accessTokenObj = { value: await redisClient.get('access_token') }
// //   if (!accessTokenObj.value) {
// //     const refresh_token = await redisClient.get('refresh_token')
// //     const {
// //       data: { access_token, expires_in }
// //     } = await getSpotifyToken({
// //       refresh_token,
// //       grant_type: 'refresh_token'
// //     })
// //     Object.assign(accessTokenObj, {
// //       value: access_token,
// //       expires: expires_in
// //     })
// //     callStorage(...storageArgs('access_token', { ...accessTokenObj }))
// //   }
// //   redisClient.quit()
// //   return accessTokenObj.value
// // }
// //
// // app.get('/spotify/now-playing/', async (req, res) => {
// //   try {
// //     const access_token = await getAccessToken()
// //     const response = await axios.get(
// //       `${spotifyBaseUrl}me/player/currently-playing?market=US`,
// //       {
// //         headers: {
// //           withCredentials: true,
// //           Authorization: `Bearer ${access_token}`
// //         }
// //       }
// //     )
// //     const { data } = response
// //     setLastPlayed(access_token, data)
// //     const reply = await callStorage('get', 'last_played')
// //     res.send({
// //       item: JSON.parse(reply),
// //       is_playing: Boolean(data.is_playing),
// //       progress_ms: data.progress_ms || 0
// //     })
// //   } catch (err) {
// //     console.error(err)
// //     res.send({ error: err.message })
// //   }
// // })
// //
// // async function setLastPlayed(access_token, item) {
// //   if (!item) {
// //     const { data } = await axios.get(
// //       `${spotifyBaseUrl}me/player/recently-played?market=US`,
// //       {
// //         headers: {
// //           withCredentials: true,
// //           Authorization: `Bearer ${access_token}`
// //         }
// //       }
// //     )
// //     postStoredTrack(data.items[0].track)
// //   } else {
// //     postStoredTrack(item.item)
// //   }
// // }
// //
// // function postStoredTrack(props) {
// //   callStorage(
// //     ...storageArgs('last_played', {
// //       body: props
// //     })
// //   )
// // }
