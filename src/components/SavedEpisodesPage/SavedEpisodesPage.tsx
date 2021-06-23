import { NextSeo } from 'next-seo'
import { useSavedEpisodes } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { Episode } from 'components/Episode'
import { InfiniteScroll } from 'components/InfiniteScroll'

import styles from './SavedEpisodesPage.module.css'

export const SavedEpisodesPage = () => {
  const episodes = useSavedEpisodes()

  if (!episodes.data) return null

  const isEmpty = episodes.data.length === 0

  return (
    <BasePage className={styles.savedEpisodes} heading="Episodes">
      <NextSeo
        title="Spotify Podcasts · Episodes"
        description="List of saved episodes."
      />
      {isEmpty && !episodes.isFetching ? (
        <EmptyState
          title="Oh snap! Nothing to see here."
          subtitle="It looks like you didn't save any episode yet."
        />
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
              <Episode episode={episode} />
            </article>
          ))}
        </InfiniteScroll>
      )}
    </BasePage>
  )
}
