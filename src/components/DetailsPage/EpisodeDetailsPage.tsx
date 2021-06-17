import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useEpisode, useEpisodeIsSaved } from 'lib/spotify-queries'
import { useMutateSavedEpisodes } from 'lib/spotify-mutations'
import { IconButton } from 'components/Button'
import { DetailsPage } from './DetailsPage'

import styles from './EpisodeDetailsPage.module.css'

export const EpisodeDetailsPage = () => {
  const params = useParams<{ episodeId: string }>()
  const episode = useEpisode(params.episodeId)
  const isSaved = useEpisodeIsSaved(params.episodeId)

  if (!episode.data || !isSaved.data) return null

  return (
    <DetailsPage
      cover={episode.data.images[1]}
      headingContent={<EpisodeControls episode={episode.data} />}
      subtitle={episode.data.show.name}
      subtitleHref={`/shows/${episode.data.show.id}`}
      title={episode.data.name}
    >
      <div className={styles.time}>
        <span>{format(new Date(episode.data.release_date), 'MMM dd')}</span>·
        <span>{`${Math.round(episode.data.duration_ms / 1000 / 60)} min`}</span>
      </div>
      <h3 className={styles.heading}>Episode Description</h3>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.data.html_description }}
      />
    </DetailsPage>
  )
}

type EpisodeControlsProps = {
  episode: SpotifyApi.EpisodeObject
}

const EpisodeControls = ({ episode }: EpisodeControlsProps) => {
  const isSaved = useEpisodeIsSaved(episode.id)
  const saveMutation = useMutateSavedEpisodes()
  const removeMutation = useMutateSavedEpisodes({ removing: true })

  if (!isSaved.data) return null

  return (
    <div className={styles.controls}>
      <IconButton
        className={styles.saveButton}
        onClick={() =>
          isSaved.data[0]
            ? removeMutation.mutate(episode.id)
            : saveMutation.mutate(episode.id)
        }
        quiet
        size="l"
      >
        {isSaved.data[0] ? <FaCheck /> : <FaPlus />}
      </IconButton>
    </div>
  )
}
