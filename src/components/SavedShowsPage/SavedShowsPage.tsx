import { NextSeo } from 'next-seo'
import { useSavedShows } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { ShowGrid } from 'components/ShowGrid'

import styles from './SavedShowsPage.module.css'

export const SavedShowsPage = () => {
  const shows = useSavedShows()

  if (!shows.data) return null

  const isEmpty = shows.data.length === 0

  return (
    <BasePage className={styles.savedShows} heading="Shows">
      <NextSeo
        title="Spotify Podcasts · Shows"
        description="List of following shows."
      />
      {isEmpty && !shows.isFetching ? (
        <EmptyState
          title="Oh snap! Nothing to see here."
          subtitle="It looks like you don't follow any show yet."
        />
      ) : (
        <ShowGrid
          shows={shows.data.map(({ show }) => show)}
          hasMore={shows.hasNextPage}
          isLoading={shows.isFetchingNextPage}
          onLoadMore={shows.fetchNextPage}
          totalShows={shows.totalElements}
        />
      )}
    </BasePage>
  )
}
