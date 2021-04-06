import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query'
import { fetchSpotifyAPI } from './query-client'

const BASE_URL = 'https://api.spotify.com/v1'

const FIVE_MINUTES = 5 * 60 * 1000

type Paginated<T> = SpotifyApi.PagingObject<T>

/**
 * Simple wrapper to execute queries on paginated spotify endpoints.
 * @returns query result
 */
export const usePaginatedQuery = <T>(
  key: QueryKey,
  queryFn: (nextPageURL: string | undefined) => Promise<Paginated<T>>,
  queryOptions?: UseInfiniteQueryOptions<Paginated<T>, Error>
) => {
  return useInfiniteQuery<Paginated<T>, Error>(
    key,
    ({ pageParam }) => queryFn(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.href,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...queryOptions,
    }
  )
}

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    'savedShows',
    (nextPageURL) =>
      fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/shows?limit=5`),
    { staleTime: FIVE_MINUTES }
  )
}
