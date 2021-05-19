import { useSavedShows } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { InfiniteList } from 'components/InfiniteList'
import { ShowCard } from 'components/ShowCard'

import styles from './SavedShows.module.css'

export const SavedShows = () => {
  const query = useSavedShows()

  if (query.status !== 'success') return null // TODO: handle loading state

  return (
    <BasePage heading="Following">
      <div className={styles.grid}>
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
    </BasePage>
  )
}
