import * as functions from 'firebase-functions';
import * as express from 'express';

// Env vars

const config = functions.config();
// Porting envs from firebase config
for (const key in config.envs){
  process.env[key.toUpperCase()] = config.envs[key];
}

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

const main = express();

main.use('/api/v1', require('./spotify.ts'));

exports.webApi = functions.https.onRequest(main);
