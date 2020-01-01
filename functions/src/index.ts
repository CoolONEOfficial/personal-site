import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;

// Write listeners

const firebaseHelper = require("firebase-functions-helper/dist");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const sizesColl = "sizes";
const listenCollections = ["achievements", "projects", "events", "books"];

export const documentWriteListener = functions.firestore
  .document("{collectionId}/${doc}/${timeline}/{documentUid}")
  .onWrite((change, context) => {
    if (
      listenCollections.indexOf(context.params.collectionId) > -1 &&
      context.params.doc == "doc" &&
      context.params.timeline === "timeline"
    ) {
      if (!change.before.exists) {
        // New document Created : add one to count

        return firebaseHelper.firestore.updateDocument(
          db,
          sizesColl,
          context.params.collectionId,
          {
            numberOfDocs: FieldValue.increment(1)
          }
        );
      } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing
      } else if (!change.after.exists) {
        // Deleting document : subtract one from count

        return firebaseHelper.firestore.updateDocument(
          db,
          sizesColl,
          context.params.collectionId,
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
