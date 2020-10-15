import React, { useRef, useState, useEffect } from 'react'
import { Prediction, SearchResult, useFirebase } from '../assets/'
import '../styles/Upload.scss'
import { useDebouncedInput } from '../assets/hooks'

const INITIAL_INPUT = {
    place: '',
    location: '',
}

export const Upload: React.FC = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState(INITIAL_INPUT)
    const [searchResults, setSearchResults] = useState<Prediction[]>([])
    const firebase = useFirebase()

    const debouncedInput = useDebouncedInput(input.location, 500)

    useEffect(() => {
        if (debouncedInput) {
            firebase.doSearchForPlace(debouncedInput).then(res => {
                if (res.status === 'OK') {
                    setSearchResults(res.predictions)
                }
            })
        } else {
            setSearchResults([])
        }
    }, [debouncedInput])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const inputIsValid = () => input.location !== '' && input.place !== ''

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (inputIsValid() && fileRef.current != null && fileRef.current.files) {
            Array.from(fileRef.current.files).forEach(file => firebase.doUploadImage(file, input.place, input.location))
            fileRef.current.files = null
            fileRef.current.value = ''
            setInput(INITIAL_INPUT)
        }
    }

    return (
        <div className="upload-wrapper">
            <form>
                <div>
                    <label htmlFor="">Restaurang</label>
                    <input
                        type="text"
                        required
                        placeholder="Var åt du?"
                        name="place"
                        value={input.place}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Plats</label>
                    <input
                        type="text"
                        required
                        placeholder="Hur hittar jag dit?"
                        name="location"
                        onChange={handleInputChange}
                        value={input.location}
                    />
                    <ul>
                        {searchResults.map(s => (
                            <li key={s.place_id}>{s.description}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label htmlFor="" />
                    <input ref={fileRef} type="file" multiple />
                </div>
                <button onClick={handleSubmit}>Skicka</button>
            </form>
            <button onClick={firebase.doSignOut}>Logga ut</button>
        </div>
    )
}
