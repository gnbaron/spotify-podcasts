import { QueryClient } from 'react-query'

const MINUTE = 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE,
      suspense: true,
    },
  },
})
