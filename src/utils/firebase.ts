import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { GOOGLE_MAPS_BASE_URL, GOOGLE_PLACES_BASE_URL } from './constants'
import { SearchResult } from './types'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

export class Firebase {
    db: any
    auth: any
    storage: any
    constructor() {
        if (process.env.NODE_ENV === 'development') {
            console.log('Initializing firebase in dev environment')
            console.log(process.env.REACT_APP_AUTH_DOMAIN)
        }
        firebase.initializeApp(config)
        this.db = firebase.firestore()
        this.auth = firebase.auth()
        this.storage = firebase.storage()
    }

    doUploadImage = async (file: File, place: string, placeId: string) => {
        const fileRef = this.storage.ref()

        if (file.name.includes('.heic'))
            return {
                status: 'error',
                error: 'The provided file was in the wrong format. Please use .jpg, .jpeg or .png.',
            }

        return fileRef
            .child(`images/${file.name}`)
            .put(file)
            .then((snapshot: any) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((imageURL: string) => {
                        this.db.collection('images').add({
                            src: imageURL,
                            place,
                            location: placeId ? `${GOOGLE_MAPS_BASE_URL}${placeId}` : null,
                        })
                    })
                    .then(() => ({
                        status: 'ok',
                    }))
                    .catch((error: string) => ({ status: 'error', error }))
            })
    }

    doSearchForPlace = (input: string): Promise<SearchResult> =>
        fetch(`${GOOGLE_PLACES_BASE_URL}${input}`)
            .then(res => res.json())
            .catch(console.error)

    doDeleteImage = () => {
        console.log('Deleting image')
    }

    doGetImages = () => this.db.collection('images').get()

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email: string, password: string) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification()

    doSignOut = () => this.auth.signOut()

    doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = (password: string) => this.auth.currentUser.updatePassword(password)

    onAuthStateChanged = (next: (user: any) => void, fallback: () => void) => {
        return this.auth.onAuthStateChanged((user: any) => {
            if (user) {
                next(user)
            } else {
                fallback()
            }
        })
    }

    user = (uid: string) => this.db.ref(`users/${uid}`)
}

export default Firebase
