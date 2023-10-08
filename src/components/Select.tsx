import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Select.module.scss'

interface SelectProps {
    options: Option[]
    onSelect: (option: Option) => void
    isLoading?: boolean
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    noOptionsPlaceholder?: string
    inputPlaceholder?: string
    loadingPlaceholder?: string | JSX.Element
}

export interface Option {
    label: string
    id: string
    misc?: string
}

export const Select: React.FC<SelectProps> = ({
    options = [],
    onSelect,
    onChange,
    name,
    value,
    isLoading = false,
    inputPlaceholder = 'Select',
    noOptionsPlaceholder = 'No results',
    loadingPlaceholder = 'Loading...',
}) => {
    const [inputValue, setInputValue] = useState('')
    const [showOptions, setShowOptions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange === undefined ? setInputValue(e.target.value) : onChange(e)
        if (!showOptions) setShowOptions(true)
    }

    const handleBlur = () => {
        setShowOptions(false)
    }

    useEffect(() => {
        const handleEscapePressed = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                inputRef.current?.blur()
                setShowOptions(false)
            }
        }
        document.addEventListener('keydown', handleEscapePressed)
        return () => {
            document.removeEventListener('keydown', handleEscapePressed)
        }
    }, [])

    return (
        <div className={styles.select}>
            <input
                ref={inputRef}
                name={name}
                type="text"
                value={value === undefined ? inputValue : value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={inputPlaceholder}
            />
            {showOptions && (
                <div className={styles.options}>
                    <ul>
                        {isLoading ? (
                            <li className={styles.loading}>{loadingPlaceholder}</li>
                        ) : options.length > 0 ? (
                            options.map(option => (
                                <li key={option.id} onMouseDown={() => onSelect(option)}>
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className={styles.noOptions}>{noOptionsPlaceholder}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
