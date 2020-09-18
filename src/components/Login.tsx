import React, { useEffect, useState } from 'react'
import { useFirebase } from '../assets/'
import '../styles/Login.scss'

type LoginProps = {}

export const Login: React.FC<LoginProps> = () => {
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const firebase = useFirebase()

    useEffect(() => {}, [])

    const handleLogin = () => {}

    return (
        <div className="login">
            <input
                type="text"
                placeholder="Namn"
                value={nameInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
            />
            <input
                type="password"
                placeholder="Lösenord"
                value={passwordInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
            />
            <button onClick={handleLogin}>Logga In</button>
        </div>
    )
}
