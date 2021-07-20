import { useEffect, useState } from 'react'
import { App, Providers } from 'app'
import { Tokens } from 'types/common'

export default function IndexPage() {
  const [tokens, setTokens] = useState<Tokens | null | undefined>(undefined)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const accessToken = query.get('accessToken')
    const refreshToken = query.get('refreshToken')
    if (accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken })
    } else {
      setTokens(null)
    }
  }, [])

  // does not redirect to /login before query string is parsed
  if (tokens === undefined) return null

  return (
    <Providers tokens={tokens}>
      <App />
    </Providers>
  )
}
