import { RefObject, useCallback, useEffect, useState } from 'react'
import { PhotoType } from './constants'
import { useFirebase } from './firebase'

export const usePhotos = (): [boolean, PhotoType[]] => {
    const [isLoading, setIsLoading] = useState(true)
    const [photos, setPhotos] = useState<PhotoType[]>([])

    const firebase = useFirebase()
    useEffect(() => {
        firebase.doGetImages().then((querySnapshot: any) => {
            const data: PhotoType[] = querySnapshot.docs.map((doc: any) => ({
                ...doc.data(),
                id: Math.random().toString(),
            }))
            setIsLoading(false)
            setPhotos(data)
        })
    }, [firebase])
    return [isLoading, photos]
}

export const useDebouncedInput = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouncedValue
}

export const useIntersectionObserver = (target: RefObject<Element>, next: () => void) => {
    const [observer, setObserver] = useState<IntersectionObserver>()

    const handleObserverUpdate: IntersectionObserverCallback = useCallback(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && target.current) {
                    observer.unobserve(target.current)
                    next()
                }
            })
        },
        [next, target],
    )

    useEffect(() => {
        if (target.current) {
            const el = target.current
            const observerOptions = {
                rootMargin: '100px',
                threshold: 0.1,
            }

            const observer = new IntersectionObserver(handleObserverUpdate, observerOptions)
            observer.observe(el)

            setObserver(observer)
            return () => {
                observer.disconnect()
            }
        }
    }, [target, handleObserverUpdate])

    return observer
}
