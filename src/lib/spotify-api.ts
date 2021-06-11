import { queryClient } from './query-client'
import { queryKeys as authQueryKeys } from './auth-queries'
import TokenStorage from './token-storage'

export const BASE_URL = 'https://api.spotify.com/v1'

/**
 * Make a request for Spotify Web API.
 * @param url resource url
 * @param options fetch options
 * @returns response promise
 * @throws Error when access token is invalid
 */
export async function fetchSpotifyAPI<T = null>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> {
  const headers = getHeaders()
  const response = await fetch(url, { headers, ...options })

  if (response.ok) {
    return response.headers.get('content-type')?.includes('application/json')
      ? response.json()
      : Promise.resolve(null)
  }

  // in case of unauthorized try refreshing the tokens
  if (response.status === 401) {
    await queryClient.refetchQueries(authQueryKeys.tokens())
    return fetchSpotifyAPI(url, options)
  }

  // handle other errors
  const { error } = await response.json()
  if (error) {
    throw new Error(`${error.status} - ${error.message}`)
  }
  throw new Error('Unexpected error')
}

function getHeaders() {
  const tokens = TokenStorage.read()
  if (!tokens) {
    throw new Error('Invalid access token')
  }
  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    'Content-Type': 'application/json',
  }
}
