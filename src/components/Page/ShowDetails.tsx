import { useParams } from 'react-router-dom'
import { useShow } from 'lib/spotify-queries'
import { EpisodeList } from 'components/EpisodeList'

import { DetailsPage } from './DetailsPage'

export const ShowDetails = () => {
  const params = useParams<{ id: string }>()
  const query = useShow(params.id)

  if (query.status !== 'success') return null // TODO: handle loading state

  const show = query.data

  return (
    <DetailsPage
      cover={show.images}
      description={show.description}
      subtitle={show.publisher}
      title={show.name}
    >
      <EpisodeList episodes={show.episodes.items} />
    </DetailsPage>
  )
}
