import { useSavedShows } from 'lib/spotify-queries'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { ShowCard } from 'components/ShowCard'
import { BasePage } from './BasePage'

import styles from './SavedShows.module.css'

export const SavedShows = () => {
  const shows = useSavedShows()

  if (shows.data) {
    return (
      <BasePage heading="Following">
        <InfiniteScroll
          className={styles.grid}
          hasMore={shows.hasNextPage}
          isLoading={shows.isFetchingNextPage}
          onLoadMore={shows.fetchNextPage}
        >
          {shows.data.map(({ show }, index) => (
            <article
              key={show.id}
              aria-posinset={++index}
              aria-setsize={shows.totalElements}
            >
              <ShowCard show={show} />
            </article>
          ))}
        </InfiniteScroll>
      </BasePage>
    )
  }

  if (shows.error) console.error('query error', shows.error)

  return 'loading...' // TODO: implement loading state
}
