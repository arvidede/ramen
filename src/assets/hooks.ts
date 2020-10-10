import { useEffect, useState } from 'react'
import { PhotoType } from './constants'
import { useFirebase } from './firebase'

export const usePhotos = (): [boolean, PhotoType[]] => {
    const [isLoading, setIsLoading] = useState(true)
    const [photos, setPhotos] = useState<PhotoType[]>([])

    const firebase = useFirebase()
    useEffect(() => {
        firebase.doGetImages().then((querySnapshot: any) => {
            const data: PhotoType[] = querySnapshot.docs.map((doc: any) => doc.data())
            setIsLoading(false)
            setPhotos(data)
        })
    }, [])
    console.log(photos)
    return [isLoading, photos]
}
