import { useMutation } from 'react-query'
import { queryKeys } from './spotify-queries'
import { queryClient } from './query-client'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'

export function useSaveEpisode() {
  return useMutation(
    (...ids: string[]) =>
      fetchSpotifyAPI(`${BASE_URL}/me/episodes`, {
        body: JSON.stringify({ ids }),
        method: 'PUT',
      }),
    {
      onSuccess: (_, ids) => {
        queryClient.invalidateQueries(queryKeys.episodeIsSaved(ids))
      },
    }
  )
}

export function useRemoveEpisode() {
  return useMutation(
    (...ids: string[]) =>
      fetchSpotifyAPI(`${BASE_URL}/me/episodes`, {
        body: JSON.stringify({ ids }),
        method: 'DELETE',
      }),
    {
      onSuccess: (_, ids) => {
        queryClient.invalidateQueries(queryKeys.episodeIsSaved(ids))
      },
    }
  )
}
