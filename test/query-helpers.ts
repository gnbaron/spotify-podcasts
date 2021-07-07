import { waitFor } from '@testing-library/react'
import { QueryClient } from 'react-query'
import { queryClientDefaults } from 'queries/query-client'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      ...queryClientDefaults,
      queries: {
        ...queryClientDefaults.queries,
        retry: false,
        suspense: false,
      },
      mutations: {
        ...queryClientDefaults.mutations,
        retry: false,
      },
    },
  })
}

/**
 * Test helper to wait until all queries and mutations are done.
 * @example await flushQueries()
 */
export async function flushQueries(queryClient: QueryClient) {
  await waitFor(() =>
    queryClient.isFetching() || queryClient.isMutating()
      ? Promise.reject()
      : Promise.resolve()
  )
}
