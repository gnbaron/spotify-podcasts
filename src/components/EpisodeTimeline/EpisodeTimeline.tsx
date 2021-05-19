import styles from './EpisodeTimeline.module.css'

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[]
}

export const EpisodeTimeline = ({ episodes }: Props) => {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>{episode.name}</li>
      ))}
    </ul>
  )
}
