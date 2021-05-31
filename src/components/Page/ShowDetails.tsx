import { useParams } from 'react-router-dom'
import { useShow, useShowEpisodes } from 'lib/spotify-queries'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { DetailsPage } from './DetailsPage'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()

  const show = useShow(params.id)
  const episodes = useShowEpisodes(params.id)

  if (show.data && episodes.data) {
    return (
      <DetailsPage
        cover={show.data.images}
        description={show.data.description}
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

  if (show.error) console.error('query error', show.error)

  if (episodes.error) console.error('query error', episodes.error)

  return 'loading...' // TODO: implement loading state
}
