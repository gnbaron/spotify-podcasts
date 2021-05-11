import { useSavedShows } from 'lib/spotify-queries'
import { InfiniteList } from 'components/InfiniteList'
import { ShowCard } from './ShowCard'

import styles from './ShowList.module.css'

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
          <ShowCard key={item.show.id} show={item.show} />
        ))}
      </InfiniteList>
    </div>
  )
}
