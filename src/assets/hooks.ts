import { RefObject, useCallback, useEffect, useMemo, useState } from 'react'
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

const DEFAULT_OPTIONS = {
    rootMargin: '100px',
    threshold: 0.1,
}

export const useIntersectionObserver = (
    target: RefObject<Element>,
    next: () => void,
    observerOptions: IntersectionObserverInit = DEFAULT_OPTIONS,
) => {
    const handleObserverUpdate: IntersectionObserverCallback = useCallback(
        (entries, observer) => {
            entries.forEach(entry => {
                if (target.current && entry.target === target.current && entry.isIntersecting) {
                    observer.unobserve(target.current)
                    next()
                }
            })
        },
        [next, target],
    )

    const observer = useMemo(
        () => new IntersectionObserver(handleObserverUpdate, observerOptions),
        [handleObserverUpdate],
    )

    useEffect(() => {
        return () => {
            observer.disconnect()
        }
    }, [observer])

    useEffect(() => {
        if (observer && target.current) {
            const el = target.current
            observer.observe(el)
            return () => observer.unobserve(el)
        }
    }, [observer, target])

    return observer
}
