import { useQuery } from 'react-query'
import { fetchSpotifyAPI } from './query-client'
import { usePaginatedQuery } from './query-utils'

const BASE_URL = 'https://api.spotify.com/v1'

const FIVE_MINUTES = 5 * 60 * 1000

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    'savedShows',
    (nextPageURL) => fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/shows`),
    { staleTime: FIVE_MINUTES }
  )
}

export function useShow(showId: string) {
  return useQuery<SpotifyApi.ShowObjectFull>(
    ['show', showId],
    () => fetchSpotifyAPI(`${BASE_URL}/shows/${showId}`),
    { staleTime: FIVE_MINUTES }
  )
}

export function useShowEpisodes(showId: string) {
  return usePaginatedQuery<SpotifyApi.EpisodeObjectSimplified>(
    ['showEpisodes', showId],
    (nextPageURL) =>
      fetchSpotifyAPI(nextPageURL || `${BASE_URL}/shows/${showId}/episodes`),
    { staleTime: FIVE_MINUTES }
  )
}

export function useEpisode(episodeId: string) {
  return useQuery<SpotifyApi.EpisodeObjectFull>(
    ['episode', episodeId],
    () => fetchSpotifyAPI(`${BASE_URL}/episodes/${episodeId}`),
    { staleTime: FIVE_MINUTES }
  )
}
