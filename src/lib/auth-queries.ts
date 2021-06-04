import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import TokenStorage from 'lib/token-storage'
import { Tokens } from 'types/common'

const TEN_MINUTES = 10 * 60 * 1000

export const queryKeys = {
  tokens: () => ['tokens'],
}

export function useFreshTokens() {
  const tokens = TokenStorage.read()
  const router = useRouter()
  return useQuery(queryKeys.tokens(), fetchFreshTokens, {
    initialData: tokens,
    staleTime: TEN_MINUTES,
    cacheTime: Infinity,
    refetchInterval: TEN_MINUTES,
    refetchIntervalInBackground: true,
    onSuccess: TokenStorage.save,
    onError: () => router.push('/login'),
  })
}

async function fetchFreshTokens(): Promise<Tokens> {
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
