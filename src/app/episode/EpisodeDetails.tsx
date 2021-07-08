import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useEpisode, useEpisodeIsSaved } from 'queries/spotify-queries'
import { useMutateSavedEpisodes } from 'queries/spotify-mutations'
import { IconButton } from 'components/Button'
import { DetailsPage } from 'components/DetailsPage'
import { EpisodeTimestamp } from 'components/EpisodeList'

import styles from './EpisodeDetails.module.css'

export const EpisodeDetails = () => {
  const params = useParams<{ episodeId: string }>()
  const episode = useEpisode(params.episodeId)

  if (!episode.data) return null

  return (
    <DetailsPage
      cover={episode.data.images[1] || episode.data.images[0]}
      headingContent={<SaveButton episode={episode.data} />}
      subtitle={episode.data.show.name}
      subtitleHref={`/shows/${episode.data.show.id}`}
      title={episode.data.name}
    >
      <h4 className={styles.bodyHeading}>Episode Description</h4>
      <EpisodeTimestamp className={styles.timestamp} episode={episode.data} />
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.data.html_description }}
      />
    </DetailsPage>
  )
}

const SaveButton = ({ episode }: { episode: SpotifyApi.EpisodeObject }) => {
  const query = useEpisodeIsSaved(episode.id)
  const mutation = useMutateSavedEpisodes()
  const isSaved = query.data && query.data[0]
  return (
    <IconButton
      className={classNames(styles.button, query.data && styles.active)}
      disabled={mutation.isLoading}
      label={isSaved ? 'Remove from library' : 'Save to library'}
      onClick={() => mutation.mutate({ ids: [episode.id], remove: isSaved })}
      quiet
      size="l"
    >
      {isSaved ? <FaCheck /> : <FaPlus />}
    </IconButton>
  )
}
