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
        <Cover className={styles.cover} image={show.images[1]} size="m" />
        <h3 className={styles.name}>{show.name}</h3>
      </header>
    </Link>
    <p className={styles.description} data-testid="description">
      {show.description}
    </p>
  </div>
)
