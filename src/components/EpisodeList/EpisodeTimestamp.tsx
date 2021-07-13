import classNames from 'classnames'
import { format } from 'date-fns'

import styles from './EpisodeTimestamp.module.css'

type Props = {
  className?: string
  episode: SpotifyApi.EpisodeObjectSimplified
}

export const EpisodeTimestamp = ({ className, episode }: Props) => (
  <div className={classNames(styles.timestamp, className)}>
    <span className={styles.date}>
      {format(new Date(episode.release_date), 'MMM dd, yyyy')}
    </span>
    ·
    <span className={styles.duration}>{`${Math.round(
      episode.duration_ms / 1000 / 60
    )} min`}</span>
  </div>
)
