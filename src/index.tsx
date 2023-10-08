import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Firebase, FirebaseContext } from './utils'

const root = document.getElementById('root')

if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </React.StrictMode>,
    )
}
