import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;

// Write listeners

const firebaseHelper = require("firebase-functions-helper/dist");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const sizesColl = "sizes";
const listenCollections = ["achievements", "projects", "hacks", "books"];

export const documentWriteListener = functions.firestore
  .document("{collectionId}/{documentUid}")
  .onWrite((change, context) => {
    if (listenCollections.indexOf(context.params.collectionId) > -1) {
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

// SSR

const { Nuxt } = require("nuxt");

const ssrapp = express();
const nuxt = new Nuxt({
  dev: false,
  debug: true,
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/"
  }
});

function handleRequest(req, res) {
  res.set("Cache-Control", "public, max-age=10, s-maxage=10");
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject);
    });
  });
}

ssrapp.use(handleRequest);

exports.ssr = functions.https.onRequest(ssrapp);

// Web api

const main = express();

main.use("/api/v1", require("../src/spotify.ts"));

exports.webApi = functions.https.onRequest(main);
