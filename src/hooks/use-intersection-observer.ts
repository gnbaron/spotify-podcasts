import { useEffect, useState, RefObject } from 'react'

interface Args extends IntersectionObserverInit {
  onIntersect?: () => void
}

export function useIntersectionObserver(
  target: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%', onIntersect }: Args = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)

    if (entry.isIntersecting && onIntersect) {
      onIntersect()
    }
  }

  useEffect(() => {
    const node = target?.current
    const hasSupport = !!window.IntersectionObserver

    if (!hasSupport || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, threshold, root, rootMargin])

  return entry
}
