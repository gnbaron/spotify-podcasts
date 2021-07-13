import { useQuery, UseQueryOptions } from 'react-query'
import TokenStorage from 'utils/token-storage'
import { fetchTokens, MissingTokenError } from './auth-api'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'
import { Tokens, User } from 'types/common'

const MINUTE = 60 * 1000

export const queryKeys = {
  tokens: () => ['tokens'],
  user: () => ['user'],
}

export function useSession(tokens: Tokens | null) {
  if (tokens) TokenStorage.save(tokens)

  return useQuery(queryKeys.tokens(), fetchTokens, {
    cacheTime: Infinity,
    initialData: tokens || undefined,
    onSuccess: TokenStorage.save,
    staleTime: 10 * MINUTE,
    suspense: false,
    refetchInterval: 9 * MINUTE,
    refetchIntervalInBackground: true,
    retry: (count, error) => !(error instanceof MissingTokenError) && count < 2,
  })
}

export function useUser(options: UseQueryOptions<User> = {}) {
  return useQuery<User>(
    queryKeys.user(),
    () => fetchSpotifyAPI(`${BASE_URL}/me`),
    { suspense: false, ...options }
  )
}
