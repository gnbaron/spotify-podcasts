import { NextSeo } from 'next-seo'
import { useSavedShows } from 'lib/spotify-queries'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { ShowCard } from 'components/ShowCard'
import { EmptyState } from 'components/EmptyState'
import { BasePage } from './BasePage'

import styles from './SavedShows.module.css'

export const SavedShows = () => {
  const shows = useSavedShows()

  if (!shows.data) return null

  const isEmpty = shows.data.length === 0

  return (
    <BasePage heading="Following">
      <NextSeo
        title="Spotify Podcasts · Following"
        description="List of following shows."
      />
      {isEmpty ? (
        <EmptyState subtitle="It looks like you don't follow any show yet." />
      ) : (
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
      )}
    </BasePage>
  )
}
