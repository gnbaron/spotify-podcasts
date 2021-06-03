import { QueryClient } from 'react-query'

const FIVE_MINUTES = 5 * 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,
      suspense: true,
    },
  },
})
