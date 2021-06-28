import { NextSeo } from 'next-seo'
import { useSavedShows } from 'queries/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { ShowGrid } from 'components/ShowGrid'

import styles from './SavedShows.module.css'

export const SavedShows = () => {
  const shows = useSavedShows()

  if (!shows.data) return null

  return (
    <BasePage className={styles.page} heading="Shows">
      <NextSeo
        title="Spotify Podcasts - Shows"
        description="List of saved shows."
      />
      {shows.data.length === 0 && !shows.isFetching ? (
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
