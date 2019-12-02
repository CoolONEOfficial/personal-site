import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as firebaseHelper from 'firebase-functions-helper/dist';
import * as express from 'express';
import * as bodyParser from "body-parser";

// SSR

const { Nuxt } = require("nuxt");

const ssrapp = express();
const nuxt = new Nuxt({
  dev: false,
  debug: true,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/'
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

admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

// const app = express();
const main = express();

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api/v1', require('../personal-site/src/api/index.ts'));

// const contactsCollection = 'contacts';

exports.webApi = functions.https.onRequest(main);

// interface Contact {
//   firstName: String
//   lastName: String
//   email: String
// }

// // Add new contact
// app.post('/contacts', async (req, res) => {
//   try {
//     const contact: Contact = {
//       firstName: req.body['firstName'],
//       lastName: req.body['lastName'],
//       email: req.body['email']
//     }
//
//     const newDoc = await firebaseHelper.firestore
//       .createNewDocument(db, contactsCollection, contact);
//     res.status(201).send(`Created a new contact: ${newDoc.id}`);
//   } catch (error) {
//     res.status(400).send(`Contact should only contains firstName, lastName and email!!!`)
//   }
// })
//
// // Update new contact
// app.patch('/contacts/:contactId', async (req, res) => {
//   const updatedDoc = await firebaseHelper.firestore
//     .updateDocument(db, contactsCollection, req.params.contactId, req.body);
//   res.status(204).send(`Update a new contact: ${updatedDoc}`);
// })
//
// // View a contact
// app.get('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore
//     .getDocument(db, contactsCollection, req.params.contactId)
//     .then(doc => res.status(200).send(doc))
//     .catch(error => res.status(400).send(`Cannot get contact: ${error}`));
// })
//
// // View all contacts
// app.get('/contacts', (req, res) => {
//   firebaseHelper.firestore
//     .backup(db, contactsCollection)
//     .then(data => res.status(200).send(data))
//     .catch(error => res.status(400).send(`Cannot get contacts: ${error}`));
// })
//
// // Delete a contact
// app.delete('/contacts/:contactId', async (req, res) => {
//   const deletedContact = await firebaseHelper.firestore
//     .deleteDocument(db, contactsCollection, req.params.contactId);
//   res.status(204).send(`Contact is deleted: ${deletedContact}`);
// })
//
// export { app };
