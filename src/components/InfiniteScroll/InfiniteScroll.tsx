import { useState } from 'react'
import { useIntersectionObserver } from 'hooks/use-intersection-observer'
import { LoadingSpinner } from 'components/Loading'

import styles from './InfiniteScroll.module.css'

type Props = {
  children: React.ReactNode
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
    <section className={styles.wrapper}>
      <div className={className} role="feed" aria-busy={isLoading}>
        {children}
      </div>
      <footer className={styles.footer}>
        {hasMore && !isLoading && <span ref={setLoadMoreRef} />}
        {isLoading && <LoadingSpinner className={styles.spinner} />}
      </footer>
    </section>
  )
}
