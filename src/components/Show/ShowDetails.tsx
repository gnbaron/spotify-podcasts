import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { ShowCover } from './ShowCover'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data

  return (
    <article className={styles.wrapper}>
      <header>
        <ShowCover images={show.images} />
        <div className={styles.heading}>
          <h2>{show.name}</h2>
          <small>{show.publisher}</small>
          <p>{show.description}</p>
        </div>
      </header>
      <section className={styles.episodes}>
        <h3>All episodes</h3>
        <span>({show.total_episodes})</span>
        <hr />
      </section>
    </article>
  )
}
