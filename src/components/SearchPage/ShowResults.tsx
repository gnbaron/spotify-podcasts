import { useSearch } from 'lib/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { LoadingSpinner } from 'components/Loading'
import { ShowGrid } from 'components/ShowGrid'

import styles from './ShowResults.module.css'

type Props = {
  query: string
}

export const ShowResults = ({ query }: Props) => {
  const results = useSearch(query, 'show')

  if (results.data) {
    // TODO: refactor
    const shows = results.data.pages
      .reduce<SpotifyApi.ShowObjectSimplified[]>(
        (shows, resultPage) => [...shows, ...resultPage.shows.items],
        []
      )
      .filter(Boolean)

    if (shows.length === 0) {
      return <EmptyState size="s" title="Oh snap! No results found." />
    }

    return (
      <div className={styles.shows}>
        <ShowGrid
          shows={shows}
          hasMore={results.hasNextPage}
          isLoading={results.isFetchingNextPage}
          onLoadMore={results.fetchNextPage}
          totalShows={results.data.pages[0].shows.total}
        />
      </div>
    )
  }

  if (results.isLoading) return <LoadingSpinner className={styles.spinner} />

  if (results.isError) throw results.error

  if (results.isIdle) return null

  throw new Error('Unexpected error')
}
