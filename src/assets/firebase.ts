import React, { useContext } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const prodConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

const devConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

interface FirebaseType {
    db: any
    auth: any
    doLogin: () => void
    doUploadImage: () => void
    doDeleteImage: () => void
}

export class Firebase {
    db: any
    auth: any
    constructor() {
        firebase.initializeApp(config)
        this.db = firebase.firestore()
        this.auth = firebase.auth()
    }

    doLogin = () => {
        console.log('Logging in')
    }

    doUploadImage = () => {
        console.log('Uploading image')
    }

    doDeleteImage = () => {
        console.log('Deleting image')
    }
}

export const FirebaseContext = React.createContext({} as Firebase)

export const useFirebase = () => useContext(FirebaseContext)
