import { ReactNode, useRef } from 'react'
import { PaginationState } from 'types/common'
import { useIntersectionObserver } from 'hooks/use-intersection-observer'

type Props = {
  children: ReactNode
  className?: string
} & PaginationState

export const InfiniteScroll = (props: Props) => {
  const { children, className, hasMore, isLoading, onLoadMore } = props

  const bottomRef = useRef(null)

  useIntersectionObserver(bottomRef, {
    onIntersect: onLoadMore,
    threshold: 0,
  })

  return (
    <section className={className} role="feed" aria-busy={isLoading}>
      {children}
      {hasMore && !isLoading && <span ref={bottomRef} />}
    </section>
  )
}
