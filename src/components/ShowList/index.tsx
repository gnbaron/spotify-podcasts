import { useSavedShows } from 'lib/spotify-queries'
import { InfiniteList } from '../InfiniteList'

import styles from './index.module.css'

export const ShowList = () => {
  const query = useSavedShows()

  if (query.status !== 'success') return null // TODO: handle loading state

  return (
    <div className={styles.showList}>
      <InfiniteList
        hasMore={query.hasNextPage}
        isLoading={query.isFetchingNextPage}
        onLoadMore={query.fetchNextPage}
      >
        {query.data?.map((item) => (
          <div className={styles.show} key={item.show.id}>
            {item.show.name}
          </div>
        ))}
      </InfiniteList>
    </div>
  )
}
