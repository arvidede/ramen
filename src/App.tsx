import React, { useState } from 'react'
import { FullScreen } from './components'
import './styles/App.scss'

interface Photo {
    title: string
    path: string
    key: number
}

const photos: Photo[] = [
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
    { title: 'Yum', path: require('./img/ramen.jpg'), key: Math.random() },
]

function App() {
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
        setSelectedPhoto(selectedPhoto + ((direction ? -1 : 1) % photos.length))
    }

    return (
        <div className="App">
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
        </div>
    )
}

export default App
