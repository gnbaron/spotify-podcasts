import { ReactNode, useState } from 'react'
import { PaginationState } from 'types/common'
import { useIntersectionObserver } from 'hooks/use-intersection-observer'

type Props = {
  children: ReactNode
  className?: string
} & PaginationState

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
