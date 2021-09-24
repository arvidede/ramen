import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import '../styles/Gallery.scss'
import { usePhotos } from '../utils/'
import { Photo } from '../utils/types'
import { FullScreen } from './FullScreen'
import { Img } from './Image'
import { Spinner } from './Spinner'

interface GalleryProps {
    photos: Photo[]
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
                location={photo?.location}
                place={photo?.place}
            />
        </>
    )
}

const GalleryWrapper: React.FC = () => {
    const [isLoading, photos] = usePhotos()
    return isLoading ? <Spinner /> : <Gallery photos={photos} />
}

export default GalleryWrapper
