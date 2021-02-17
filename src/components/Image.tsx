import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import '../styles/Image.scss'
import { PhotoType } from '../assets/constants'
import { isMobile } from '../assets/helpers'

interface ImgProps {
    photo: PhotoType
    className: string
    onClick: () => void
}

export const Img: React.FC<ImgProps> = ({ photo, className, onClick }) => {
    const [loadedSrc, setLoadedSrc] = useState('')
    const imageRef = useRef<HTMLImageElement>(null)
    const [mobileTouchDetected, setMobileTouchDetected] = useState(false)

    useEffect(() => {
        const image = new Image()
        image.onload = () => {
            setLoadedSrc(photo.src)
        }
        image.src = photo.src
    }, [photo.src])

    useEffect(() => {
        if (isMobile()) {
            const handleTouchStart = () => setMobileTouchDetected(true)
            const handleTouchEnd = () => setMobileTouchDetected(false)
            const image = imageRef.current
            image?.addEventListener('touchend', handleTouchEnd)
            image?.addEventListener('touchmove', handleTouchStart)
            return () => {
                // image?.removeEventListener('touchstart', handleTouchStart)
                image?.removeEventListener('touchend', handleTouchEnd)
                image?.removeEventListener('touchmove', handleTouchStart)
            }
        }
    }, [])

    const name = clsx(className, 'img', loadedSrc !== '' && 'loaded')

    return (
        <div
            className={clsx('photo', mobileTouchDetected && 'mobile-focus')}
            onClick={onClick}
            ref={imageRef}
        >
            {loadedSrc === '' ? (
                <img className={name} alt="" />
            ) : (
                <img src={loadedSrc} alt="" className={name} />
            )}
            <h2>{photo.place}</h2>
        </div>
    )
}
