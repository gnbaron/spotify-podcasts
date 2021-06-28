import { useSearchShows } from 'queries/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { Spinner } from 'components/Loading'
import { ShowGrid } from 'components/ShowGrid'

import styles from './ShowResults.module.css'

type Props = {
  query: string
}

export const ShowResults = ({ query }: Props) => {
  const shows = useSearchShows(query)

  if (shows.data) {
    if (shows.data.length === 0) {
      return <EmptyState size="s" title="Oh snap! No results found." />
    }

    return (
      <div className={styles.shows}>
        <ShowGrid
          shows={shows.data}
          hasMore={shows.hasNextPage}
          isLoading={shows.isFetchingNextPage}
          onLoadMore={shows.fetchNextPage}
          totalShows={shows.totalElements}
        />
      </div>
    )
  }

  if (shows.isLoading) return <Spinner className={styles.spinner} />

  if (shows.isError) throw shows.error

  return null
}
