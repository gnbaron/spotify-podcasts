import { ShowCover } from './ShowCover'

import styles from './ShowHeader.module.css'

type Props = {
  show: SpotifyApi.ShowObjectFull
}

export const ShowHeader = ({ show }: Props) => (
  <header className={styles.header}>
    <ShowCover images={show.images} />
    <div className={styles.heading}>
      <h2>{show.name}</h2>
      <span>by {show.publisher}</span>
      <p>{show.description}</p>
    </div>
  </header>
)
