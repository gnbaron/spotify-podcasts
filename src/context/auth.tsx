import { createContext } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import TokenStorage from 'lib/token-storage'
import { Tokens } from 'types/common'

const TEN_MINUTES = 10 * 60 * 1000

export const AuthenticationContext = createContext({
  tokens: TokenStorage.EMPTY,
})

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const AuthenticationProvider = (props: Props) => {
  const router = useRouter()

  if (props.tokens) {
    TokenStorage.save(props.tokens)
  }

  const tokens = TokenStorage.read()

  const result = useQuery('tokens', refreshToken, {
    initialData: tokens,
    staleTime: TEN_MINUTES,
    cacheTime: Infinity,
    refetchInterval: TEN_MINUTES,
    refetchIntervalInBackground: true,
    onSuccess: TokenStorage.save,
    onError: () => router.push('/login'),
  })

  console.log(result)

  if (result.status !== 'success') {
    return <div>loading</div> // TODO: add some sort of loading state
  }

  return (
    <AuthenticationContext.Provider value={{ tokens: result.data }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

async function refreshToken(): Promise<Tokens> {
  const stored = TokenStorage.read()

  if (!stored?.refreshToken) {
    throw new Error('refresh token is invalid')
  }

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: stored.refreshToken }),
  })

  if (!response.ok) {
    throw new Error("can't refresh the access token")
  }

  return await response.json()
}
