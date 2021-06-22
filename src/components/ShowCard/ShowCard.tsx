import { Link } from 'react-router-dom'
import { Cover } from 'components/Cover'

import styles from './ShowCard.module.css'

type Props = {
  show: SpotifyApi.ShowObjectSimplified
}

export const ShowCard = ({ show }: Props) => (
  <div className={styles.card}>
    <Link to={`/shows/${show.id}`}>
      <header>
        <Cover
          className={styles.cover}
          image={show.images[1] || show.images[0]}
          size="m"
        />
        <p className={styles.name}>{show.name}</p>
      </header>
    </Link>
    <small className={styles.publisher}>{show.publisher}</small>
  </div>
)
