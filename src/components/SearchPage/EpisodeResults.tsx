import { useSearch } from 'lib/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { LoadingSpinner } from 'components/Loading'

import styles from './EpisodeResults.module.css'

type Props = {
  query: string
}

export const EpisodeResults = ({ query }: Props) => {
  const results = useSearch(query, 'episode')

  if (results.data) {
    const episodes = results.data.pages
      .reduce<SpotifyApi.EpisodeObjectSimplified[]>(
        (episodes, resultPage) => [...episodes, ...resultPage.episodes.items],
        []
      )
      .filter(Boolean)

    if (episodes.length === 0) {
      return <EmptyState size="s" title="Oh snap! No results found." />
    }

    return (
      <InfiniteScroll
        className={styles.episodeList}
        hasMore={results.hasNextPage}
        isLoading={results.isFetchingNextPage}
        onLoadMore={results.fetchNextPage}
      >
        {episodes.map((episode, index) => (
          <article
            key={episode.id}
            aria-posinset={++index}
            aria-setsize={results.data.pages[0].episodes.total}
          >
            <Episode episode={episode} />
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
