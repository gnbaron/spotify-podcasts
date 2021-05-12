import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { ShowCover } from './ShowCover'
import { Button } from 'components/Button'

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
          <Button
            className={styles.follow}
            onClick={() => console.log('click')}
            quiet
          >
            Following
          </Button>
        </div>
      </header>
      <p className={styles.description}>{show.description}</p>
      <section>{/* <h3>Episodes</h3> */}</section>
    </article>
  )
}
