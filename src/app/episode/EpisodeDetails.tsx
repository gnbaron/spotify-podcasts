import { useParams } from 'react-router-dom'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useEpisode, useEpisodeIsSaved } from 'lib/spotify-queries'
import { useMutateSavedEpisodes } from 'lib/spotify-mutations'
import { IconButton } from 'components/Button'
import { DetailsPage } from 'components/DetailsPage'
import { EpisodeTimestamp } from 'components/EpisodeList'

import styles from './EpisodeDetails.module.css'

type Episode = SpotifyApi.EpisodeObject

export const EpisodeDetails = () => {
  const params = useParams<{ episodeId: string }>()
  const episode = useEpisode(params.episodeId)
  const isSaved = useEpisodeIsSaved(params.episodeId)

  if (!episode.data || !isSaved.data) return null

  return (
    <DetailsPage
      cover={episode.data.images[1] || episode.data.images[0]}
      headingContent={<Heading episode={episode.data} />}
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

const Heading = ({ episode }: { episode: Episode }) => {
  const isSaved = useEpisodeIsSaved(episode.id)
  const saveMutation = useMutateSavedEpisodes()
  const removeMutation = useMutateSavedEpisodes({ removing: true })

  if (!isSaved.data) return null

  return (
    <IconButton
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
  )
}
