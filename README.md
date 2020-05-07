# personal-site

[![Build Status](https://travis-ci.org/CoolONEOfficial/personal-site.svg?branch=master)](https://travis-ci.org/CoolONEOfficial/personal-site)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Personal site portfolio

### Features

* SSR (Sever Side Rendering)
* PWA (Progressive Web Apps)
* Serverless (Cloud Functions with api on express.js for spotify music integration)
* i18n Localization (using nuxt-i18n with loader)
* Typescript support (all pages&components written on ts)
* Dark/Light theme support
* SEO friendly (JSON-LD, Open graph etc)
* Spotify integration to stream playable music (with Cloud Functions api on express.js)
* RSS2 integration
* Integrated with [mobile app](https://github.com/CoolONEOfficial/personal_site_app) on flutter for content management

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

### Build

Build Nuxt.js app.

```bash
$ yarn build
```

Copy assets and static files.

```bash
$ yarn setup
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
