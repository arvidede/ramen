import React, { useState, useEffect } from 'react'
import './styles/App.scss'

const TRANSITION_TIMEOUT = 300

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

interface FullScreenProps {
    url: string
    show: boolean
    onClose: () => void
    onChange: (direction: boolean) => void
}

const FullScreen: React.FC<FullScreenProps> = ({ url, show, onClose, onChange }) => {
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
        return document.removeEventListener('keydown', handleKeyPress)
    }, [onChange])

    const className =
        'fullscreen' + (isEntering ? ' show enter' : '') + (show ? ' show' : isLeaving ? ' show leave' : ' hide')

    return (
        <div className={className}>
            <img src={url} alt="" className={className} />
            <div className="fullscreen-bg" onClick={handleClose} />
        </div>
    )
}

export default App
