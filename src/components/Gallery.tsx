import React, { useState, useEffect } from 'react'
import { FullScreen } from './'
import { Img } from './Image'
import { Spinner, usePhotos } from '../assets/'
import '../styles/Gallery.scss'
import { PhotoType } from '../assets/constants'
import clsx from 'clsx'

interface GalleryProps {
    photos: PhotoType[]
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<number>(-1)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHasMounted(true)
        }, 100)
    }, [])

    const handleClick = (photo: number) => {
        setSelectedPhoto(selectedPhoto === photo ? -1 : photo)
        setIsFullScreen(selectedPhoto !== photo)
    }

    const photo = photos[selectedPhoto]

    const handleClose = () => {
        setSelectedPhoto(-1)
        setIsFullScreen(false)
    }

    const handleChangePhoto = (direction: boolean) => {
        const next = (selectedPhoto + (direction ? -1 : 1)) % photos.length
        setSelectedPhoto(next >= 0 ? next : photos.length - 1)
    }

    return (
        <>
            <div className={clsx('gallery-wrapper', hasMounted && 'mounted')}>
                <header>
                    <h1>Ramen</h1>
                </header>
                <section className="gallery">
                    {photos.map((photo, index) => (
                        <Img
                            key={index}
                            onClick={() => handleClick(index)}
                            className={selectedPhoto === index ? 'selected' : ''}
                            photo={photo}
                        />
                    ))}
                </section>
                <footer>
                    <p>
                        Powered with{' '}
                        <span role="img" aria-label="">
                            💜
                        </span>{' '}
                        by <a href="https://edenheim.se">Arvid</a>
                    </p>
                </footer>
            </div>
            <FullScreen
                onClose={handleClose}
                onChange={handleChangePhoto}
                show={isFullScreen}
                src={photo ? photo.src : ''}
            />
        </>
    )
}

const GalleryWrapper: React.FC = () => {
    const [isLoading, photos] = usePhotos()
    return isLoading ? <Spinner /> : <Gallery photos={photos} />
}

export default GalleryWrapper
