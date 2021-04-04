import { useEffect } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  // clear query string
  useEffect(() => {
    const { asPath, pathname, query, replace } = router
    if (Object.keys(query).length) {
      replace(asPath, pathname, { shallow: true })
    }
  }, [router])

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
