import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import {
  useShow,
  useShowEpisodes,
  useShowIsSaved,
} from 'queries/spotify-queries'
import { useMutateSavedShows } from 'queries/spotify-mutations'
import { Button } from 'components/Button'
import { DetailsPage } from 'components/DetailsPage'
import { EpisodeList } from 'components/EpisodeList'

import styles from './ShowDetails.module.css'

type Show = SpotifyApi.ShowObject

export const ShowDetails = () => {
  const params = useParams<{ showId: string }>()

  const show = useShow(params.showId)
  const episodes = useShowEpisodes(params.showId)

  if (!show.data || !episodes.data) return null

  return (
    <DetailsPage
      cover={show.data.images[1] || show.data.images[0]}
      headingContent={<Heading show={show.data} />}
      subtitle={show.data.publisher}
      title={show.data.name}
    >
      <EpisodeList
        episodes={episodes.data}
        hasMore={episodes.hasNextPage}
        isLoading={episodes.isFetchingNextPage}
        onLoadMore={episodes.fetchNextPage}
        totalEpisodes={episodes.totalElements}
      />
    </DetailsPage>
  )
}

const Heading = ({ show }: { show: Show }) => {
  const isSaved = useShowIsSaved(show.id)
  const save = useMutateSavedShows()
  const remove = useMutateSavedShows({ removing: true })

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
            ? remove.mutate(show.id)
            : save.mutate(show.id)
        }
        quiet
        size="s"
      >
        {isSaved.data && isSaved.data[0] ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}
