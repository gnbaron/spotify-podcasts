import { Link } from 'react-router-dom'
import { ShowCover } from './ShowCover'

import styles from './ShowCard.module.css'

type Props = {
  show: SpotifyApi.ShowObjectSimplified
}

export const ShowCard = ({ show }: Props) => {
  return (
    <article className={styles.card}>
      <Link to={`/shows/${show.id}`}>
        <header>
          <ShowCover className={styles.cover} images={show.images} />
          <div className={styles.name}>{show.name}</div>
        </header>
        <p className={styles.description} data-testid="description">
          {show.description}
        </p>
      </Link>
    </article>
  )
}
