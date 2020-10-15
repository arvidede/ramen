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
    }, [firebase])
    return [isLoading, photos]
}

export const useDebouncedInput = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] 
  );
  return debouncedValue;
}
