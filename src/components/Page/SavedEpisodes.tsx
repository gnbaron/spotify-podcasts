import { NextSeo } from 'next-seo'
import { useSavedEpisodes } from 'lib/spotify-queries'
import { EmptyState } from 'components/EmptyState'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { BasePage } from './BasePage'

import styles from './SavedEpisodes.module.css'

export const SavedEpisodes = () => {
  const episodes = useSavedEpisodes()

  if (!episodes.data) return null

  const isEmpty = episodes.data.length === 0

  return (
    <BasePage heading="Library" isLoading={episodes.isFetching}>
      <NextSeo
        title="Spotify Podcasts · Library"
        description="List of saved episodes."
      />
      {isEmpty && !episodes.isFetching ? (
        <EmptyState subtitle="It looks like you didn't save any episode yet." />
      ) : (
        <InfiniteScroll
          className={styles.episodeList}
          hasMore={episodes.hasNextPage}
          isLoading={episodes.isFetchingNextPage}
          onLoadMore={episodes.fetchNextPage}
        >
          {episodes.data.map(({ episode }, index) => (
            <article
              key={episode.id}
              aria-posinset={++index}
              aria-setsize={episodes.totalElements}
            >
              <Episode episode={episode} showId={episode.show.id} />
            </article>
          ))}
        </InfiniteScroll>
      )}
    </BasePage>
  )
}
