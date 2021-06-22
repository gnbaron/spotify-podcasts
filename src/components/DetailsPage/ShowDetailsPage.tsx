import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useShow, useShowEpisodes, useShowIsSaved } from 'lib/spotify-queries'
import { useMutateSavedShows } from 'lib/spotify-mutations'
import { Button } from 'components/Button'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { DetailsPage } from './DetailsPage'

import styles from './ShowDetailsPage.module.css'

type Show = SpotifyApi.ShowObject

export const ShowDetailsPage = () => {
  const params = useParams<{ showId: string }>()

  const show = useShow(params.showId)
  const episodes = useShowEpisodes(params.showId)

  if (!show.data || !episodes.data) return null

  return (
    <DetailsPage
      cover={show.data.images[1]}
      headingContent={<HeadingContent show={show.data} />}
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

const HeadingContent = ({ show }: { show: Show }) => {
  const isSaved = useShowIsSaved(show.id)
  const saveMutation = useMutateSavedShows()
  const removeMutation = useMutateSavedShows({ removing: true })

  return (
    <>
      <p className={styles.description}>{show.description}</p>
      <Button
        className={classNames(
          styles.followButton,
          isSaved.data && styles.active
        )}
        onClick={() =>
          isSaved.data && isSaved.data[0]
            ? removeMutation.mutate(show.id)
            : saveMutation.mutate(show.id)
        }
        quiet
        size="s"
      >
        {isSaved.data && isSaved.data[0] ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}
