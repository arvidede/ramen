import React, { useState, useEffect } from 'react'
import { Close, Next, Previous } from '../assets/'
import '../styles/Fullscreen.scss'

const TRANSITION_TIMEOUT = 300

interface FullScreenProps {
    src: string
    show: boolean
    onClose: () => void
    onChange: (direction: boolean) => void
}

export const FullScreen: React.FC<FullScreenProps> = ({ src, show, onClose, onChange }) => {
    const [isEntering, setIsEntering] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    useEffect(() => {
        if (show) {
            setIsEntering(true)
            setTimeout(() => {
                setIsEntering(false)
            }, TRANSITION_TIMEOUT)
        }
    }, [show])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            onClose()
            setIsLeaving(false)
        }, TRANSITION_TIMEOUT)
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'Escape':
                    handleClose()
                    break
                case 'ArrowLeft':
                    onChange(true)
                    break
                case 'ArrowRight':
                    onChange(false)
                    break
                default:
                    break
            }
        }
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [onChange])

    const className =
        'fullscreen' +
        (isEntering ? ' enter' : '') +
        (show ? ' show' : isLeaving ? ' show leave' : ' hide')

    return (
        <div className={className}>
            <img src={src} className={className} />
            <div className="fullscreen-bg" onClick={handleClose} />
            <button className="previous" onClick={() => onChange(true)}>
                <Previous />
            </button>
            <button className="close" onClick={handleClose}>
                <Close />
            </button>
            <button className="next" onClick={() => onChange(false)}>
                <Next />
            </button>
        </div>
    )
}
