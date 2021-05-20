import { InfiniteScroll } from 'components/InfiniteScroll'
import { PaginationState } from 'types/common'
import { ShowCard } from './ShowCard'

import styles from './ShowGrid.module.css'

type Props = {
  shows: SpotifyApi.SavedShowObject[]
} & PaginationState

export const ShowGrid = ({ shows, ...props }: Props) => (
  <InfiniteScroll {...props} className={styles.grid}>
    {shows.map(({ show }, index) => (
      <article key={show.id} aria-posinset={++index} aria-setsize={props.total}>
        <ShowCard show={show} />
      </article>
    ))}
  </InfiniteScroll>
)
