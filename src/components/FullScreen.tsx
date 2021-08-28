import React, { useState, useEffect, useCallback } from 'react'
import { Close, Next, Previous } from '../assets/'
import '../styles/Fullscreen.scss'
import clsx from 'clsx'

const TRANSITION_TIMEOUT = 300

interface FullScreenProps {
    src: string
    show: boolean
    onClose: () => void
    onChange: (direction: boolean) => void
    location: string
    place: string
}

export const FullScreen: React.FC<FullScreenProps> = ({
    src,
    show,
    onClose,
    onChange,
    location,
    place,
}) => {
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

    const handleClose = useCallback(() => {
        setIsLeaving(true)
        setTimeout(() => {
            onClose()
            setIsLeaving(false)
        }, TRANSITION_TIMEOUT)
    }, [onClose])

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
    }, [onChange, handleClose])

    const className = clsx({
        fullscreen: true,
        enter: isEntering,
        show: show,
        leave: show && isLeaving,
        hide: !show,
    })

    return (
        <div className={className}>
            {src && <img src={src} alt="" loading="lazy" />}
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
            <div className="bottom-info">
                <a href={location}>{place}</a>
            </div>
        </div>
    )
}
