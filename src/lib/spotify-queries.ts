import { useQuery, UseQueryOptions } from 'react-query'
import { usePaginatedQuery } from './query-utils'
import { queryClient } from './query-client'
import { queryKeys as authQueryKeys } from './auth-queries'
import TokenStorage from './token-storage'

const BASE_URL = 'https://api.spotify.com/v1'

const queryKeys = {
  episode: (episodeId: string) => ['episode', episodeId],
  episodes: (showId: string) => ['episodes', showId],
  profile: () => ['profile'],
  savedShows: () => ['savedShows'],
  show: (showId: string) => ['show', showId],
}

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    queryKeys.savedShows(),
    (nextPageURL) => fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/shows`)
  )
}

export function useShow(showId: string) {
  return useQuery<SpotifyApi.ShowObjectFull>(
    queryKeys.show(showId),
    () => fetchSpotifyAPI(`${BASE_URL}/shows/${showId}`),
    {}
  )
}

export function useShowEpisodes(showId: string) {
  return usePaginatedQuery<SpotifyApi.EpisodeObjectSimplified>(
    queryKeys.episodes(showId),
    (nextPageURL) =>
      fetchSpotifyAPI(nextPageURL || `${BASE_URL}/shows/${showId}/episodes`)
  )
}

export function useEpisode(episodeId: string) {
  return useQuery<SpotifyApi.EpisodeObjectFull>(
    queryKeys.episode(episodeId),
    () => fetchSpotifyAPI(`${BASE_URL}/episodes/${episodeId}`),
    {}
  )
}

export function useProfile(
  options: UseQueryOptions<SpotifyApi.UserObjectPrivate> = {}
) {
  return useQuery<SpotifyApi.UserObjectPrivate>(
    queryKeys.profile(),
    () => fetchSpotifyAPI(`${BASE_URL}/me`),
    options
  )
}

/**
 * Make a request for Spotify Web API.
 * @param url resource url
 * @param options fetch options
 * @returns response promise
 * @throws Error when access token is invalid
 */
async function fetchSpotifyAPI<T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> {
  const headers = getHeaders()
  const response = await fetch(url, { headers, ...options })

  if (response.ok) return response.json()

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
