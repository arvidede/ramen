import React, { useRef, useEffect } from 'react'
import { useFirebase } from '../assets/'
import '../styles/Upload.scss'

export const Upload: React.FC = () => {
    const fileRef = useRef<HTMLInputElement>(null)

    const firebase = useFirebase()

    const handleSignOut = () => {
        firebase.doSignOut()
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (fileRef.current != null && fileRef.current.files) {
            Array.from(fileRef.current.files).forEach(file => firebase.doUploadImage(file))
        }
    }

    return (
        <div className="upload-wrapper">
            <form>
                <div>
                    <label htmlFor="">Restaurang</label>
                    <input type="text" placeholder="Var åt du?" />
                </div>
                <div>
                    <label htmlFor="">Plats</label>
                    <input type="text" placeholder="Hur hittar jag dit?" />
                </div>
                <div>
                    <label htmlFor="" />
                    <input ref={fileRef} type="file" />
                </div>
                <button onClick={handleSubmit}>Skicka</button>
            </form>
            <button onClick={handleSignOut}>Logga ut</button>
        </div>
    )
}
