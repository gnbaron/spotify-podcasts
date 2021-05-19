import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { CoverImage } from 'components/CoverImage'
import { EpisodeList } from 'components/EpisodeList'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data

  return (
    <BasePage>
      <article className={styles.details}>
        <header>
          <CoverImage images={show.images} size="l" />
          <div className={styles.heading}>
            <h2>{show.name}</h2>
            <span>by {show.publisher}</span>
            <p>{show.description}</p>
          </div>
        </header>
        <hr />
        <EpisodeList episodes={show.episodes.items} />
      </article>
    </BasePage>
  )
}
