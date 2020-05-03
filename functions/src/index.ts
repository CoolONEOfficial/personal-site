import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;

// Write listeners

const firebaseHelper = require("firebase-functions-helper/dist");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const sizesColl = "sizes";

export const documentWriteListener = functions.firestore
  .document("timeline/{documentId}")
  .onWrite((change, context) => {

    if (!change.before.exists) {
      // New document Created : add one to count

      const afterData = change.after.data()
      if (afterData) {
        let promiseList = []

        const timelineType = afterData['timelineType'];
        if (timelineType) {
          console.log("type +1: " + timelineType)
          promiseList.push(firebaseHelper.firestore.updateDocument(
            db,
            sizesColl,
            'timelineType',
            {
              [timelineType]: FieldValue.increment(1)
            }
          ) as never);
        }

        const tags = afterData['tags'];
        if (tags) {
          for (const tag of tags) {
            console.log("type +1 tag: " + tag)
            promiseList.push(firebaseHelper.firestore.updateDocument(
              db,
              sizesColl,
              'tags',
              {
                [tag]: FieldValue.increment(1)
              }
            ) as never);
          }

        }

        return Promise.all(promiseList)
      }
    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : Do nothing
    } else if (!change.after.exists) {
      // Deleting document : subtract one from count

      const beforeData = change.before.data()
      if (beforeData) {
        let promiseList = []

        const timelineType = beforeData['timelineType'];
        if (timelineType) {
          console.log("type -1: " + timelineType)
          promiseList.push(firebaseHelper.firestore.updateDocument(
            db,
            sizesColl,
            'timelineType',
            {
              [timelineType]: FieldValue.increment(-1)
            }
          ) as never);
        }

        const tags = beforeData['tags'];
        if (tags) {
          for (const tag of tags) {
            console.log("type -1 tag: " + tag)
            promiseList.push(firebaseHelper.firestore.updateDocument(
              db,
              sizesColl,
              'tags',
              {
                [tag]: FieldValue.increment(-1)
              }
            ) as never);
          }

        }

        return Promise.all(promiseList)
      }
    }

    return;
  });

// Env vars

const config = functions.config();
// Porting envs from firebase config
for (const key in config.envs) {
  process.env[key.toUpperCase()] = config.envs[key];
}

// Web api

const main = express();

main.use("/api/v1", require("../src/spotify.ts"));

exports.webApi = functions.https.onRequest(main);
