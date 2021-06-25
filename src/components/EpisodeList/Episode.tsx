import { Link } from 'react-router-dom'
import { useIsWideScreen } from 'utils/use-media-query'
import { Cover } from 'components/Cover'
import { OnlyWideScreen } from 'components/ResponsiveContainer'
import { EpisodeTimestamp } from './EpisodeTimestamp'

import styles from './Episode.module.css'

type Props = {
  episode: SpotifyApi.EpisodeObjectSimplified
}

export const Episode = ({ episode }: Props) => {
  const isWide = useIsWideScreen()
  return (
    <article className={styles.episode}>
      <Link to={`/episodes/${episode.id}`} aria-hidden tabIndex={-1}>
        <Cover
          className={styles.cover}
          image={episode.images[1] || episode.images[0]}
          size={isWide ? 's' : 'xs'}
        />
      </Link>
      <div className={styles.content}>
        <Link to={`/episodes/${episode.id}`}>
          <p className={styles.heading}>{episode.name}</p>
        </Link>
        <OnlyWideScreen>
          <p className={styles.description}>{episode.description}</p>
        </OnlyWideScreen>
        <EpisodeTimestamp episode={episode} />
      </div>
    </article>
  )
}
