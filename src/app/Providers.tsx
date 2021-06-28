import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from 'queries/query-client'
import { AuthProvider } from 'context/auth'
import { Tokens } from 'types/common'

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const Providers = ({ children, tokens }: Props) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider tokens={tokens}>{children}</AuthProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
