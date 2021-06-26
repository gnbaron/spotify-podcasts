import { NextPageContext } from 'next'
import { Tokens } from 'types/common'
import { App, Providers } from 'app'

type Props = {
  tokens: Tokens | null
}

export default function IndexPage({ tokens }: Props) {
  return (
    <Providers tokens={tokens}>
      <App />
    </Providers>
  )
}

export function getServerSideProps({ query }: NextPageContext) {
  const { accessToken, refreshToken } = query
  let tokens = null
  if (accessToken && refreshToken) {
    tokens = { accessToken, refreshToken }
  }
  return {
    props: { tokens },
  }
}
