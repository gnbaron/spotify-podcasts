import { NextSeo } from 'next-seo'
import { useSavedShows } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { ShowCard } from 'components/ShowCard'

import styles from './SavedShowsPage.module.css'

export const SavedShowsPage = () => {
  const shows = useSavedShows()

  if (!shows.data) return null

  const isEmpty = shows.data.length === 0

  return (
    <BasePage heading="Following" isLoading={shows.isFetching}>
      <NextSeo
        title="Spotify Podcasts · Following"
        description="List of following shows."
      />
      {isEmpty && !shows.isFetching ? (
        <EmptyState
          title="Oh snap! Nothing to see here."
          titleAs="h3"
          subtitle="It looks like you don't follow any show yet."
          subtitleAs="h4"
        />
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
