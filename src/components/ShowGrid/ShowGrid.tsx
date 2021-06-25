import { InfiniteScroll } from 'components/InfiniteScroll'
import { ShowCard } from './ShowCard'

import styles from './ShowGrid.module.css'

type Props = {
  shows: SpotifyApi.ShowObjectSimplified[]
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
  totalShows?: number
}

export const ShowGrid = (props: Props) => {
  const { shows, hasMore, isLoading, onLoadMore, totalShows = 0 } = props
  return (
    <InfiniteScroll
      className={styles.grid}
      hasMore={hasMore}
      isLoading={isLoading}
      onLoadMore={onLoadMore}
    >
      {shows.map((show, index) => (
        <article
          key={show.id}
          aria-posinset={++index}
          aria-setsize={totalShows}
        >
          <ShowCard show={show} />
        </article>
      ))}
    </InfiniteScroll>
  )
}
