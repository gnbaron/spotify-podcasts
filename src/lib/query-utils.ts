import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query'
import { queryClient } from './query-client'
import TokenStorage from './token-storage'

type Paginated<T> = SpotifyApi.PagingObject<T>

/**
 * Simple wrapper to execute queries on paginated spotify endpoints.
 * @returns query result
 */
export const usePaginatedQuery = <T>(
  key: QueryKey,
  queryFn: (nextPageURL: string | undefined) => Promise<Paginated<T>>,
  queryOptions?: UseInfiniteQueryOptions<Paginated<T>>
) => {
  const result = useInfiniteQuery<Paginated<T>>(
    key,
    ({ pageParam }) => queryFn(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.href,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      ...queryOptions,
    }
  )
  const data = result.data?.pages.reduce<T[]>(
    (items, page) => [...items, ...page.items],
    []
  )
  return {
    ...result,
    data: data || [],
    totalElements: result.data ? result.data.pages[0].total : 0,
  }
}

/**
 * Make a request for Spotify Web API.
 * @param url resource url
 * @param options fetch options
 * @returns response promise
 * @throws Error when access token is invalid
 */
export const fetchSpotifyAPI = async <T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> => {
  const tokens = TokenStorage.read()
  if (!tokens) {
    throw new Error('Invalid access token')
  }
  const headers = {
    Authorization: `Bearer ${tokens.accessToken}`,
    'Content-Type': 'application/json',
  }
  const response = await fetch(url, { headers, ...options })
  if (response.status === 401) {
    await queryClient.refetchQueries('tokens')
    return fetchSpotifyAPI(url, options)
  }
  if (!response.ok) {
    throw new Error('Unexpected error')
  }
  return response.json()
}
