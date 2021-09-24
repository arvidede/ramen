import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/Image.scss'
import { isMobile } from '../utils/helpers'
import { useIntersectionObserver } from '../utils/hooks'
import { Photo } from '../utils/types'
import { Spinner } from './Spinner'

interface ImgProps {
    photo: Photo
    className: string
    onClick: () => void
}

export const Img: React.FC<ImgProps> = ({ photo, className, onClick }) => {
    const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined)
    const imageRef = useRef<HTMLImageElement>(null)
    const [mobileTouchDetected, setMobileTouchDetected] = useState(false)

    const handleIntersection = useCallback(() => {
        const img = new Image()
        img.onload = () => {
            setLoadedSrc(photo.src)
        }
        img.src = photo.src
    }, [photo.src])

    useIntersectionObserver(imageRef, handleIntersection)

    useEffect(() => {
        if (isMobile()) {
            const handleTouchStart = () => setMobileTouchDetected(true)
            const handleTouchEnd = () => setMobileTouchDetected(false)
            const image = imageRef.current
            image?.parentElement?.addEventListener('touchend', handleTouchEnd)
            image?.parentElement?.addEventListener('touchmove', handleTouchStart)
            return () => {
                // image?.removeEventListener('touchstart', handleTouchStart)
                image?.removeEventListener('touchend', handleTouchEnd)
                image?.removeEventListener('touchmove', handleTouchStart)
            }
        }
    }, [])

    return (
        <div className={clsx('photo', mobileTouchDetected && 'mobile-focus')} onClick={onClick}>
            {!loadedSrc && <Spinner spin={false} />}
            <img
                ref={imageRef}
                src={loadedSrc}
                alt=""
                className={clsx(className, 'image', !!loadedSrc && 'loaded')}
            />
            <h2>{photo.place}</h2>
        </div>
    )
}
