import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { ShowCover } from './ShowCover'

import styles from './ShowDetails.module.css'
import { EpisodeList } from 'components/Episode'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data

  return (
    <article className={styles.details}>
      <header>
        <ShowCover images={show.images} />
        <div className={styles.heading}>
          <h2>{show.name}</h2>
          <span>by {show.publisher}</span>
          <p>{show.description}</p>
        </div>
      </header>
      <hr />
      <section>
        <EpisodeList episodes={show.episodes.items} />
      </section>
    </article>
  )
}
