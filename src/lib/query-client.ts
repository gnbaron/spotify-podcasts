import { QueryClient } from 'react-query'
import TokenStorage from './token-storage'

export const queryClient = new QueryClient()

/**
 * Make a request for Spotify WEB API.
 * @param url resource url
 * @param options fetch options
 * @returns response promise
 * @throws Error when access token is invalid
 */
export const fetchSpotifyAPI = async <T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> => {
  const tokens = TokenStorage.read()
  if (!tokens) {
    throw new Error('Invalid access token')
  }
  const headers = {
    Authorization: `Bearer ${tokens.accessToken}`,
    'Content-Type': 'application/json',
  }
  const response = await fetch(url, { headers, ...options })
  if (response.status === 401) {
    await queryClient.refetchQueries('tokens')
    return fetchSpotifyAPI(url, options)
  }
  if (!response.ok) {
    throw new Error('Unexpected error')
  }
  return response.json()
}
