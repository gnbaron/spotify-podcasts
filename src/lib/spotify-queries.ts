import { useQuery } from 'react-query'
import { fetchSpotifyAPI } from './query-client'
import { usePaginatedQuery } from './query-utils'

const BASE_URL = 'https://api.spotify.com/v1'

const FIVE_MINUTES = 5 * 60 * 1000

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    'savedShows',
    (nextPageURL) =>
      fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/shows?limit=10`), // TODO: remove limit
    { staleTime: FIVE_MINUTES }
  )
}

export function useShow(id: string) {
  return useQuery<SpotifyApi.ShowObjectFull>(
    ['show', id],
    () => fetchSpotifyAPI(`${BASE_URL}/shows/${id}`),
    { staleTime: FIVE_MINUTES }
  )
}

export function useEpisode(id: string) {
  return useQuery<SpotifyApi.EpisodeObjectFull>(
    ['episode', id],
    () => fetchSpotifyAPI(`${BASE_URL}/episodes/${id}`),
    { staleTime: FIVE_MINUTES }
  )
}
