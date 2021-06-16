import { useParams } from 'react-router-dom'
import { useShow, useShowEpisodes } from 'lib/spotify-queries'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { DetailsPage } from './DetailsPage'

import styles from './ShowDetailsPage.module.css'

export const ShowDetailsPage = () => {
  const params = useParams<{ showId: string }>()

  const show = useShow(params.showId)
  const episodes = useShowEpisodes(params.showId)

  if (!show.data || !episodes.data) return null

  return (
    <DetailsPage
      cover={show.data.images[1]}
      headingContent={
        <p className={styles.description}>{show.data.description}</p>
      }
      subtitle={show.data.publisher}
      title={show.data.name}
    >
      <InfiniteScroll
        className={styles.episodeList}
        hasMore={episodes.hasNextPage}
        isLoading={episodes.isFetchingNextPage}
        onLoadMore={episodes.fetchNextPage}
      >
        {episodes.data.map((episode, index) => (
          <article
            key={episode.id}
            aria-posinset={++index}
            aria-setsize={episodes.totalElements}
          >
            <Episode episode={episode} />
          </article>
        ))}
      </InfiniteScroll>
    </DetailsPage>
  )
}
