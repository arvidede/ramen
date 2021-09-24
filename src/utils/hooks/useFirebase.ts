import { createContext, useContext } from 'react'
import Firebase from '../firebase'
export const FirebaseContext = createContext({} as Firebase)

export const useFirebase = (): Firebase => useContext(FirebaseContext)
