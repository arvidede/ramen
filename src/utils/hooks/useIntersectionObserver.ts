import { RefObject, useCallback, useEffect, useMemo } from 'react'

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
        [handleObserverUpdate, observerOptions],
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
