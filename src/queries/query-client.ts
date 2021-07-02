import { QueryClient } from 'react-query'

const MINUTE = 60 * 1000

export const queryClientDefaults = {
  queries: {
    staleTime: 5 * MINUTE,
    suspense: true,
  },
  mutations: {
    useErrorBoundary: true,
  },
}

export const queryClient = new QueryClient({
  defaultOptions: { ...queryClientDefaults },
})
