import React, { useState } from 'react'
import { FullScreen } from './'
import { photos } from '../assets/'
import '../styles/Gallery.scss'

export const Gallery: React.FC = () => {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<number>(-1)
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
        <div>
            <header>
                <h1>Ramen</h1>
            </header>
            <section className="gallery">
                {photos.map((photo, index) => (
                    <div className="photo" key={index} onClick={() => handleClick(index)}>
                        <img className={selectedPhoto === index ? 'selected' : ''} src={photo.path} alt="" />
                        <h2>{photo.title}</h2>
                    </div>
                ))}
                <FullScreen
                    onClose={handleClose}
                    onChange={handleChangePhoto}
                    show={isFullScreen}
                    url={photo ? photo.path : ''}
                />
            </section>
            <footer>
                <p>
                    Powered with 💜 by <a href="https://edenheim.se">Arvid</a>
                </p>
            </footer>
        </div>
    )
}
