import styles from './Show.module.css'

type Props = {
  show: SpotifyApi.ShowObjectSimplified
}

export const Show = ({ show }: Props) => {
  const cover = show.images[1] || show.images[0]
  return (
    <div className={styles.show}>
      <figure>
        <img src={cover.url} alt={`${show.name} cover image`} />
        <figcaption>{show.name}</figcaption>
      </figure>
      <p className={styles.description}>{show.description}</p>
    </div>
  )
}