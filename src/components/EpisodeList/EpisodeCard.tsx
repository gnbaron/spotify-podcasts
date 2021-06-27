import { Link } from 'react-router-dom'
import { useIsWideScreen } from 'hooks/useMediaQuery'
import { LazyCover } from 'components/LazyCover'
import { OnlyWideScreen } from 'components/ResponsiveContainer'
import { EpisodeTimestamp } from './EpisodeTimestamp'

import styles from './EpisodeCard.module.css'

type Props = {
  episode: SpotifyApi.EpisodeObjectSimplified
}

export const EpisodeCard = ({ episode }: Props) => {
  const isWide = useIsWideScreen()
  return (
    <article className={styles.episode}>
      <Link to={`/episodes/${episode.id}`} aria-hidden tabIndex={-1}>
        <LazyCover
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
