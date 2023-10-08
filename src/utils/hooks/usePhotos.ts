import { useEffect, useState } from 'react'
import { Photo } from '../types'
import { useFirebase } from './useFirebase'

export const usePhotos = () => {
    const [loading, setIsLoading] = useState(true)
    const [photos, setPhotos] = useState<Photo[]>([])

    const firebase = useFirebase()
    useEffect(() => {
        firebase.doGetImages().then(querySnapshot => {
            const data: Photo[] = querySnapshot.docs.map(doc => ({
                ...(doc.data() as Photo),
                id: Math.random().toString(),
            }))
            setIsLoading(false)
            setPhotos(data)
        })
    }, [firebase])
    return [loading, photos] as const
}
