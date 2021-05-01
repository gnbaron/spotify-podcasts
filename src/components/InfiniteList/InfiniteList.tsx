import { useIntersectionObserver } from 'hooks/use-intersection-observer'
import { ReactNode, useRef } from 'react'
import { Button } from 'components/Button'

import styles from './InfiniteList.module.css'

type Props = {
  children: ReactNode
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore: () => void
}

export const InfiniteList = (props: Props) => {
  const { children, hasMore, isLoading, onLoadMore } = props

  const loadMoreRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  useIntersectionObserver(loadMoreRef, {
    onIntersect: onLoadMore,
    threshold: 1,
  })

  return (
    <>
      {children}
      {hasMore && (
        <Button
          className={styles.button}
          disabled={isLoading}
          onClick={onLoadMore}
          quiet
          ref={loadMoreRef}
        >
          Show more
        </Button>
      )}
    </>
  )
}
