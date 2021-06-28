import { useSearchEpisodes } from 'queries/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { EpisodeList } from 'components/EpisodeList'
import { Spinner } from 'components/Loading'

import styles from './EpisodeResults.module.css'

type Props = {
  query: string
}

export const EpisodeResults = ({ query }: Props) => {
  const episodes = useSearchEpisodes(query)

  if (episodes.data) {
    if (episodes.data.length === 0) {
      return <EmptyState size="s" title="Oh snap! No results found." />
    }

    return (
      <div className={styles.episodes}>
        <EpisodeList
          episodes={episodes.data}
          hasMore={episodes.hasNextPage}
          isLoading={episodes.isFetchingNextPage}
          onLoadMore={episodes.fetchNextPage}
          totalEpisodes={episodes.totalElements}
        />
      </div>
    )
  }

  if (episodes.isLoading) return <Spinner className={styles.spinner} />

  if (episodes.isError) throw episodes.error

  return null
}
