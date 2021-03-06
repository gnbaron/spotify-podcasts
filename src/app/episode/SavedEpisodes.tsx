import { useSavedEpisodes } from 'queries/spotify-queries'
import { BasePage } from 'components/BasePage'
import { EmptyState } from 'components/EmptyState'
import { EpisodeList } from 'components/EpisodeList'

export const SavedEpisodes = () => {
  const episodes = useSavedEpisodes()

  if (!episodes.data) return null

  return (
    <BasePage heading="Episodes">
      {episodes.data.length === 0 && !episodes.isFetching ? (
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
