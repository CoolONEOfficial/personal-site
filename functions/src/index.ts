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

      const timelineType = change.after.data()
      if (timelineType) {
        console.log("type +1: " + timelineType['timelineType'])
        return firebaseHelper.firestore.updateDocument(
          db,
          sizesColl,
          timelineType['timelineType'],
          {
            numberOfDocs: FieldValue.increment(1)
          }
        );
      }
    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : Do nothing
    } else if (!change.after.exists) {
      // Deleting document : subtract one from count

      const timelineType = change.before.data()
      if (timelineType) {
        console.log("type -1: " + timelineType['timelineType'])
        return firebaseHelper.firestore.updateDocument(
          db,
          sizesColl,
          timelineType['timelineType'],
          {
            numberOfDocs: FieldValue.increment(-1)
          }
        );
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
