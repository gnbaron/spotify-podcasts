import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { ShowHeader } from 'components/Show'
import { EpisodeList } from 'components/Episode'

import styles from './ShowDetails.module.css'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data

  return (
    <BasePage>
      <article className={styles.details}>
        <ShowHeader show={show} />
        <hr />
        <EpisodeList episodes={show.episodes.items} />
      </article>
    </BasePage>
  )
}
