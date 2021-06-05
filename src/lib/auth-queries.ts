import { useQuery } from 'react-query'
import TokenStorage from 'lib/token-storage'
import { Tokens } from 'types/common'

const MINUTE = 60 * 1000

export const queryKeys = {
  tokens: () => ['tokens'],
}

export function useFreshTokens(tokens: Tokens | null) {
  if (tokens) TokenStorage.save(tokens)

  return useQuery(queryKeys.tokens(), fetchFreshTokens, {
    initialData: tokens || TokenStorage.read(),
    cacheTime: Infinity,
    staleTime: 10 * MINUTE,
    refetchInterval: 9 * MINUTE,
    refetchIntervalInBackground: true,
    onSuccess: TokenStorage.save,
    suspense: false,
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
