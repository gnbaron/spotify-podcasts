import { Episode } from './Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'

import styles from './EpisodeList.module.css'

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[]
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
  totalEpisodes?: number
}

export const EpisodeList = (props: Props) => {
  const { episodes, hasMore, isLoading, onLoadMore, totalEpisodes = 0 } = props
  return (
    <InfiniteScroll
      className={styles.episodeList}
      hasMore={hasMore}
      isLoading={isLoading}
      onLoadMore={onLoadMore}
    >
      {episodes.map((episode, index) => (
        <article
          key={episode.id}
          aria-posinset={++index}
          aria-setsize={totalEpisodes}
        >
          <Episode episode={episode} />
        </article>
      ))}
    </InfiniteScroll>
  )
}
