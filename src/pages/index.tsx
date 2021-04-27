import { NextPageContext } from 'next'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthenticationProvider } from 'context/auth'
import { queryClient } from 'lib/query-client'
import { App } from 'components/App'
import { Tokens } from 'types/common'

type Props = {
  tokens: Tokens | null
}

export default function IndexPage({ tokens }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider tokens={tokens}>
        <App />
      </AuthenticationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export function getServerSideProps({ query }: NextPageContext) {
  const { accessToken, refreshToken } = query
  const tokens =
    accessToken && refreshToken ? { accessToken, refreshToken } : null
  return {
    props: { tokens },
  }
}
