import { Episode } from './Episode'

import styles from './EpisodeList.module.css'

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[]
}

export const EpisodeList = ({ episodes }: Props) => {
  return (
    <ul className={styles.list}>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <Episode episode={episode} />
        </li>
      ))}
    </ul>
  )
}
