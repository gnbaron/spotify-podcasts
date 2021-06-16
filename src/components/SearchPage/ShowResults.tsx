import { useSearch } from 'lib/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { LoadingSpinner } from 'components/Loading'
import { ShowCard } from 'components/ShowCard'

import styles from './ShowResults.module.css'

type Props = {
  query: string
}

export const ShowResults = ({ query }: Props) => {
  const results = useSearch(query, 'show')

  if (results.data) {
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
      <InfiniteScroll
        className={styles.grid}
        hasMore={results.hasNextPage}
        isLoading={results.isFetchingNextPage}
        onLoadMore={results.fetchNextPage}
      >
        {shows.map((show, index) => (
          <article
            key={show.id}
            aria-posinset={++index}
            aria-setsize={results.data.pages[0].shows.total}
          >
            <ShowCard show={show} />
          </article>
        ))}
      </InfiniteScroll>
    )
  }

  if (results.isLoading) return <LoadingSpinner className={styles.spinner} />

  if (results.isError) throw results.error

  if (results.isIdle) return null

  throw new Error('Unexpected error')
}
