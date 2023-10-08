import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Upload.module.scss'
import { useDebouncedInput, useFirebase } from '../utils/'
import { compressImage } from '../utils/helpers'
import { Option, Select } from './Select'
import { Link } from 'react-router-dom'

const INITIAL_INPUT = {
    place: '',
    location: '',
}

export const Upload: React.FC = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState(INITIAL_INPUT)
    const firebase = useFirebase()
    const debouncedInput = useDebouncedInput(input.location, 250)
    const [searchResults, setSearchResults] = useState<Option[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option>({} as Option)

    const handleSelectOption = (option: Option) => {
        setSelectedOption(option)
        setInput({ place: option.misc || '', location: option.label })
        setIsLoading(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const inputIsValid = () => input.place !== ''

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (inputIsValid() && fileRef.current?.files) {
            setIsSubmitting(true)
            const uploads = await Array.from(fileRef.current.files).map(async file => {
                const compressedImage = await compressImage(file)
                if (compressedImage) {
                    return await firebase.doUploadImage(
                        compressedImage,
                        input.place,
                        selectedOption?.id,
                    )
                }
                return false
            })
            Promise.all(uploads).then(() => {
                if (fileRef.current) {
                    fileRef.current.files = null
                    fileRef.current.value = ''
                }
                setIsSubmitting(false)
                setInput(INITIAL_INPUT)
            })
        }
    }

    useEffect(() => {
        // Prevent search when an option is selected
        if (debouncedInput && input.location !== selectedOption.label) {
            firebase.doSearchForPlace(debouncedInput).then(res => {
                if (res.status === 'OK') {
                    const options = res.predictions.map(p => ({
                        id: p.place_id,
                        label: p.description,
                        misc: p.structured_formatting.main_text,
                    })) as Option[]
                    setSearchResults(options)
                }
                setIsLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput, firebase])

    useEffect(() => {
        if (input.location.length > 0 && !isLoading) setIsLoading(true)
    }, [input.location, isLoading])

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <button onClick={firebase.doSignOut}>Logga ut</button>
                <Link to="/">Tillbaka</Link>
            </div>
            <form>
                <div className={styles.select}>
                    <label htmlFor="">Plats</label>
                    <Select
                        name="location"
                        value={input.location}
                        isLoading={isLoading}
                        options={searchResults}
                        onSelect={handleSelectOption}
                        onChange={handleInputChange}
                        noOptionsPlaceholder="Nope, inget här"
                        loadingPlaceholder="Laddar 🍜"
                        inputPlaceholder="Sök efter nudlarna"
                    />
                </div>
                <div className={styles.formInput}>
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
                <div className={styles.formInput}>
                    <label htmlFor="" />
                    <input ref={fileRef} type="file" multiple />
                </div>
                <button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? '...' : 'Skicka'}
                </button>
            </form>
        </div>
    )
}
