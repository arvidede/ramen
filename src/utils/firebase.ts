import { initializeApp } from 'firebase/app'
import {
    Auth,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { Firestore, getFirestore, setDoc, doc, getDocs, collection } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { GOOGLE_MAPS_BASE_URL, GOOGLE_PLACES_BASE_URL } from './constants'
import { SearchResult } from './types'

enum ResponseStatus {
    Ok = 'ok',
    Error = 'error',
}

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
export class Firebase {
    db: Firestore
    auth: Auth
    storage: FirebaseStorage
    constructor() {
        if (process.env.NODE_ENV === 'development') {
            console.log('Initializing firebase in dev environment')
            console.log(process.env.REACT_APP_AUTH_DOMAIN)
        }
        const firebaseApp = initializeApp(config)
        this.db = getFirestore(firebaseApp)
        this.auth = getAuth(firebaseApp)
        this.storage = getStorage(firebaseApp)
    }

    ref = () => ref(this.storage)

    doUploadImage = async (
        file: File,
        place: string,
        placeId: string,
    ): Promise<{ status: ResponseStatus.Ok } | { status: ResponseStatus.Error; error: string }> => {
        if (file.name.includes('.heic'))
            return {
                status: ResponseStatus.Error,
                error: 'The provided file was in the wrong format. Please use .jpg, .jpeg or .png.',
            }

        const fileRef = ref(this.storage, `images/${file.name}`)

        const snapshot = await uploadBytes(fileRef, file)
        const imageURL = await getDownloadURL(snapshot.ref)

        const response = await setDoc(doc(this.db, 'images'), {
            src: imageURL,
            place,
            location: placeId ? `${GOOGLE_MAPS_BASE_URL}${placeId}` : null,
        })
            .then(
                () =>
                    ({
                        status: ResponseStatus.Ok,
                    } as const),
            )
            .catch((error: string) => ({ status: ResponseStatus.Error, error }))

        return response
    }

    doSearchForPlace = (input: string): Promise<SearchResult> =>
        fetch(`${GOOGLE_PLACES_BASE_URL}${input}`)
            .then(res => res.json())
            .catch(console.error)

    doDeleteImage = () => {
        console.log('Deleting image')
    }

    doGetImages = () => getDocs(collection(this.db, 'images'))

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        createUserWithEmailAndPassword(this.auth, email, password)

    doSignInWithEmailAndPassword = (email: string, password: string) =>
        signInWithEmailAndPassword(this.auth, email, password)

    doSignOut = () => this.auth.signOut()

    onAuthStateChanged = (next: (user: User) => void, fallback: () => void) => {
        return this.auth.onAuthStateChanged(user => {
            if (user) {
                next(user)
            } else {
                fallback()
            }
        })
    }
}

export default Firebase
