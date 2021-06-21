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
      headingContent={<HeadingContent episode={episode.data} />}
      subtitle={episode.data.show.name}
      subtitleHref={`/shows/${episode.data.show.id}`}
      title={episode.data.name}
    >
      <EpisodeDescription episode={episode.data} />
    </DetailsPage>
  )
}

const HeadingContent = ({ episode }: { episode: Episode }) => {
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

const EpisodeDescription = ({ episode }: { episode: Episode }) => {
  return (
    <>
      <EpisodeDuration className={styles.duration} episode={episode} />
      <h3 className={styles.heading}>Episode Description</h3>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.html_description }}
      />
    </>
  )
}
