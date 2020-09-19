import React, { useRef, useEffect } from 'react'
import { useFirebase } from '../assets/'

export const Upload: React.FC = () => {
    const fileRef = useRef<HTMLInputElement>(null)

    const firebase = useFirebase()

    const handleSignOut = () => {
        firebase.doSignOut()
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (fileRef.current != null && fileRef.current.files) {
            const file = fileRef.current.files[0]
            firebase.doUploadImage(file)
        }
    }

    useEffect(() => {
        firebase.doGetImages().then((querySnapshot: any) => {
            console.log(querySnapshot.docs)
        })
    }, [])
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="">Restaurang</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Plats</label>
                    <input type="text" />
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
