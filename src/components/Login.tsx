import React, { useState } from 'react'
import '../styles/Login.scss'
import { useFirebase } from '../utils/'

export const Login: React.FC = () => {
    const [mailInput, setMailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const firebase = useFirebase()

    const inputIsValid = (): boolean => {
        return mailInput.length > 0 && passwordInput.length > 0
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (inputIsValid()) {
            firebase
                .doSignInWithEmailAndPassword(mailInput, passwordInput)
                .then(console.log)
                .catch(console.error)
        }
    }

    return (
        <form className="login">
            <input
                type="text"
                placeholder="Email"
                value={mailInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMailInput(e.target.value)}
            />
            <input
                type="password"
                placeholder="Lösenord"
                value={passwordInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordInput(e.target.value)
                }
            />
            <button onClick={handleLogin}>Logga In</button>
        </form>
    )
}
