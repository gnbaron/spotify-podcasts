import { useParams } from 'react-router-dom'
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
      <div
        className={styles.description}
        // FIXME: make a PR for the @types repository
        dangerouslySetInnerHTML={{ __html: episode.html_description }}
      />
    </DetailsPage>
  )
}
