import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from 'lib/query-client'
import { Tokens } from 'types/common'
import { Authenticated } from './Authenticated'

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const Providers = ({ children, tokens }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticated tokens={tokens}>{children}</Authenticated>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
