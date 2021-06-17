import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Cover } from 'components/Cover'

import styles from './Episode.module.css'

type Props = {
  episode: SpotifyApi.EpisodeObjectSimplified
}

export const Episode = ({ episode }: Props) => (
  <article className={styles.episode}>
    <Link to={`/episodes/${episode.id}`} aria-hidden tabIndex={-1}>
      <Cover
        className={styles.cover}
        image={episode.images[1] || episode.images[0]}
        size="s"
      />
    </Link>
    <div className={styles.content}>
      <Link to={`/episodes/${episode.id}`}>
        <h3 className={styles.heading}>{episode.name}</h3>
      </Link>
      <p className={styles.description}>{episode.description}</p>
      <div className={styles.time}>
        <span>{format(new Date(episode.release_date), 'MMM dd')}</span>·
        <span>{`${Math.round(episode.duration_ms / 1000 / 60)} min`}</span>
      </div>
    </div>
  </article>
)
