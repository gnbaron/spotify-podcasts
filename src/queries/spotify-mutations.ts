import { useMutation, useQueryClient } from 'react-query'
import { queryKeys } from './spotify-queries'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'

export function useMutateSavedEpisodes() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ ids, remove }: { ids: string[]; remove?: boolean }) =>
      fetchSpotifyAPI(`${BASE_URL}/me/episodes`, {
        body: JSON.stringify({ ids }),
        method: remove ? 'DELETE' : 'PUT',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.savedEpisodes()),
    }
  )
}

export function useMutateSavedShows() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ ids, remove }: { ids: string[]; remove?: boolean }) =>
      fetchSpotifyAPI(`${BASE_URL}/me/shows`, {
        body: JSON.stringify({ ids }),
        method: remove ? 'DELETE' : 'PUT',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.savedShows()),
    }
  )
}
