import { useQuery } from 'react-query'
import { fetchSpotifyAPI, usePaginatedQuery } from './query-utils'

const BASE_URL = 'https://api.spotify.com/v1'

const queryKeys = {
  episode: (episodeId: string) => ['episode', episodeId],
  episodes: (showId: string) => ['episodes', showId],
  savedShows: ['savedShows'],
  show: (showId: string) => ['show', showId],
}

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    queryKeys.savedShows,
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
