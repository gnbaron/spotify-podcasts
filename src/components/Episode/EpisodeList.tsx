import styles from './EpisodeList.module.css'

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[]
}

export const EpisodeList = ({ episodes }: Props) => {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>{episode.name}</li>
      ))}
    </ul>
  )
}
