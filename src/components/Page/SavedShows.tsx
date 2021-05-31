import { useSavedShows } from 'lib/spotify-queries'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { ShowCard } from 'components/ShowCard'
import { BasePage } from './BasePage'

import styles from './SavedShows.module.css'

export const SavedShows = () => {
  const query = useSavedShows()

  if (query.status !== 'success') return null // TODO: handle loading state

  const shows = query.data || []

  return (
    <BasePage heading="Following">
      <InfiniteScroll
        className={styles.grid}
        hasMore={query.hasNextPage}
        isLoading={query.isFetchingNextPage}
        onLoadMore={query.fetchNextPage}
      >
        {shows.map(({ show }, index) => (
          <article
            key={show.id}
            aria-posinset={++index}
            aria-setsize={query.totalElements}
          >
            <ShowCard show={show} />
          </article>
        ))}
      </InfiniteScroll>
    </BasePage>
  )
}
