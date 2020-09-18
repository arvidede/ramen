import React from 'react'

import app from 'firebase/app'
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

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.db = app.firestore()
        this.auth = app.auth()
        const settings = { timestampsInSnapshots: true }
        this.db.settings(settings)
    }
}

const FirebaseContext = React.createContext(null)

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>{firebase => <Component {...props} firebase={firebase} />}</FirebaseContext.Consumer>
)

export const useFirebase = () => useContext(FirebaseContext)

export default FirebaseContext
