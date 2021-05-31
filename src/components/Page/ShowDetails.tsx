import { useParams } from 'react-router-dom'
import { useShow, useShowEpisodes } from 'lib/spotify-queries'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { DetailsPage } from './DetailsPage'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const showQuery = useShow(params.id)
  const episodesQuery = useShowEpisodes(params.id)

  if (showQuery.status !== 'success' || episodesQuery.status !== 'success')
    return null // TODO: handle loading state

  const show = showQuery.data
  const episodes = episodesQuery.data || []

  return (
    <DetailsPage
      cover={show.images}
      description={show.description}
      subtitle={show.publisher}
      title={show.name}
    >
      <InfiniteScroll
        className={styles.episodeList}
        hasMore={episodesQuery.hasNextPage}
        isLoading={episodesQuery.isFetchingNextPage}
        onLoadMore={episodesQuery.fetchNextPage}
      >
        {episodes.map((episode, index) => (
          <article
            key={episode.id}
            aria-posinset={++index}
            aria-setsize={episodesQuery.totalElements}
          >
            <Episode episode={episode} />
          </article>
        ))}
      </InfiniteScroll>
    </DetailsPage>
  )
}
