import { useEffect, useState } from 'react'
import { Photo } from '../types'
import { useFirebase } from './useFirebase'

export const usePhotos = () => {
    const [loading, setIsLoading] = useState(true)
    const [photos, setPhotos] = useState<Photo[]>([])

    const firebase = useFirebase()
    useEffect(() => {
        firebase.doGetImages().then((querySnapshot: any) => {
            const data: Photo[] = querySnapshot.docs.map((doc: any) => ({
                ...doc.data(),
                id: Math.random().toString(),
            }))
            setIsLoading(false)
            setPhotos(data)
        })
    }, [firebase])
    return [loading, photos] as const
}
