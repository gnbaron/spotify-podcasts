import { createRequest, usePaginatedQuery } from './query-client'

const API_URL = 'https://api.spotify.com/v1'

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    'savedShows',
    (nextPageURL) => createRequest(nextPageURL || `${API_URL}/me/shows?limit=5`)
  )
}
