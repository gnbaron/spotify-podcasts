import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useEpisode } from 'lib/spotify-queries'
import { DetailsPage } from './DetailsPage'

import styles from './EpisodeDetails.module.css'

export const EpisodeDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useEpisode(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const episode = query.data

  return (
    <DetailsPage
      cover={episode.images}
      coverSize="m"
      title={episode.name}
      subtitle={episode.show.name}
    >
      <div className={styles.date}>
        <span>{format(new Date(episode.release_date), 'MMM dd')}</span>·
        <span>{`${Math.round(episode.duration_ms / 1000 / 60)} min`}</span>
      </div>
      <h3 className={styles.heading}>Episode Description</h3>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.html_description }}
      />
    </DetailsPage>
  )
}
