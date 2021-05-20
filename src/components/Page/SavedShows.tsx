import { useSavedShows } from 'lib/spotify-queries'
import { ShowGrid } from 'components/ShowGrid'
import { BasePage } from './BasePage'

export const SavedShows = () => {
  const query = useSavedShows()

  if (query.status !== 'success') return null // TODO: handle loading state

  return (
    <BasePage heading="Following">
      <ShowGrid
        hasMore={query.hasNextPage}
        isLoading={query.isFetchingNextPage}
        onLoadMore={query.fetchNextPage}
        shows={query.data || []}
        total={query.totalElements}
      />
    </BasePage>
  )
}
