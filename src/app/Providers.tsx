import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from 'queries/query-client'
import { AuthProvider } from 'context/auth'
import { Tokens } from 'types/common'

type Props = {
  children: React.ReactNode
  queryClient?: QueryClient
  tokens: Tokens | null
}

export const Providers = ({ children, tokens, ...props }: Props) => (
  <QueryClientProvider client={props.queryClient || queryClient}>
    <BrowserRouter>
      <AuthProvider tokens={tokens}>{children}</AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
