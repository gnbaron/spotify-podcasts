import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import {
  useShow,
  useShowEpisodes,
  useShowIsSaved,
} from 'queries/spotify-queries'
import { useMutateSavedShows } from 'queries/spotify-mutations'
import { SecondaryButton } from 'components/Button'
import { DetailsPage } from 'components/DetailsPage'
import { EpisodeList } from 'components/EpisodeList'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ showId: string }>()
  const show = useShow(params.showId)
  const episodes = useShowEpisodes(params.showId)

  if (!show.data || !episodes.data) return null

  return (
    <DetailsPage
      cover={show.data.images[1] || show.data.images[0]}
      headingContent={
        <>
          <p className={styles.description}>{show.data.description}</p>
          <FollowButton show={show.data} />
        </>
      }
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

const FollowButton = ({ show }: { show: SpotifyApi.ShowObject }) => {
  const query = useShowIsSaved(show.id)
  const mutation = useMutateSavedShows()
  const isSaved = query.data && query.data[0]
  return (
    <SecondaryButton
      className={classNames(styles.button, query.data && styles.active)}
      disabled={mutation.isLoading}
      onClick={() => mutation.mutate({ ids: [show.id], remove: isSaved })}
      size="s"
    >
      {isSaved ? 'Unfollow' : 'Follow'}
    </SecondaryButton>
  )
}
