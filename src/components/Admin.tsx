import React, { useEffect, useState } from 'react'
import { useFirebase } from '../utils'
import { Login } from './Login'
import { Upload } from './Upload'
import type { User } from 'firebase/auth'

export const Admin: React.FC = () => {
    const [authUser, setAuthUser] = useState<null | User>(null)
    const firebase = useFirebase()

    useEffect(() => {
        const userString = localStorage.getItem('authUser')
        const user = userString ? JSON.parse(userString) : null
        setAuthUser(user)

        const listener = firebase.onAuthStateChanged(
            authUser => {
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
