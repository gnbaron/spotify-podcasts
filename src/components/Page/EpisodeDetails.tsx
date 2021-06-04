import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useEpisode } from 'lib/spotify-queries'
import { DetailsPage } from './DetailsPage'

import styles from './EpisodeDetails.module.css'

export const EpisodeDetails = () => {
  const params = useParams<{ showId: string; episodeId: string }>()
  const episode = useEpisode(params.episodeId)

  if (!episode.data) return null

  return (
    <DetailsPage
      cover={episode.data.images[1]}
      coverSize="m"
      title={episode.data.name}
      subtitle={episode.data.show.name}
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
