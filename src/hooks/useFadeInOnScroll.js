import { useState, useEffect, useRef } from 'react'

export const useFadeInOnScroll = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // If already viewed, show immediately
    if (hasBeenVisible) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setHasBeenVisible(true)
            // Optionally disconnect after first view
            if (options.once !== false) {
              observer.unobserve(element)
            }
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasBeenVisible, options.threshold, options.rootMargin, options.once])

  return [elementRef, isVisible]
}


