import { Link } from 'react-router-dom'
import { useIsWideScreen } from 'hooks/useMediaQuery'
import { LazyCover } from 'components/LazyCover'

import styles from './ShowCard.module.css'

type Props = {
  show: SpotifyApi.ShowObjectSimplified
}

export const ShowCard = ({ show }: Props) => {
  const isWide = useIsWideScreen()
  return (
    <div className={styles.card}>
      <Link to={`/shows/${show.id}`}>
        <div className={styles.body}>
          <LazyCover
            className={styles.cover}
            image={show.images[1] || show.images[0]}
            size={isWide ? 'm' : 'xs'}
          />
          <div>
            <p className={styles.name}>{show.name}</p>
            <p className={styles.publisher}>{show.publisher}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
