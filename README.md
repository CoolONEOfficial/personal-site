# personal-site

[![Build Status](https://travis-ci.org/CoolONEOfficial/personal-site.svg?branch=master)](https://travis-ci.org/CoolONEOfficial/personal-site)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Personal site portfolio

### Features

* SPA (Single Page Application)
* SSR (Sever Side Rendering)
* PWA (Progressive Web Apps)
* Serverless (Cloud Functions for Firebase + Firebase Hosting)

## 👶Start

### Install dependencies

``` bash
$ npm install # Or yarn install
$ cd /path/to/nuxt-firebase-pwa/src && npm install
$ cd /path/to/nuxt-firebase-pwa/functions && npm install
```

### Launch development server

```bash
$ cd /path/to/nuxt-firebase-pwa/src
$ yarn dev
```

Open [http://localhost:3000]()


## 🚀Build and Deploy to Firebase

### Build

Build Nuxt.js app.

```bash
$ cd /path/to/nuxt-firebase-pwa/src
$ yarn build
```

Copy assets and static files.

```bash
$ cd /path/to/nuxt-firebase-pwa
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
