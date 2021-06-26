import { NextSeo } from 'next-seo'
import { useSavedEpisodes } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { EpisodeList } from 'components/EpisodeList'

import styles from './SavedEpisodes.module.css'

export const SavedEpisodes = () => {
  const episodes = useSavedEpisodes()

  if (!episodes.data) return null

  const isEmpty = episodes.data.length === 0

  return (
    <BasePage className={styles.page} heading="Episodes">
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
        <EpisodeList
          episodes={episodes.data.map(({ episode }) => episode)}
          hasMore={episodes.hasNextPage}
          isLoading={episodes.isFetchingNextPage}
          onLoadMore={episodes.fetchNextPage}
          totalEpisodes={episodes.totalElements}
        />
      )}
    </BasePage>
  )
}
