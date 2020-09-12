# personal-site

[![Build Status](https://travis-ci.com/CoolONEOfficial/personal_site.svg?branch=master)](https://travis-ci.com/CoolONEOfficial/personal_site)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/40d93637-d285-43c6-8d70-66f286d9f791/deploy-status)](https://app.netlify.com/sites/eloquent-ardinghelli-9e59ff/deploys)

Personal site portfolio

### Features

* Fully static on prod (SSR on dev)
* PWA (Progressive Web App) support
* Serverless (Cloud Functions with api on express.js for spotify music integration)
* i18n Localization (using nuxt-i18n with loader)
* Typescript support (all pages&components written on ts)
* Dark/Light theme support
* SEO friendly (JSON-LD, Open graph etc)
* Spotify integration to stream playable music (with Cloud Functions api on express.js)
* RSS2 integration
* Integrated with admin [mobile app](https://github.com/CoolONEOfficial/personal_site_app) on flutter for content management

## 👶 Start

### Install dependencies

``` bash
$ yarn install
```

### Launch development server

```bash
$ yarn dev
```

Open [http://localhost:3000]()


## 🚀 Build and Deploy to Firebase

### Generate static site

Generate Nuxt.js static site.

```bash
$ yarn generate
```

Start it!

```bash
$ yarn start:src
```

### Firebase Project Setup

Create a Firebase Project using the [Firebase Console](https://console.firebase.google.com/).

Install Firebase CLI.

```bash
$ npm install -g firebase-tools
$ exec $SHELL -l
```

Login to Firebase.

```bash
$ firebase login
```

Edit `.firebaserc`

```json
{
  "projects": {
    "default": "<your-firebase-project-id>"
  }
}
```

### Emulate Firebase on local

```bash
$ yarn serve
```

Open [http://localhost:5000]()

### 🎉 Deploy

```bash
$ yarn deploy
```
