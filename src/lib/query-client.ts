import { useContext, useState } from 'react'
import {
  QueryClient,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import { AuthenticationContext } from 'context/auth'

export const queryClient = new QueryClient()

export const createRequest = (url: RequestInfo, options?: RequestInit) => {
  const { tokens } = useContext(AuthenticationContext) // eslint-disable-line react-hooks/rules-of-hooks

  const headers = {
    Authorization: `Bearer ${tokens.accessToken}`,
    'Content-Type': 'application/json',
  }

  return async function () {
    const response = await fetch(url, { headers, ...options })
    if (response.status === 401) {
      await queryClient.refetchQueries('tokens')
    }
    if (!response.ok) {
      throw new Error('Unexpected error')
    }
    return response.json()
  }
}

/**
 * Simple wrapper for useQuery that provides pagination utility functions.
 * @returns QueryResult and a fetchNextPage function.
 */
export const usePaginatedQuery = <T>(
  key: QueryKey,
  queryFn: (
    nextPageURL: string | null
  ) => QueryFunction<SpotifyApi.PagingObject<T>>,
  queryOptions?: UseQueryOptions<SpotifyApi.PagingObject<T>, Error>
) => {
  const [pageURL, setPageURL] = useState<string | null>(null)

  const result = useQuery<SpotifyApi.PagingObject<T>, Error>(
    [key, pageURL],
    queryFn(pageURL),
    { ...queryOptions, keepPreviousData: true }
  )

  return {
    ...result,
    fetchNextPage: result.data?.next
      ? () => setPageURL(result.data?.next)
      : undefined,
  }
}
