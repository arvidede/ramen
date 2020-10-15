import React, { useEffect, useState } from 'react'
import { useFirebase } from '../assets/'
import { Upload, Login } from './'

export const Admin: React.FC = () => {
    const [authUser, setAuthUser] = useState<null | string>(null)
    const firebase = useFirebase()

    useEffect(() => {
        let user = localStorage.getItem('authUser')
        user = user ? JSON.parse(user) : null
        setAuthUser(user)

        const listener = firebase.onAuthStateChanged(
            (authUser: any) => {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setAuthUser(authUser)
            },
            () => {
                localStorage.removeItem('authUser')
                setAuthUser(null)
            },
        )

        return listener
    }, [firebase])
    return <>{authUser ? <Upload /> : <Login />}</>
}
