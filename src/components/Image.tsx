import React, { useState, useEffect } from 'react'
import { PhotoType } from '../assets/constants'
import clsx from 'clsx'
import '../styles/Image.scss'

interface ImgProps {
    src: string
    className: string
}

export const Img: React.FC<ImgProps> = ({ src, className }) => {
    const [loadedSrc, setLoadedSrc] = useState('')

    useEffect(() => {
        const image = new Image()
        image.onload = () => {
            setLoadedSrc(src)
        }
        image.src = src
    }, [src])

    const name = clsx(className, 'img', loadedSrc !== '' && 'loaded')

    return loadedSrc === '' ? <img className={name} /> : <img src={loadedSrc} alt="" className={name} />
}
