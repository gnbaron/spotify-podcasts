import { useSearch } from 'lib/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { EpisodeList } from 'components/EpisodeList'
import { LoadingSpinner } from 'components/Loading'

import styles from './EpisodeResults.module.css'

type Props = {
  query: string
}

export const EpisodeResults = ({ query }: Props) => {
  const results = useSearch(query, 'episode')

  if (results.data) {
    // TODO: refactor
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
      <div className={styles.episodeList}>
        <EpisodeList
          episodes={episodes}
          hasMore={results.hasNextPage}
          isLoading={results.isFetchingNextPage}
          onLoadMore={results.fetchNextPage}
          totalEpisodes={results.data.pages[0].episodes.total}
        />
      </div>
    )
  }

  if (results.isLoading) return <LoadingSpinner className={styles.spinner} />

  if (results.isError) throw results.error

  if (results.isIdle) return null

  throw new Error('Unexpected error')
}
