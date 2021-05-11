import { Link } from 'react-router-dom'

import styles from './ShowCard.module.css'

type Props = {
  show: SpotifyApi.ShowObjectSimplified
}

export const ShowCard = ({ show }: Props) => {
  const cover = show.images[1] || show.images[0]
  return (
    <div className={styles.show}>
      <Link to={`/shows/${show.id}`}>
        <img src={cover.url} role="presentation" />
        <div className={styles.name}>{show.name}</div>
        <p className={styles.description} data-testid="description">
          {show.description}
        </p>
      </Link>
    </div>
  )
}
