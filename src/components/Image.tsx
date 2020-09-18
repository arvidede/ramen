import React, { useState } from 'react'
import { Spinner } from '../assets'

type ImageProps = {
    src: string
    className: string
}

export const Image: React.FC<ImageProps> = ({ src, className }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <>
            <img src={src} alt="" className={className} onLoad={() => setImageLoaded(true)} />
            {!imageLoaded && <Spinner />}
        </>
    )
}
