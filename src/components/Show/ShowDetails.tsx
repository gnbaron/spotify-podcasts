import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data
  const cover = show.images[1] || show.images[0] // TODO: create a component for this

  return (
    <article className={styles.wrapper}>
      <header>
        <aside>
          <img className={styles.cover} src={cover.url} role="presentation" />
        </aside>
        <div className={styles.heading}>
          <h2>{show.name}</h2>
          <small>by {show.publisher}</small>
          <p>{show.description}</p>
        </div>
      </header>
      <section>
        <h3>Episodes</h3>
      </section>
    </article>
  )
}
