import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query'

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
    data,
    totalElements: result.data ? result.data.pages[0].total : 0,
  }
}
