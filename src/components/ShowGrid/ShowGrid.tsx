import { InfiniteList } from 'components/InfiniteList'
import React from 'react'

import styles from './ShowGrid.module.css'

type Props = {
  shows: SpotifyApi.ShowObjectSimplified[]
}

export const ShowGrid = (props: Props) => {
  return (
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
  )
}
