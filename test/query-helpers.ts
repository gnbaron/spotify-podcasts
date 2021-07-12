import { waitFor } from '@testing-library/react'
import { QueryClient, setLogger } from 'react-query'
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
        useErrorBoundary: false,
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

/**
 * Override React Query logger to supress query errors.
 */
export function supressQueryErrors() {
  const noop = () => {
    // does nothing
  }
  setLogger({
    log: console.log,
    warn: console.warn,
    error: noop,
  })
}
