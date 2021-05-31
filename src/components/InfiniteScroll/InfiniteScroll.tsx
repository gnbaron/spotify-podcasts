import { ReactNode, useState } from 'react'
import { useIntersectionObserver } from 'hooks/use-intersection-observer'

type Props = {
  children: ReactNode
  className?: string
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore: () => void
}

export const InfiniteScroll = (props: Props) => {
  const { children, className, hasMore, isLoading, onLoadMore } = props
  const [loadMoreRef, setLoadMoreRef] = useState<HTMLSpanElement | null>(null)

  useIntersectionObserver(loadMoreRef, { onIntersect: onLoadMore })

  return (
    <section className={className} role="feed" aria-busy={isLoading}>
      {children}
      {hasMore && !isLoading && <span ref={setLoadMoreRef}>load more</span>}
    </section>
  )
}
