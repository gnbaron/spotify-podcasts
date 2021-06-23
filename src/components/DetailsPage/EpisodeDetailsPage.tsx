import { useParams } from 'react-router-dom'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useEpisode, useEpisodeIsSaved } from 'lib/spotify-queries'
import { useMutateSavedEpisodes } from 'lib/spotify-mutations'
import { IconButton } from 'components/Button'
import { EpisodeDuration } from 'components/Episode'
import { DetailsPage } from './DetailsPage'

import styles from './EpisodeDetailsPage.module.css'

type Episode = SpotifyApi.EpisodeObject

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
      <EpisodeDuration className={styles.duration} episode={episode.data} />
      <h4 className={styles.heading}>Episode Description</h4>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.data.html_description }}
      />
    </DetailsPage>
  )
}

const EpisodeControls = ({ episode }: { episode: Episode }) => {
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
