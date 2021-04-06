import { QueryClient } from 'react-query'
import TokenStorage from './token-storage'

export const queryClient = new QueryClient()

/**
 * Make a request for Spotify WEB API.
 * @param url resource url
 * @param options fetch options
 * @returns promise for the response
 * @throws Error when access token is invalid
 */
export const fetchSpotifyAPI = async (
  url: RequestInfo,
  options?: RequestInit
) => {
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
  }
  if (!response.ok) {
    throw new Error('Unexpected error')
  }
  return response.json()
}
